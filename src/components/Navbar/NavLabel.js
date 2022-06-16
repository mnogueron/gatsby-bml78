import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const NavLabel = ({ label, isActive, isHover, icon, ...rest }) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      sx={{
        borderBottomWidth: 4,
        borderColor: isActive || isHover ? 'blue.500' : 'transparent',
        color: isActive ? 'blue.500' : 'gray.600',
        fontWeight: 'semibold',
        position: 'relative',
        mx: 2,
        p: 3,
        textAlign: 'center',
        '&:hover': {
          borderColor: 'blue.500',
        },
      }}
    >
      <Text {...rest} mr={icon && 2}>
        {label}
      </Text>
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
