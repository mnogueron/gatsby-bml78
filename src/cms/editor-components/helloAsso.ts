import {EditorComponentOptions} from './types';

const component: EditorComponentOptions = {
  id: 'helloAssoWidget',
  label: 'HelloAsso Widget',
  fields: [
    {
      name: 'url',
      label: 'HelloAsso URL',
      widget: 'string',
    },
    {
      name: 'type',
      label: 'Type de widget',
      widget: 'select',
      options: [
        {label: 'Bouton', value: 'button'},
        {label: 'Vignette', value: 'sticker'},
        {label: 'Formulaire', value: 'form'},
      ],
      required: true,
      default: 'button',
    },
  ],
  pattern: /^`helloasso-(button|sticker|form):\s(.*)`$/,
  fromBlock: function (match) {
    return {
      type: match[1],
      url: match[2],
    };
  },
  toBlock: function (obj) {
    return `\`helloasso-${obj.type}: ` + obj.url + '`';
  },
  toPreview: function (obj) {
    return obj.url;
  },
};

export default component;
