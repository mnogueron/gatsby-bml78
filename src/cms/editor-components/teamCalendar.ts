import {EditorComponentOptions, EditorComponentField} from './types';

const teamWidget = {
  widget: 'object',
  fields: [
    {
      name: 'shortName',
      label: 'Sigle',
      widget: 'string',
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
    {
      name: 'score',
      label: 'Score',
      widget: 'number',
      optional: true,
    },
    {
      name: 'isHost',
      label: 'Hôte',
      widget: 'boolean',
    },
  ],
};

const meetingFields: EditorComponentField[] = [
  {
    name: 'date',
    label: 'Date',
    widget: 'datetime',
  },
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
];

const component: EditorComponentOptions = {
  id: 'teamCalendar',
  label: 'Team Calendar',
  fields: [
    {
      name: 'calendar',
      label: `Rencontres`,
      label_singular: 'Rencontre',
      widget: 'list',
      fields: meetingFields,
    },
  ],
  pattern: /^<teamcalendar>(.*?)<\/teamcalendar>$/,
  fromBlock: function (match) {
    return JSON.parse(match[1]);
  },
  toBlock: function (obj) {
    return '<teamcalendar>' + JSON.stringify(obj) + '</teamcalendar>';
  },
  toPreview: function (obj) {
    return obj.url;
  },
};

export default component;
