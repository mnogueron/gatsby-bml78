import * as dateFns from 'date-fns';

export const getICPRPayload = (
  prUrl,
  importedICList,
  updatedICList,
  isUpdated
) => {
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

export const getNextImportPayload = (
  importDate,
  availableFiles,
  missingFiles
) => {
  const title = 'IC results will soon be imported!';
  const description = `New IC results will be imported on ${dateFns.format(
    importDate,
    'dd/MM/yyyy'
  )} at ${dateFns.format(
    importDate,
    'HH:mm'
  )}.\nCheck if there are any missing asset before the import.`;
  const color = 0x206694;
  return {
    embeds: [
      {
        color,
        title,
        description,
        fields: [
          missingFiles.length > 0 && {
            name: 'Missing assets',
            value: missingFiles
              .map(({assets}) => `* ${assets.join(' [OR] ')}`)
              .join('\n')
              .slice(0, 1024),
          },
          availableFiles.length > 0 && {
            name: 'Available assets',
            value: availableFiles
              .flatMap(({assets}) => assets)
              .map(asset => `* ${asset}`)
              .join('\n')
              .slice(0, 1024),
          },
        ].filter(Boolean),
      },
    ],
  };
};
