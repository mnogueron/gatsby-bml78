import React from 'react';
import { renderAst } from '../config/rehype.config';
import {Container} from "@chakra-ui/react";

/**
 * Section for markdown content (prose)
 * applies max width and padding
 */
function Content({ html }) {
  return (
    <Container maxW="5xl" pt={20} pb={10}>
        {renderAst(html)}
    </Container>
  );
}

export default Content;
