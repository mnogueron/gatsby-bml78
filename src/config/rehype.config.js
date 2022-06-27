import React, {useMemo} from 'react';
import rehypeReact from 'rehype-react';
import Scoreboard from '../components/Scoreboard';
import {Heading, Text} from "@chakra-ui/react";

const H1 = (props) => <Heading as="h1" size="3xl" mt={10} mb={4} {...props}/>;
const H2 = (props) => <Heading as="h2" size="2xl" mt={8} mb={4} {...props}/>;
const H3 = (props) => <Heading as="h3" size="xl" mt={7} mb={4} {...props}/>;
const H4 = (props) => <Heading as="h4" size="lg" mt={6} mb={4} {...props}/>;
const H5 = (props) => <Heading as="h5" size="md" mt={5} mb={3} {...props}/>;
const H6 = (props) => <Heading as="h6" size="sm" mt={4} mb={2} {...props}/>;

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
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    p: Text,
  },
}).Compiler;