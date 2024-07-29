import React, {useMemo, useState} from 'react';
import {Box, Center, CircularProgress, HTMLChakraProps} from '@chakra-ui/react';

export enum HelloAssoWidgetType {
  BUTTON = 'button',
  STICKER = 'sticker',
  FORM = 'form',
}

type HelloAssoWidgetProps = {
  url: string;
  type: HelloAssoWidgetType;
};

const HelloAssoWidget = ({url, type}: HelloAssoWidgetProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const props = useMemo((): HTMLChakraProps<'iframe'> => {
    switch (type) {
      case HelloAssoWidgetType.BUTTON:
        return {
          src: `${url}/widget-bouton`,
          width: '100%',
          height: '70px',
          border: 'none',
        };
      case HelloAssoWidgetType.STICKER:
        return {
          src: `${url}/widget-vignette`,
          width: '350px',
          height: '600px',
          margin: 'auto',
          border: 'none',
        };
      case HelloAssoWidgetType.FORM:
        return {
          src: `${url}/widget`,
          width: '100%',
          height: '750px',
          borderStyle: 'solid',
          borderWidth: '2px',
          borderColor: 'red.600',
          borderRadius: 'lg',
          scrolling: 'auto',
        };
    }
  }, [type, url]);

  return (
    <Box position="relative">
      <Box
        as="iframe"
        id="haWidget"
        allowTransparency={true}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
      {isLoading && (
        <Center
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          pointerEvents="none"
        >
          <CircularProgress isIndeterminate color="red.600" size={12} />
        </Center>
      )}
    </Box>
  );
};

export default HelloAssoWidget;
