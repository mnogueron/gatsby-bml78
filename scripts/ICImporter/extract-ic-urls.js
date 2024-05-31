import yargs from 'yargs';
import ICBadCrawler from './ICBadCrawler.js';
import teamIDs from './metas/teamIDs.json' assert {type: 'json'};
import {initLogger} from './logger.js';
import {writeICMetas} from './IO.js';

const argv = yargs(process.argv).option('d', {
  alias: 'dry',
  default: false,
  describe: 'Dry run',
  type: 'boolean',
}).argv;

initLogger();

const run = async () => {
  const icMetas = await ICBadCrawler.getICMetas(teamIDs);

  if (argv.dry) {
    console.log(JSON.stringify(icMetas, null, 2));
  } else {
    writeICMetas(icMetas);
  }
};

run();

process.on('exit', function () {
  // TODO clean exit
});
