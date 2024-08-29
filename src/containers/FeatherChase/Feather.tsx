import React, {useLayoutEffect, useMemo, useState} from 'react';
import {Box, ResponsiveObject, useBreakpointValue} from '@chakra-ui/react';
import Image from '../../components/Image';
import {createPortal} from 'react-dom';
import {FeatherType, EncodedFeatherType} from './types';
import {Global} from '@emotion/react';

type FeatherProps = {
  encodedFeather: EncodedFeatherType;
};

const Feather = ({encodedFeather}: FeatherProps) => {
  const [portalRef, setPortalRef] = useState<Element | null>(null);
  const featherContent = useMemo(() => {
    return JSON.parse(atob(encodedFeather.content)) as FeatherType;
  }, [encodedFeather.content]);
  const portalSelector = useBreakpointValue(
    typeof featherContent.portalSelector === 'object'
      ? (featherContent.portalSelector as ResponsiveObject<string>)
      : {base: featherContent.portalSelector}
  );
  //const portalRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!portalSelector) {
      return;
    }
    const parentContainer = document.querySelector(portalSelector);
    if (parentContainer) {
      let portalContainer = parentContainer.children[0];
      if (
        !portalContainer ||
        portalContainer.id !== `container-${featherContent.id}`
      ) {
        portalContainer = document.createElement('div');
        portalContainer.setAttribute('id', `container-${featherContent.id}`);
        parentContainer.prepend(portalContainer);
      }
      if (portalContainer) {
        setPortalRef(portalContainer);
      }
    }
  }, [featherContent, portalSelector]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Found feather');
  };

  if (!portalRef) {
    return null;
  }

  return (
    <>
      <Global
        styles={{
          [`${portalSelector}`]: {position: 'relative'},
        }}
      />
      {createPortal(
        <Box
          as={Image}
          image={{
            url: `/assets/featherChase/plume_${featherContent.assetId}.svg`,
          }}
          alt=""
          position="absolute"
          height="32px"
          padding={2}
          boxSizing="content-box"
          sx={featherContent.sx}
          onClick={handleClick}
        />,
        portalRef
      )}
    </>
  );
};

export default Feather;
