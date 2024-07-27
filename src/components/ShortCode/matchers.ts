import React from 'react';
import HelloAssoWidget, {HelloAssoWidgetType} from '../HelloAssoWidget';

type ShortcodeMatcher<T extends React.ComponentType = any> = {
  regex: RegExp;
  component: T;
  getProps: (match: RegExpMatchArray) => React.ComponentProps<T>;
};

const ShortcodeMatchers: ShortcodeMatcher[] = [
  {
    regex: new RegExp(`helloasso-(button|sticker|form): (.*)`, 'i'),
    component: HelloAssoWidget,
    getProps: (match: RegExpMatchArray) => ({
      type: match[1] as HelloAssoWidgetType,
      url: match[2].trim(),
    }),
  },
];

export default ShortcodeMatchers;
