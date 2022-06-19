import React, {useMemo} from 'react';
import rehypeReact from 'rehype-react';
import Scoreboard from '../components/Scoreboard';

const withChildrenAsJSONProps = (Component) => {
  const PreparedComponent = ({ children }) => {
    const props = useMemo(() => JSON.parse(children), [children]);

    return <Component {...props}/>
  }
  return PreparedComponent;
}

export const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    scoreboard: withChildrenAsJSONProps(Scoreboard),
  },
}).Compiler;