import React from 'react';
import {Flex, Text} from '@chakra-ui/react';
const NavLabel = ({label, icon, isTransparent, ...rest}) => {
  return (
    <Flex
      {...rest}
      justifyContent="center"
      alignItems="center"
      sx={{
        color: isTransparent ? 'text.inverted.main' : 'text.main',
        fontWeight: 'semibold',
        position: 'relative',
        mx: 2,
        p: 3,
        textAlign: 'center',
        '&:hover': {
          color: 'primary',
        },
      }}
    >
      <Text mr={icon && 2}>{label}</Text>
      {icon && (
        <Flex
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: '-0.5rem',
            alignItems: 'center',
          }}
        >
          {icon}
        </Flex>
      )}
    </Flex>
  );
};

export default NavLabel;
