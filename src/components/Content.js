import React from 'react';
import { renderAst } from '../config/rehype.config';
import { Container } from '@chakra-ui/react';

/**
 * Section for markdown content (prose)
 * applies max width and padding
 */
function Content({ html, ...rest }) {
  return (
    <Container
      maxW="5xl"
      px={{ base: 6, md: 10}}
      pt={{ base: 4, md: 10, lg: 20 }}
      pb={{ base: 2, md: 5, lg: 10 }}
      {...rest}
    >
      {renderAst(html)}
    </Container>
  );
}

export default Content;
