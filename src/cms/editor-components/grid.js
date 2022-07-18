export default {
  id: 'grid',
  label: 'Grid',
  fields: [
    {
      name: 'nb_columns',
      label: 'Nombre de colonnes',
      widget: 'object',
      summary:
        'Mobile : {{fields.base}} - Tablette : {{fields.sm}} - PC : {{fields.md}}',
      fields: [
        {
          name: 'base',
          label: 'Pour mobile',
          widget: 'number',
          default: 1,
          min: 1,
          max: 12,
        },
        {
          name: 'sm',
          label: 'Pour tablette',
          widget: 'number',
          default: 1,
          min: 1,
          max: 12,
        },
        {
          name: 'md',
          label: 'Pour PC',
          widget: 'number',
          default: 2,
          min: 1,
          max: 12,
        },
      ],
    },
    {
      name: 'columns',
      label: 'Colonnes',
      label_singular: 'Colonne',
      widget: 'list',
      fields: [
        {
          name: 'body',
          widget: 'markdown',
        },
      ],
    },
  ],
  pattern: /^<simplegrid columns='(.*?)'>(.*?)<\/simplegrid>$/,
  fromBlock: function (match) {
    // TODO write function here
    return JSON.parse(match[1]);
  },
  toBlock: function (obj) {
    return (
      `<simplegrid columns='${JSON.stringify(obj.nb_columns)}'>` +
      obj.columns.map((c) => `<div>${c.body}</div>`).join('') +
      '</simplegrid>'
    );
  },
  toPreview: function (obj) {
    return obj.url;
  },
};
