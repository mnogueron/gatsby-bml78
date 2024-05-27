import axios from 'axios';

const getPayload = (prUrl, importedICList, updatedICList, isUpdated) => {
  const title = isUpdated
    ? 'IC results have been updated!'
    : 'New IC results have been imported!';
  const color = isUpdated ? 0x206694 : 0x1f8b4c;
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
          importedICList.length > 0 && {
            name: 'Imported ICs',
            value: importedICList.map(ic => `* ${ic}`).join('\n'),
          },
          updatedICList.length > 0 && {
            name: 'Updated ICs',
            value: updatedICList.map(ic => `* ${ic}`).join('\n'),
          },
        ].filter(Boolean),
      },
    ],
  };
};

export const notifyDiscordICs = async (
  prUrl,
  importedICList,
  updatedICList,
  isUpdated
) => {
  const webhook = process.env['DISCORD_WEBHOOK'];
  if (!webhook) {
    console.error('Missing webhook. Could not report to Discord.');
  }
  await axios.post(
    webhook,
    getPayload(prUrl, importedICList, updatedICList, isUpdated)
  );
};
