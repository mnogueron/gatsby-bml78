export default {
  id: 'youtube',
  label: 'YouTube',
  fields: [
    {
      name: 'url',
      label: 'Youtube video URL',
      widget: 'string',
    },
  ],
  pattern: /^`youtube:\s(.*)`$/,
  fromBlock: function (match) {
    return {
      url: match[1],
    };
  },
  toBlock: function (obj) {
    return '`youtube: ' + obj.url + '`';
  },
  toPreview: function (obj) {
    return obj.url;
  },
};
