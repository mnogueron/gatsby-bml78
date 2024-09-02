import {EditorComponentOptions, EditorComponentField} from './types';

const teamWidget = {
  name: 'team',
  label: 'Èquipe',
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
      name: 'icBadTeamId',
      label: 'ICBad Team ID',
      widget: 'string',
    },
    {
      name: 'teamNumber',
      label: 'N° Equipe',
      widget: 'number',
    },
    {
      name: 'department',
      label: 'Département',
      widget: 'string',
    },
  ],
};

const teamRankFields: EditorComponentField[] = [
  {
    name: 'name',
    label: `Nom d'équipe`,
    widget: 'string',
  },
  teamWidget,
  {
    name: 'playedDays',
    label: 'Journées jouées',
    widget: 'number',
  },
  {
    name: 'win',
    label: 'Victoires',
    widget: 'number',
  },
  {
    name: 'equal',
    label: 'Égalités',
    widget: 'number',
  },
  {
    name: 'loss',
    label: 'Défaites',
    widget: 'number',
  },
  {
    name: 'retire',
    label: 'Forfaits',
    widget: 'number',
  },
  {
    name: 'bonus',
    label: 'Bonus',
    widget: 'number',
  },
  {
    name: 'malus',
    label: 'Malus',
    widget: 'number',
  },
  {
    name: 'points',
    label: 'Points',
    widget: 'number',
  },
];

const component: EditorComponentOptions = {
  id: 'teamRanking',
  label: 'Team Ranking',
  fields: [
    {
      name: 'teams',
      label: `Scores`,
      label_singular: 'Score',
      widget: 'list',
      fields: teamRankFields,
    },
  ],
  pattern: /^<teamranking>(.*?)<\/teamranking>$/,
  fromBlock: function (match) {
    return JSON.parse(match[1]);
  },
  toBlock: function (obj) {
    return '<teamranking>' + JSON.stringify(obj) + '</teamranking>';
  },
  toPreview: function (obj) {
    return obj.url;
  },
};

export default component;
