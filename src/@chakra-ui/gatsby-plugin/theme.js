import { extendTheme } from '@chakra-ui/react';
import components from './components';

const customSizes = {
  navbar: {
    height: {
      base: '48px',
      sm: '56px',
      md: '64px',
    },
  },
};

const semanticTokens = {
  colors: {
    'text.main': 'gray.800',
    'text.secondary': 'gray.600',
    'text.inverted.main': 'gray.100',
    'text.inverted.secondary': 'gray.200',
    'primary': 'red.600',
    'bg.main': '#FBFBFB'
  }
}

const theme = {
  colors: {
    primary: 'rebeccapurple',
    'blackAlpha.20': 'rgba(0, 0, 0, 0.02)',
  },
  sizes: {
    bml: customSizes,
  },
  space: {
    bml: customSizes,
  },
  components,
  styles: {
    global: {
      '.embedVideo-container': {
        maxWidth: 800,
        margin: 'auto',
      },
      'body': {
        bg: 'bg.main',
      },
    },
  },
  semanticTokens,
};

export default extendTheme(theme);
