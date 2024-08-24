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
        px: 2,
        py: 2,
        textAlign: 'center',
        '&:hover': {
          color: 'primary',
        },
      }}
    >
      <Text>{label}</Text>
      {icon && <Flex width={4}>{icon}</Flex>}
    </Flex>
  );
};

export default NavLabel;
