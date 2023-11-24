import React, {useMemo, useState} from 'react';
import createCache from '@emotion/cache';
import {CacheProvider} from '@emotion/react';
import {ChakraProvider} from '@chakra-ui/react';

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
      <ChakraProvider>{props.children}</ChakraProvider>
    </FrameProvider>
  );
};

export default PreviewStyleProvider;
