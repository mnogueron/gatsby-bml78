import React, {useLayoutEffect, useState} from 'react';
import {Box, ResponsiveObject, useBreakpointValue} from '@chakra-ui/react';
import Image from '../../components/Image';
import {createPortal} from 'react-dom';
import {FeatherType} from './types';
import {Global} from '@emotion/react';
import {useFeatherChaseContext} from './FeatherChaseProvider';

type FeatherProps = {
  f: FeatherType;
};

const Feather = ({f}: FeatherProps) => {
  const {catchFeather} = useFeatherChaseContext();
  const [portalRef, setPortalRef] = useState<Element | null>(null);
  const portalSelector = useBreakpointValue(
    typeof f.portalSelector === 'object'
      ? (f.portalSelector as ResponsiveObject<string>)
      : {base: f.portalSelector}
  );

  useLayoutEffect(() => {
    if (!portalSelector) {
      return;
    }
    const parentContainer = document.querySelector(portalSelector);
    if (parentContainer) {
      let portalContainer = parentContainer.children[0];
      if (!portalContainer || portalContainer.id !== `container-${f.id}`) {
        portalContainer = document.createElement('div');
        portalContainer.setAttribute('id', `container-${f.id}`);
        parentContainer.prepend(portalContainer);
      }
      if (portalContainer) {
        setPortalRef(portalContainer);
      }
    }
  }, [f, portalSelector]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    catchFeather(f.id);
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
            url: `/assets/featherChase/plume_${f.assetId}.svg`,
          }}
          alt=""
          position="absolute"
          height="32px"
          padding={2}
          boxSizing="content-box"
          sx={f.sx}
          onClick={handleClick}
        />,
        portalRef
      )}
    </>
  );
};

export default Feather;
