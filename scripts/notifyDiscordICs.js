import axios from 'axios';

const getPayload = (prUrl, icList, isUpdated) => {
  const title = isUpdated
    ? 'IC results have been updated!'
    : 'New IC results have been imported!';
  const color = isUpdated ? 0x1f8b4c : 0x1f8b4c;
  return {
    embeds: [
      {
        color,
        title,
        fields: [
          {
            name: 'PR url',
            value: prUrl,
          },
          {
            name: 'Imported ICs',
            value: icList.map(ic => `* ${ic}`).join('\n'),
          },
        ],
      },
    ],
  };
};

export const notifyDiscordICs = async (prUrl, icList, isUpdated) => {
  const webhook = process.env['DISCORD_WEBHOOK'];
  if (!webhook) {
    console.error('Missing webhook. Could not report to Discord.');
  }
  await axios.post(webhook, getPayload(prUrl, icList, isUpdated));
};
