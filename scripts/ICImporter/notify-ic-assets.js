import yargs from 'yargs';
import Discord from './DiscordNotifier/index.js';
import {getFilesForIC} from './GoogleDriveService/index.js';
import {getICsToImport, parseICDate} from './utils.js';
import teamIDs from './metas/teamIDs.json' assert {type: 'json'};
import icMetas from './metas/ic.json' assert {type: 'json'};
import dateFns from 'date-fns';
import cronParser from 'cron-parser';
import {initLogger} from './logger.js';

const argv = yargs(process.argv)
  .option('d', {
    alias: 'dry',
    default: false,
    describe: 'Dry run',
    type: 'boolean',
  })
  .option('c', {
    alias: 'cron',
    demandOption: true,
    // Every monday at noon
    default: '0 12 * * 1',
    describe: 'Cron for the import job',
    type: 'string',
  })
  .check(argv => {
    const cron = argv.cron;
    try {
      cronParser.parseExpression(cron);
    } catch (e) {
      throw new Error(`"${cron}" is not a valid cron.`);
    }
    return true;
  }).argv;

initLogger();

const {cron, dry} = argv;
const nextCronDate = cronParser.parseExpression(cron).next();

const run = async () => {
  const icsToImport = getICsToImport(icMetas);

  const availableFiles = [];
  const missingFiles = [];

  console.log(
    `Running job to check available and missing assets for next import on ${nextCronDate.toString()}`
  );
  await Promise.all(
    icsToImport.map(async ({id, ics}) => {
      const {teamNumber} = teamIDs.find(t => t.id === id);
      await Promise.all(
        ics.map(async ic => {
          const date = parseICDate(ic.date);
          const icDate = dateFns.format(date, 'yyyy-MM-dd');
          const icDateTime = dateFns.format(date, 'yyyy-MM-dd-HH-mm');
          const availableICAssets = await getFilesForIC(
            icMetas.meta.season,
            teamNumber,
            icDate
          );
          if (availableICAssets.length > 0) {
            availableFiles.push({
              date: icDate,
              teamNumber,
              assets: availableICAssets.map(f => f.name),
            });
          } else {
            missingFiles.push({
              date: icDate,
              teamNumber,
              assets: [
                `${icDate}-E${teamNumber}.png`,
                `${icDateTime}-E${teamNumber}.png`,
              ],
            });
          }
        })
      );
    })
  );
  if (availableFiles.length > 0) {
    console.log(
      `Found ${availableFiles.length} available files`,
      availableFiles.flatMap(f => f.assets)
    );
  } else {
    console.log('There are no available file for the next import.');
  }

  if (missingFiles.length > 0) {
    console.log(
      `Found ${missingFiles.length} missing files`,
      missingFiles.map(f => f.assets.join(' [OR] '))
    );
  } else {
    console.log('There are no missing file for the next import.');
  }

  if (!dry) {
    await Discord.notifyNextImport(
      nextCronDate.toDate(),
      availableFiles,
      missingFiles
    );
  }
};

run();
