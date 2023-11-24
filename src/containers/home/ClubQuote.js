import React from 'react';
import {Box, Icon} from '@chakra-ui/react';
import {RiDoubleQuotesL, RiDoubleQuotesR} from 'react-icons/ri';
import Content from '../../components/Content';

const ClubQuote = ({content}) => {
  return (
    <Box maxW="4xl" margin="auto" position="relative">
      <Icon
        as={RiDoubleQuotesL}
        boxSize={{base: 8, md: 14, lg: 16}}
        position="absolute"
        top={{base: -1, md: -3, lg: -5}}
        left={{base: -8, md: -14, lg: -16}}
        color="primary"
        opacity={0.8}
      />
      {content && (
        <Content
          html={content}
          p={'0 !important'}
          textAlign="justify"
          sx={{
            '& strong': {
              color: 'primary',
            },
          }}
        />
      )}
      <Icon
        as={RiDoubleQuotesR}
        boxSize={{base: 8, md: 14, lg: 16}}
        position="absolute"
        bottom={{base: -1, md: -3, lg: -5}}
        right={{base: -8, md: -14, lg: -16}}
        color="primary"
        opacity={0.8}
      />
    </Box>
  );
};

export default ClubQuote;
