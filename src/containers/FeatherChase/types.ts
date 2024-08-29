import {ResponsiveValue, SystemStyleObject} from '@chakra-ui/react';

export type EncodedFeatherType = {
  location: string;
  content: string;
};

export type FeatherType = {
  id: string;
  assetId: 1 | 2 | 3 | 4;
  portalSelector: ResponsiveValue<string>;
  sx: SystemStyleObject;
};
