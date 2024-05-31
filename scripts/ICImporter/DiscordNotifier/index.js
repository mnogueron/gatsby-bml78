import axios from 'axios';
import {getICPRPayload, getNextImportPayload} from './payload.js';

const Discord = {
  notify: async payload => {
    const webhook = process.env['DISCORD_WEBHOOK'];
    if (!webhook) {
      console.error('Missing webhook. Could not report to Discord.');
    }
    await axios.post(webhook, payload);
  },
  notifyICPR: async (prUrl, importedICList, updatedICList, isUpdated) =>
    Discord.notify(
      getICPRPayload(prUrl, importedICList, updatedICList, isUpdated)
    ),
  notifyNextImport: async (importDate, availableFiles, missingFiles) =>
    Discord.notify(
      getNextImportPayload(importDate, availableFiles, missingFiles)
    ),
};

export default Discord;
