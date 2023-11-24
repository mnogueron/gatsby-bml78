import ICBadCrawler from './ICBadCrawler.js';
import {teamIDs} from './scrapIds.js';
import './logger.js';

const run = async () => {
  await ICBadCrawler.extractICUrls(teamIDs);

  process.exit();
};

run();

process.on('exit', function () {
  // TODO clean exit
});
