import {DeepNullable} from './utils';

export type BannerType = DeepNullable<{
  text: string;
  level: 'warning' | 'info';
  hide: boolean;
}>;
