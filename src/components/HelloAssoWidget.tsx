import React, {useMemo} from 'react';
import {Box, HTMLChakraProps} from '@chakra-ui/react';

enum HelloAssoWidgetType {
  BUTTON = 'button',
  STICKER = 'sticker',
  FORM = 'form',
}

type HelloAssoWidgetProps = {
  url: string;
  type: HelloAssoWidgetType;
};

const HelloAssoWidget = ({url, type}: HelloAssoWidgetProps) => {
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
          height: '450px',
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

  return <Box as="iframe" id="haWidget" allowTransparency={true} {...props} />;
};

export default HelloAssoWidget;
