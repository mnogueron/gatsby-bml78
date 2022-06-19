import React from 'react';
import { renderAst } from '../config/rehype.config';

/**
 * Section for markdown content (prose)
 * applies max width and padding
 */
function Content({ className, html }) {
  return (
    <div
      className={`max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="prose mx-auto prose-green md:prose-lg">
        {renderAst(html)}
      </div>
    </div>
  );
}

export default Content;
