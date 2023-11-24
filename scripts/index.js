import ICBadCrawler from './ICBadCrawler.js';
import './logger.js';

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('Missing competition id and rencontre ids');
  process.exit(0);
}

const getUrl = (competitionId, rencontreId) =>
  `https://icbad.ffbad.org/competition/${competitionId}/rencontre/${rencontreId}`;

const run = async () => {
  for (let i = 1; i < args.length; i++) {
    await ICBadCrawler.extractICData(getUrl(args[0], args[i]));
  }

  process.exit();
};

// TODO base on the list on team ids, scrap ICBad

run();

process.on('exit', function () {
  // TODO clean exit
});
