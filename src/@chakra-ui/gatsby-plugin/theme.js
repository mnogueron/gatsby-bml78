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
  },
  styles: {
    global: {
      '.embedVideo-container': {
        maxWidth: 800,
        margin: 'auto',
      },
      '.gatsby-resp-image-wrapper': {
        maxWidth: "800px !important",
      }
    }
  }
};

export default extendTheme(theme);
