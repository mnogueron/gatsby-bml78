export default {
  id: 'gallery',
  label: 'Gallery',
  fields: [
    {
      name: 'pictures',
      label: 'Pictures',
      label_singular: 'Picture',
      widget: 'list',
      fields: [
        {
          label: 'Image',
          name: 'image',
          widget: 'image',
          required: true,
        },
      ],
    },
  ],
  pattern: /^<gallery>(.*?)<\/gallery>$/,
  fromBlock: function (match) {
    return JSON.parse(match[1]);
  },
  toBlock: function (obj) {
    return '<gallery>' + JSON.stringify(obj) + '</gallery>';
  },
  toPreview: function (obj) {
    return obj.url;
  },
};
