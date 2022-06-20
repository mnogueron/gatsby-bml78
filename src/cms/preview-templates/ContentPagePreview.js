import React, { useEffect, useState } from 'react';
import ContentPageTemplate from '../../templates/components/ContentPageTemplate';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { toHast, all } from 'mdast-util-to-hast';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeRaw from "rehype-raw";

const ContentPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();
  const [html, setHtml] = useState(null);

  useEffect(() => {
    const prepareHTML = async () => {
      const processor = unified()
        .use(remarkParse)
        .use(remarkRehype, {allowDangerousHtml: true})
        .use(rehypeRaw)
        .use(remarkFrontmatter);
      const preparedHTML = await processor.run(processor.parse(data.body));
      setHtml(preparedHTML);
    };
    prepareHTML();
  }, [data.body]);

  if (data) {
    return (
      <ContentPageTemplate
        heading={data.heading}
        subheading={data.subheading}
        html={html}
        /*team={team}*/
      />
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default ContentPagePreview;
