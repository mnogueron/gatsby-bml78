import ICBadCrawler from './ICBadCrawler.js';
import {initLogger} from './logger.js';
import {writeICFile} from './IO.js';
import icMetas from './metas/ic.json' assert {type: 'json'};

const args = process.argv.slice(2);

initLogger();

if (args.length < 2) {
  console.error('Missing competition id and rencontre ids');
  process.exit(0);
}

const getUrl = (competitionId, rencontreId) =>
  `https://icbad.ffbad.org/competition/${competitionId}/rencontre/${rencontreId}`;

const run = async () => {
  for (let i = 1; i < args.length; i++) {
    const meeting = await ICBadCrawler.getICData(getUrl(args[0], args[i]));
    if (meeting) {
      writeICFile(meeting, icMetas.meta.shortSeason);
    }
  }

  process.exit();
};

// TODO base on the list on team ids, scrap ICBad

run();

process.on('exit', function () {
  // TODO clean exit
});
