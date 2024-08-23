import React, {useMemo, useState} from 'react';
import createCache from '@emotion/cache';
import {CacheProvider} from '@emotion/react';
import {ChakraProvider} from '@chakra-ui/react';
import theme from '../@chakra-ui/gatsby-plugin/theme';

const FrameProvider = props => {
  const [container, setContainer] = useState(document.head);
  const cacheValue = useMemo(() => {
    if (!container) {
      return null;
    }

    return createCache({key: 'css', container});
  }, [container]);

  return (
    <div
      ref={node => {
        if (node) {
          setContainer(node.ownerDocument.head);
        }
      }}
    >
      {cacheValue ? (
        <CacheProvider value={cacheValue}>{props.children}</CacheProvider>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

const PreviewStyleProvider = props => {
  return (
    <FrameProvider>
      <ChakraProvider theme={theme}>{props.children}</ChakraProvider>
    </FrameProvider>
  );
};

export default PreviewStyleProvider;
