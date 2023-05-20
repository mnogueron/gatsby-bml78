import React, { useEffect } from 'react';
import {
  Alert,
  AlertIcon,
  useDisclosure,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';

const Banner = ({ text, level }) => {
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });

  useEffect(() => {
    const latestBannerHide = localStorage.getItem('hide-banner');
    if (
      !latestBannerHide ||
      Number(latestBannerHide) + 1000 * 60 * 60 * 24 < new Date().getTime()
    ) {
      onOpen();
    } else {
      onClose();
    }
  }, [onOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    onClose();
    localStorage.setItem('hide-banner', new Date().getTime() + '');
  };

  return (
    <Alert
      status={level === 'warning' ? 'warning' : 'info'}
      borderRadius={8}
      colorScheme={level === 'warning' ? 'orange' : 'gray'}
      py={{base: 2, md: 4}}
    >
      <AlertIcon me={{base: 3, md: 4}} />
      <AlertDescription flex={1} whiteSpace="pre-wrap" fontWeight={"medium"}>
        {text}
      </AlertDescription>
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        onClick={handleClose}
      />
    </Alert>
  );
};

export default Banner;
