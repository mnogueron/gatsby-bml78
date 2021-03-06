import { extendTheme } from '@chakra-ui/react';
import Link from './components/link';

const customSizes = {
  navbar: {
    height: {
      base: '48px',
      sm: '56px',
      md: '68px',
    },
  },
};

const theme = {
  colors: {
    primary: 'rebeccapurple',
  },
  sizes: {
    bml: customSizes,
  },
  space: {
    bml: customSizes,
  },
  components: {
    Link,
  }
};

export default extendTheme(theme);
