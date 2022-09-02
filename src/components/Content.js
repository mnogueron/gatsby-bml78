import React from 'react';
import { renderAst } from '../config/rehype.config';
import Container from './Container';

/**
 * Section for markdown content (prose)
 * applies max width and padding
 */
function Content({ html, ...rest }) {
  return (
    <Container{...rest}>
      {renderAst(html)}
    </Container>
  );
}

export default Content;
