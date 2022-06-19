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
          name: 'teamA',
          label: 'Team A',
          widget: 'object',
          collapsed: false,
          fields: [
            {
              name: 'players',
              label: 'Joueurs',
              label_singular: 'Joueur',
              max: 2,
              min: 1,
              widget: 'list',
              fields: [
                {
                  name: 'name',
                  label: 'Nom',
                  widget: 'string',
                },
                {
                  name: 'club',
                  label: 'Club',
                  widget: 'string',
                },
                {
                  name: 'ranking',
                  label: 'Classement',
                  widget: 'string',
                },
              ],
            },
          ],
        },
        {
          name: 'teamB',
          label: 'Team B',
          widget: 'object',
          collapsed: false,
          fields: [
            {
              name: 'players',
              label: 'Joueurs',
              label_singular: 'Joueur',
              max: 2,
              min: 1,
              widget: 'list',
              fields: [
                {
                  name: 'name',
                  label: 'Nom',
                  widget: 'string',
                },
                {
                  name: 'club',
                  label: 'Club',
                  widget: 'string',
                },
                {
                  name: 'ranking',
                  label: 'Classement',
                  widget: 'string',
                },
              ],
            },
          ],
        },
        {
          name: 'score',
          label: 'score',
          widget: 'object',
          collapsed: false,
          fields: [
            {
              name: 'set',
              label: 'Sets',
              label_singular: 'Set',
              max: 3,
              min: 2,
              widget: 'list',
              fields: [
                {
                  name: 'scoreA',
                  label: 'Score Team A',
                  widget: 'number',
                },
                {
                  name: 'scoreB',
                  label: 'Score Team B',
                  widget: 'number',
                },
              ],
            },
          ],
        },
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
