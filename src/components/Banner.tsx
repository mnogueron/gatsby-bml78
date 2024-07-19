import React, {useEffect, useRef} from 'react';
import {
  Alert,
  AlertIcon,
  useDisclosure,
  AlertDescription,
  CloseButton,
  Box,
  Portal,
} from '@chakra-ui/react';
import {useScroll} from '../hooks/useScroll';
import {DeepNullable} from '../types/utils';
import md5 from 'crypto-js/md5';
import * as dateFns from 'date-fns';

type BannerProps = {
  banner: DeepNullable<{
    text: string;
    level: 'warning' | 'info';
    hide: boolean;
  }>;
};

const Banner = ({banner}: BannerProps) => {
  const bodyRef = useRef(
    typeof document !== 'undefined' ? document.body : null
  );
  const {scrollY, scrollDirection} = useScroll();
  const {isOpen, onClose, onOpen} = useDisclosure();

  useEffect(() => {
    if (!banner || banner.hide || !banner.text) {
      return;
    }

    const bannerHash = md5(banner.text);
    const bannerShowState = localStorage.getItem(`banner-${bannerHash}`);
    if (
      !bannerShowState ||
      // Display the banner again after 7 days
      dateFns.isBefore(
        dateFns.addDays(new Date(Number(bannerShowState)), 1),
        new Date()
      )
    ) {
      onOpen();
    } else {
      onClose();
    }
  }, [onOpen, onClose, banner]);

  // Clear all old banners
  useEffect(() => {
    const bannerStates = Object.entries({...localStorage}).filter(([key]) =>
      key.startsWith('banner-')
    );
    bannerStates.forEach(([key, timestamp]) => {
      if (
        // Display the banner again after 7 days
        dateFns.isBefore(
          dateFns.addDays(new Date(Number(timestamp)), 1),
          new Date()
        )
      ) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  const handleClose = () => {
    if (!banner || banner.hide || !banner.text) {
      return;
    }

    onClose();
    const bannerHash = md5(banner.text);
    localStorage.setItem(`banner-${bannerHash}`, new Date().getTime() + '');
  };

  return (
    <Portal containerRef={bodyRef}>
      <Box
        position="fixed"
        top={{
          base: 'bml.navbar.height.base',
          sm: 'bml.navbar.height.sm',
          lg: 'bml.navbar.height.md',
        }}
        right={0}
        zIndex="docked"
        py={{base: 3, sm: 4, md: 6}}
        px={{base: 3, sm: 4, md: 6}}
        sx={{
          transitionDuration: '300ms, 500ms',
          transitionProperty: 'transform, opacity',
          transitionTimingFunction: 'ease-in-out',
          opacity: isOpen ? 1 : 0,
          transform: !isOpen
            ? 'translateY(200px)'
            : scrollDirection === 'down' || scrollY < 200
              ? 'translateY(0)'
              : {
                  base: 'translateY(calc(-1*var(--chakra-space-bml-navbar-height-base)))',
                  sm: 'translateY(calc(-1*var(--chakra-space-bml-navbar-height-sm)))',
                  lg: 'translateY(calc(-1*var(--chakra-space-bml-navbar-height-md)))',
                },
        }}
      >
        <Box maxW={{base: '3xl', lg: '2xl'}}>
          {banner && (
            <Alert
              status={banner.level === 'warning' ? 'warning' : 'info'}
              borderRadius={8}
              colorScheme={banner.level === 'warning' ? 'orange' : 'gray'}
              py={{base: 2, md: 4}}
            >
              <AlertIcon me={{base: 3, md: 4}} />
              <AlertDescription
                flex={1}
                whiteSpace="pre-wrap"
                fontWeight={'medium'}
              >
                {banner.text}
              </AlertDescription>
              <CloseButton
                alignSelf="flex-start"
                position="relative"
                right={-1}
                top={-1}
                onClick={handleClose}
              />
            </Alert>
          )}
        </Box>
      </Box>
    </Portal>
  );
};

export default Banner;
