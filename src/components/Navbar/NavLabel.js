import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const NavLabel = ({ label, isActive, isHover, ...rest }) => {
  return (
    <Flex justifyContent="center">
      <Text
        {...rest}
        sx={{
          borderBottomWidth: 4,
          borderColor: isActive || isHover ? 'blue.500' : 'transparent',
          color: isActive ? 'blue.500' : 'gray.600',
          fontWeight: 'semibold',
          mx: 2,
          p: 3,
          textAlign: 'center',
          '&:hover': {
            borderColor: 'blue.500',
          },
        }}
      >
        {label}
      </Text>
    </Flex>
  );
};

export default NavLabel;
