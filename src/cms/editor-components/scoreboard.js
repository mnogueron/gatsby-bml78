const playerFields = [
  {
    name: 'lastname',
    label: 'Nom',
    widget: 'string',
  },
  {
    name: 'firstname',
    label: 'Prénom',
    widget: 'string',
  },
  {
    name: 'ranking',
    label: 'Classement',
    widget: 'string',
    required: false,
  },
  {
    name: 'club',
    label: 'Club',
    widget: 'string',
    required: false,
  },
  {
    name: 'points',
    label: 'Points',
    widget: 'number',
    required: false,
    value_type: 'float',
    min: 0,
  },
];

const players = {
  label: 'Joueurs',
  label_singular: 'Joueur',
  max: 2,
  min: 1,
  widget: 'list',
  fields: playerFields,
  summary: '{{fields.lastname}} {{fields.firstname}} - {{fields.club}} - {{fields.ranking}}',
};

const setFields = [
  {
    name: 'set',
    label: 'Sets',
    label_singular: 'Set',
    default: [0, 0],
    max: 3,
    min: 2,
    widget: 'list',
    summary: '{{fields.scoreA}} - {{fields.scoreB}}',
    fields: [
      {
        name: 'scoreA',
        label: 'Score Team A',
        widget: 'number',
        default: 0,
        min: 0,
        max: 30,
      },
      {
        name: 'scoreB',
        label: 'Score Team B',
        widget: 'number',
        default: 0,
        min: 0,
        max: 30,
      },
    ],
  },
];

export default {
  id: 'scoreboard',
  label: 'Scoreboard',
  fields: [
    {
      name: 'matches',
      label: 'Matches',
      label_singular: 'Match',
      widget: 'list',
      fields: [
        {
          ...players,
          name: 'teamA',
        },
        {
          ...players,
          name: 'teamB',
        },
        {
          name: 'score',
          label: 'score',
          widget: 'object',
          collapsed: false,
          fields: setFields,
        },
        {
          name: 'matchType',
          label: 'Type de match',
          widget: 'select',
          options: ['SH', 'SD', 'DH', 'DD', 'MX'],
          required: false,
        }
      ],
    },
  ],
  pattern: /^<scoreboard>(.*?)<\/scoreboard>$/,
  fromBlock: function (match) {
    return JSON.parse(match[1]);
  },
  toBlock: function (obj) {
    return '<scoreboard>' + JSON.stringify(obj) + '</scoreboard>';
  },
  toPreview: function (obj) {
    return obj.url;
  },
};
