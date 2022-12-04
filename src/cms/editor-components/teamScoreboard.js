const teamWidget = {
    widget: 'object',
    fields: [
      {
        name: 'shortName',
        label: 'Sigle',
        widget: 'string',
        optional: true,
      },
      {
        name: 'longName',
        label: 'Nom',
        widget: 'string',
      },
      {
        name: 'result',
        label: 'Résultat',
        widget: 'number',
      },
    ]
  };

export default {
  id: 'teamScoreboard',
  label: 'Team Scoreboard',
  fields: [
    {
      name: 'teamScore',
      label: "Résultat d'équipe",
      widget: 'object',
      fields: [
        {
          ...teamWidget,
          name: 'teamA',
          label: 'Equipe A',
        },
        {
          ...teamWidget,
          name: 'teamB',
          label: 'Equipe B',
        },
      ]
    }
  ],
  pattern: /^<teamscoreboard>(.*?)<\/teamscoreboard>$/,
  fromBlock: function (match) {
    return JSON.parse(match[1]);
  },
  toBlock: function (obj) {
    return '<teamscoreboard>' + JSON.stringify(obj) + '</teamscoreboard>';
  },
  toPreview: function (obj) {
    return obj.url;
  },
};
