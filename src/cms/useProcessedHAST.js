import {useEffect, useState} from 'react';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import katex from 'rehype-katex';

const useProcessedHAST = data => {
  const [processedHAST, setProcessedHAST] = useState(null);

  useEffect(() => {
    const prepareHTML = async () => {
      const processor = unified()
        .use(remarkParse)
        .use(remarkMath)
        .use(remarkRehype, {allowDangerousHtml: true})
        .use(katex)
        .use(remarkFrontmatter)
        .use(rehypeRaw);
      const preparedHTML = await processor.run(processor.parse(data));
      setProcessedHAST(preparedHTML);
    };
    prepareHTML();
  }, [data]);

  return processedHAST;
};

export default useProcessedHAST;
