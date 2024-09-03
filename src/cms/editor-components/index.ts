import {EditorComponentOptions} from 'decap-cms-core';
import CMS from 'decap-cms-app';

// @ts-ignore
import youtube from './youtube';
import helloAsso from './helloAsso';
// @ts-ignore
import scoreboard from './scoreboard';
// @ts-ignore
import teamScoreboard from './teamScoreboard';
import teamTanking from './teamTanking';
import teamCalendar from './teamCalendar';
// @ts-ignore
import gallery from './gallery';

const editorComponents: EditorComponentOptions[] = [
  youtube,
  helloAsso,
  scoreboard,
  teamScoreboard,
  teamTanking,
  teamCalendar,
  gallery,
  //file,
  //grid,
];

export const registerEditorComponents = () => {
  editorComponents.forEach(e => {
    CMS.registerEditorComponent(e);
  });
};
