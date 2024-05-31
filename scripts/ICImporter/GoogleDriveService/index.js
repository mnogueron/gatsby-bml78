import {GoogleAuth} from 'google-auth-library';
import {google} from 'googleapis';
import fs from 'fs';
import driveMeta from '../metas/drive.json' assert {type: 'json'};
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const auth = new GoogleAuth({
  scopes: 'https://www.googleapis.com/auth/drive',
  keyFile: process.env['DRIVE_CREDENTIALS'],
});
const service = google.drive({version: 'v3', auth});

export const getFolderId = (year, teamNumber) => {
  return driveMeta.folders[year]?.[`E${teamNumber}`];
};

export const listFileInFolder = async (year, teamNumber) => {
  const folderId = getFolderId(year, teamNumber);

  if (!folderId) {
    throw new Error(
      `There is no folder ID for year ${year} and team number ${teamNumber}`
    );
  }

  const response = await service.files.list({
    //q: "mimeType='image/jpeg'",
    q: `'${folderId}' in parents`,
    spaces: 'drive',
    fields: 'nextPageToken, files(id, name)',
  });
  return response.data.files;
};

export const getFilesForIC = async (year, teamNumber, date) => {
  const folderId = getFolderId(year, teamNumber);

  if (!folderId) {
    throw new Error(
      `There is no folder ID for year ${year} and team number ${teamNumber}`
    );
  }

  const response = await service.files.list({
    //q: "mimeType='image/jpeg'",
    q: `'${folderId}' in parents and name contains '${date}' and name contains 'E${teamNumber}'`,
    spaces: 'drive',
    fields: 'nextPageToken, files(id, name)',
  });
  return response.data.files;
};

export const downloadFile = async (fileId, folder) => {
  // get the file name
  const fileMetaData = await service.files.get({
    fileId: fileId,
    fields: 'name',
  });

  const fileStream = fs.createWriteStream(
    path.resolve(__dirname, '../../..', folder, fileMetaData.data.name)
  );
  console.log(`Downloading: ${folder}/${fileMetaData.data.name}`);

  const file = await service.files.get(
    {
      fileId: fileId,
      alt: 'media',
    },
    {
      responseType: 'stream',
    }
  );

  file.data.on('end', () =>
    console.log(`Finished downloading: ${folder}/${fileMetaData.data.name}`)
  );
  file.data.pipe(fileStream);

  return file.status;
};
