import React from 'react';
import {BoxProps, Container as ChakraContainer} from '@chakra-ui/react';

type ContainerProps = {
  children: React.ReactNode;
} & BoxProps;

/**
 * Section for markdown content (prose)
 * applies max width and padding
 */
function Container({children, ...rest}: ContainerProps) {
  return (
    <ChakraContainer
      maxW="5xl"
      px={{base: 6, md: 10}}
      pt={{base: 0, md: 5, lg: 10}}
      pb={{base: 2, md: 5, lg: 10}}
      {...rest}
    >
      {children}
    </ChakraContainer>
  );
}

export default Container;
