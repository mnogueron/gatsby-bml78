import puppeteer from 'puppeteer';
import fs from 'fs';
import * as dateFns from 'date-fns';
import frLocale from 'date-fns/locale/fr/index.js';

const folder = '../src/pages/results';

const formatResult = (results, isHost) => {
  return results[isHost ? 0 : 1];
};

const writeMatches = (
  {hostClub, guestClub, date, matches, results},
  dryRun
) => {
  const teamScore = {
    teamA: {
      shortName: hostClub.name,
      longName: hostClub.longName,
      result: formatResult(results, true),
    },
    teamB: {
      shortName: guestClub.name,
      longName: guestClub.longName,
      result: formatResult(results, false),
    },
  };
  const teamNumber =
    hostClub.name === 'BML' ? hostClub.teamNumber : guestClub.teamNumber;
  const filename = `${dateFns.format(
    new Date(date),
    'yyyy-MM-dd-HH-mm'
  )}-interclub-equipe-${teamNumber}.md`;
  const content = `---
templateKey: result-page
title: interclub-equipe-${teamNumber}
cardTitle: Saison 23-24 - Équipe ${teamNumber} - ${hostClub.name} vs ${
    guestClub.name
  } 
heading: |-
  Saison 23-24 - Équipe ${teamNumber}
  ${hostClub.name} vs ${guestClub.name}
date: ${date}
category: equipe-${teamNumber}-s23-24
featuredimage:
  image: /assets/shuttle.jpg
---

<teamscoreboard>${JSON.stringify({teamScore})}</teamscoreboard>

<scoreboard>${JSON.stringify({matches})}</scoreboard>`;
  const filePath = `${folder}/${filename}`;
  if (dryRun) {
    return;
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
  }
};

const extractICData = async (url, dryRun) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', message =>
    console.log(
      `${message.type().substr(0, 3).toUpperCase()} ${message.text()}`
    )
  );

  await page.goto(url);
  await page.waitForTimeout(1000);

  const canParse = await page.evaluate(
    () =>
      document.querySelectorAll('.winner-left-gradient').length +
        document.querySelectorAll('.winner-right-gradient').length >
      0
  );

  if (!canParse) return false;

  const meeting = await page.evaluate(() => {
    const parseClub = clubTitle => {
      const match = clubTitle.match(/(.*) \((\d*)-(.*)-(\d*)\)/);

      // Si c'est un IC homme mettre par défaut le numéro d'équipe
      if (!match) {
        const isBML = /maisons-laffitte/i.test(clubTitle);
        let teamNumber = '';
        const competitionId =
          location.pathname.match(/competition\/(\d*)\//)[1];
        if (isBML) {
          switch (competitionId) {
            case '2302516':
              teamNumber = '7';
              break;
            default:
              throw new Error('No team linked to this competition ID');
          }
        }
        return {
          longName: clubTitle,
          committee: '78',
          name: isBML ? 'BML' : clubTitle,
          teamNumber: teamNumber,
        };
      }

      return {
        longName: match[1],
        committee: match[2],
        name: match[3],
        teamNumber: match[4],
      };
    };

    const parseResults = () => {
      return [
        document.querySelectorAll('.winner-left-gradient').length,
        document.querySelectorAll('.winner-right-gradient').length,
      ];
    };

    const capitalize = str => {
      return str
        .split(' ')
        .map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
        .join(' ');
    };

    const title = document
      .getElementsByTagName('h1')[0]
      .getElementsByTagName('a');
    const results = parseResults();
    const hostClub = parseClub(title[0].innerHTML);
    const guestClub = parseClub(title[1].innerHTML);

    const matchNodes = [
      ...document
        .getElementsByClassName('rencontre')[0]
        .querySelectorAll('.uk-text-center.uk-table-shrink.uk-text-nowrap'),
    ].map(c => c.parentNode);
    const date = document
      .querySelector('.uk-description-list > dt > .fa-calendar')
      .parentNode.nextElementSibling.innerText.match(/[^ ]* (.*)/)[1];
    const time = document.querySelector(
      '.uk-description-list > dt > .fa-clock-o'
    ).parentNode.nextElementSibling.innerText;

    const getPlayer = (playerNode, isHost) => {
      const name = playerNode.children[isHost ? 1 : 0].innerText;
      const matches = name.match(
        /([A-Za-zÀ-ÖØ-öø-ÿ-']*) ([A-Za-zÀ-ÖØ-öø-ÿ-' ]*)/
      );
      return {
        lastname: capitalize(matches[2]),
        firstname: matches[1],
        club: (isHost ? hostClub : guestClub).name,
        ranking: playerNode.children[isHost ? 0 : 1].innerText,
      };
    };

    const getScore = scoreNode => {
      const results = [...scoreNode.querySelectorAll('tr')].map(node => {
        if (node.children[0].innerText === 'Wo') {
          return 'WO';
        }

        if (node.children[0].innerText === 'Ab.') {
          return 'AB.';
        }

        return {
          scoreA: parseInt(node.children[0].innerText),
          scoreB: parseInt(node.children[1].innerText),
        };
      });
      return {
        set: results.filter(r => r !== 'WO' && r !== 'AB.'),
        status: results.find(r => r === 'WO' || r === 'AB.'),
      };
    };

    const getType = matchNode => {
      const type = matchNode
        .querySelector('th')
        .innerText.match(/([A-Z]*)\d*/)[1];
      return type === 'DX' ? 'MX' : type;
    };

    const matches = matchNodes.map(matchNode => {
      const hostTeamNode = matchNode.children[1];
      const guestTeamNode = matchNode.children[3];
      const winner = matchNode.querySelector('.winner-left-gradient') ? 0 : 1;
      const score = getScore(matchNode.children[2]);

      let teamA = [...hostTeamNode.querySelectorAll('tr')].map(p =>
        getPlayer(p, true)
      );
      let teamB = [...guestTeamNode.querySelectorAll('tr')].map(p =>
        getPlayer(p, false)
      );

      if (score.status === 'WO') {
        if (winner === 0) {
          teamB = [
            {
              lastname: undefined,
              firstname: undefined,
              club: guestClub.name,
              ranking: undefined,
              status: 'WO',
            },
          ];
        } else {
          teamA = [
            {
              lastname: undefined,
              firstname: undefined,
              club: hostClub.name,
              ranking: undefined,
              status: 'WO',
            },
          ];
        }
      } else if (score.status === 'AB.') {
        if (winner === 0) {
          teamB = teamB.map(p => ({...p, status: 'AB.'}));
        } else {
          teamA = teamA.map(p => ({...p, status: 'AB.'}));
        }
      }

      return {
        teamA,
        teamB,
        score,
        type: getType(matchNode),
        hideClub: true,
      };
    });

    return {
      hostClub,
      guestClub,
      matches,
      results,
      date: `${date} ${time}`,
    };
  });

  await browser.close();

  meeting.date = dateFns
    .parse(meeting.date, 'dd MMMM yyyy HH:mm:ss', new Date(), {
      locale: frLocale,
    })
    .toISOString();

  console.log(
    `Parsed meeting: ${meeting.hostClub.name} vs ${meeting.guestClub.name} the ${meeting.date}`
  );

  writeMatches(meeting, dryRun);
  return true;
};

const extractICUrls = async teamIds => {
  const browser = await puppeteer.launch();
  const results = {};

  const promises = teamIds.map(async teamId => {
    const page = await browser.newPage();
    page.on('console', msg => console.pageLog(msg.text()));
    page.on('pageerror', error => console.pageError(error.message));

    /*page.on('console', (message) =>
      console.log(
        `${message.type().substr(0, 3).toUpperCase()} ${message.text()}`
      )
    );*/

    console.log('Checking team', teamId);
    await page.goto(`https://icbad.ffbad.org/equipe/${teamId}`);
    await page.waitForTimeout(1000);
    console.log('after timeout', teamId);

    const data = await page.evaluate(() => {
      const CURRENT_YEAR = '2023';
      const NEXT_YEAR = '2024';
      const DATE_REGEX = /\n\t*Le (\d{2})\/(\d{2})\t*/i;

      const urls = [
        ...document
          .getElementsByTagName('tbody')[1]
          .querySelectorAll('.row-link'),
      ].map(a => a.href);
      console.log(urls);
      const dates = [
        ...document
          .getElementsByTagName('tbody')[1]
          .querySelectorAll('.row-link'),
      ].map(a => {
        const unparsedDate = a.innerHTML;
        if (DATE_REGEX.test(unparsedDate)) {
          // eslint-disable-next-line no-unused-vars
          const [_, day, month] = unparsedDate.match(DATE_REGEX);
          if (Number(month) < 9) {
            return `${day.padStart(2, '0')}/${month.padStart(
              2,
              '0'
            )}/${NEXT_YEAR}`;
          }
          return `${day.padStart(2, '0')}/${month.padStart(
            2,
            '0'
          )}/${CURRENT_YEAR}`;
        }

        console.log(unparsedDate);
        return unparsedDate;
      });
      console.log(dates);
      return urls.map((url, i) => {
        return {url, date: dates[i]};
      });
    });

    results[teamId] = data.map(({url, date}) => ({
      url,
      date,
    }));
    page.close();
    console.log(results);
  });

  await Promise.all(promises);

  fs.writeFileSync(`./icUrls.json`, JSON.stringify(results, null, 4));

  await browser.close();
};

export default {
  extractICData,
  extractICUrls,
};
