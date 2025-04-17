import {useEffect, useState} from 'react';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeRaw from 'rehype-raw';

const useProcessedHAST = data => {
  const [processedHAST, setProcessedHAST] = useState(null);

  useEffect(() => {
    const prepareHTML = async () => {
      const processor = unified()
        .use(remarkParse)
        .use(remarkRehype, {allowDangerousHtml: true})
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
