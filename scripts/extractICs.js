import ICBadCrawler from './ICBadCrawler.js';
import * as dateFns from 'date-fns';
import './logger.js';
import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./icUrls.json'));

const run = async () => {
  const output = data;
  const entries = Object.entries(data);

  for (let i = 0; i < entries.length; i++) {
    const [teamId, ics] = entries[i];
    const outputedIcs = [];
    for (let n = 0; n < ics.length; n++) {
      const ic = ics[n];
      if (
        !ic.parsed &&
        dateFns.isBefore(
          dateFns.parse(ic.date, 'dd/MM/yyyy', new Date()),
          new Date()
        )
      ) {
        try {
          const hasBeenParsed = await ICBadCrawler.extractICData(ic.url);
          outputedIcs.push({
            ...ic,
            parsed: hasBeenParsed,
          });
        } catch (e) {
          console.error('Could not fetch data for IC', ic.url);
          console.error(e);
          outputedIcs.push({
            ...ic,
            parsed: false,
          });
        }
      } else {
        outputedIcs.push(ic);
      }
    }
    output[teamId] = outputedIcs;
  }

  fs.writeFileSync(`./icUrls.json`, JSON.stringify(output, null, 4));

  process.exit();
};

run();

process.on('exit', function () {
  // TODO clean exit
});
