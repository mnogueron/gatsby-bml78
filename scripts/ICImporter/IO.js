import * as dateFns from 'date-fns';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {template} from './templates/icResult.js';
import {META_FILENAME, RESULT_FOLDER} from './constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const formatResult = (results, isHost) => {
  return results[isHost ? 0 : 1];
};

export const getTeamNumber = ({hostClub, guestClub}) => {
  return hostClub.name === 'BML' ? hostClub.teamNumber : guestClub.teamNumber;
};

export const getICResultFilename = (date, teamNumber) =>
  `${dateFns.format(
    new Date(date),
    'yyyy-MM-dd-HH-mm'
  )}-interclub-equipe-${teamNumber}.md`;

export const getICResultPath = (date, teamNumber) =>
  path.resolve(
    __dirname,
    '../../',
    RESULT_FOLDER,
    getICResultFilename(date, teamNumber)
  );

export const writeICFile = (meeting, shortSeason, options = {}) => {
  const {hostClub, guestClub, date, matches, results, meetingNumber} = meeting;
  const {dryRun, overwrite, assetURL} = options;
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
  const teamNumber = getTeamNumber(meeting);

  const content = template({
    teamNumber,
    hostClubName: hostClub.name,
    guestClubName: guestClub.name,
    date: date.toISOString(),
    assetURL,
    meetingNumber,
    teamScore,
    matches,
    shortSeason,
  });

  if (dryRun) {
    console.log(content);
    return;
  }

  const filePath = getICResultPath(date, teamNumber);
  if (overwrite || !fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
  }
};

export const writeICMetas = metas => {
  const metasPath = path.resolve(__dirname, 'metas', META_FILENAME);
  fs.writeFileSync(metasPath, JSON.stringify(metas, null, 4));
};
