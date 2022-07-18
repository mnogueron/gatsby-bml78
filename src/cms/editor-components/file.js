export default {
  id: 'media-file',
  label: 'Media File',
  fields: [
    {
      name: 'file',
      label: 'File',
      widget: 'file',
      /*media_folder: 'static/media',
      path: '/static/media',*/
      media_library: {
        allow_multiple: false,
      },
    },
    {
      label: 'Titre',
      name: 'title',
      required: false,
    },
  ],
  pattern: /(.*?)<mediafile>(.*?)<\/mediafile>(.*?)/,
  fromBlock: function (match) {
    return JSON.parse(match[2]);
  },
  toBlock: function (obj) {
    return '<mediafile>' + JSON.stringify(obj) + '</mediafile>';
  },
  toPreview: function (obj) {
    return `<img src="${obj.url}"/>`;
  },
};
