import ICBadCrawler from './ICBadCrawler.js';
import {initLogger} from './logger.js';
import icMetas from './metas/ic.json' assert {type: 'json'};
import {getICsToImport} from './utils.js';
import {getTeamNumber, writeICFile, writeICMetas} from './IO.js';
import {downloadFile, getFilesForIC} from './GoogleDriveService/index.js';
import * as dateFns from 'date-fns';
import yargs from 'yargs';

const argv = yargs(process.argv)
  .option('d', {
    alias: 'dry',
    default: false,
    describe: 'Dry run',
    type: 'boolean',
  })
  .option('o', {
    alias: 'overwrite',
    default: false,
    describe: 'Overwrite exiting results',
    type: 'boolean',
  })
  .option('logMetas', {
    default: false,
    describe: 'Log metas once all ICs are imported',
    type: 'boolean',
  }).argv;

initLogger();

const {dry, overwrite, logMetas} = argv;

const run = async () => {
  const metas = {...icMetas};

  const icsToImport = getICsToImport(icMetas);

  await Promise.all(
    icsToImport.map(async ({id, ics}) => {
      const outputedIcs = {};
      await Promise.all(
        ics.map(async ic => {
          try {
            const meeting = await ICBadCrawler.getICData(ic.url);

            if (meeting) {
              const season = '2023-2024'; // TODO use meta instead
              const teamNumber = getTeamNumber(meeting);

              const {date} = meeting;

              const icDate = dateFns.format(date, 'yyyy-MM-dd');
              const icDateTime = dateFns.format(date, 'yyyy-MM-dd-HH-mm');
              const availableICAssets = await getFilesForIC(
                season,
                teamNumber,
                icDate
              );
              let assetURL = undefined;

              if (availableICAssets.length > 0) {
                const file =
                  availableICAssets.find(f => f.name.startsWith(icDateTime)) ||
                  availableICAssets[0];
                if (!dry) {
                  await downloadFile(file.id, 'static/assets/2023-2024');
                }
                assetURL = `/assets/2023-2024/${file.name}`;
              }

              writeICFile(meeting, icMetas.meta.shortSeason, {
                assetURL,
                overwrite,
                dryRun: dry,
              });
            }

            outputedIcs[ic.url] = {
              ...ic,
              parsed: Boolean(meeting),
            };
          } catch (e) {
            console.error('Could not fetch data for IC', ic.url);
            console.error(e);
            outputedIcs[ic.url] = {
              ...ic,
              parsed: false,
            };
          }
        })
      );
      const importedURLs = Object.keys(outputedIcs);
      const teamMeta = metas.teams.find(t => t.id === id);

      metas.teams = [
        ...metas.teams.filter(t => t.id !== id),
        {
          ...teamMeta,
          ics: teamMeta.ics.map(ic => {
            if (importedURLs.includes(ic.url)) {
              return {
                ...ic,
                ...outputedIcs[ic.url],
              };
            }
            return ic;
          }),
        },
      ];
    })
  );

  metas.teams = metas.teams.sort((a, b) => a.teamNumber - b.teamNumber);

  if (logMetas) {
    console.log(JSON.stringify(metas, null, 2));
  }

  if (!dry) {
    writeICMetas(metas);
  }

  process.exit();
};

run();

process.on('exit', function () {
  // TODO clean exit
});
