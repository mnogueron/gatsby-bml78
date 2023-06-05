import React, { useMemo } from 'react';
import rehypeReact from 'rehype-react';
import Scoreboard from '../components/Scoreboard';
import TeamScoreboard from '../components/TeamScoreboard';
import Gallery from '../components/Gallery';
import {
  Heading,
  ListItem,
  OrderedList,
  TableContainer,
  Table as TempoTable,
  Tbody,
  Text,
  Tfoot,
  Thead,
  Tr,
  Td,
  Th,
  UnorderedList,
  Link,
  SimpleGrid,
} from '@chakra-ui/react';

const Table = (props) => (
  <TableContainer>
    <TempoTable {...props} />
  </TableContainer>
);

const A = (props) => {
  const isTargetBlank = props.href.startsWith('target_blank:');
  return (
    <Link
      {...(isTargetBlank
        ? {
            ...props,
            href: props.href.replace(/^target_blank:/, ''),
            target: '_blank',
            rel: 'noopener noreferrer',
          }
        : props)}
    />
  );
};

const H1 = (props) => <Heading as="h1" size="2xl" mt={10} mb={8} {...props} />;
const H2 = (props) => <Heading as="h2" size="xl" mt={8} mb={7} {...props} />;
const H3 = (props) => <Heading as="h3" size="lg" mt={7} mb={6} {...props} />;
const H4 = (props) => <Heading as="h4" size="md" mt={6} mb={4} {...props} />;
const H5 = (props) => <Heading as="h5" size="sm" mt={5} mb={3} {...props} />;
const H6 = (props) => <Heading as="h6" size="xs" mt={4} mb={2} {...props} />;

const P = (props) => (
  <Text
    my={{base: 2, md: 6}}
    as={'div'}
    fontSize={{ base: 'md', md: 'lg' }}
    lineHeight="tall"
    {...props}
  />
);
const Ul = (props) => (
  <UnorderedList
    mb={{ base: 4, md: 8}}
    paddingStart={{ base: 3, md: 8 }}
    sx={{
      '& li::marker': {
        color: 'gray.300',
        borderRadius: '50%',
      },
    }}
    {...props}
  />
);
const Ol = (props) => (
  <OrderedList
    mb={8}
    paddingStart={{ base: 3, md: 8 }}
    sx={{
      '& li::marker': {
        color: 'gray.500',
      },
    }}
    {...props}
  />
);
const Li = (props) => (
  <ListItem
    my={{ base: 2, md: 4 }}
    fontSize={{ base: 'md', md: 'lg' }}
    lineHeight="tall"
    {...props}
  />
);
const MediaFile = ({ file, title }) => {
  return <Link href={file}>{title || file}</Link>;
};

const Grid = ({ columns, children }) => {
  return (
    <SimpleGrid columns={JSON.parse(columns)} spacing={10}>
      {children}
    </SimpleGrid>
  );
};

const FigCaption = (props) => (
  <Text
    as="figcaption"
    {...props}
    textAlign="center"
    fontWeight="semibold"
    fontSize="md"
    fontStyle="italic"
    mt={2}
  />
);

const withChildrenAsJSONProps = (Component) => {
  const PreparedComponent = ({ children }) => {
    const props = useMemo(() => JSON.parse(children), [children]);

    return <Component {...props} />;
  };
  return PreparedComponent;
};

export const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    scoreboard: withChildrenAsJSONProps(Scoreboard),
    teamscoreboard: withChildrenAsJSONProps(TeamScoreboard),
    gallery: withChildrenAsJSONProps(Gallery),
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    p: P,
    ul: Ul,
    ol: Ol,
    li: Li,
    table: Table,
    thead: (props) => <Thead borderBottomWidth="4px" {...props} />,
    tbody: Tbody,
    tr: Tr,
    th: Th,
    td: Td,
    tfoot: Tfoot,
    a: A,
    mediafile: withChildrenAsJSONProps(MediaFile),
    simplegrid: Grid,
    figcaption: FigCaption,
  },
}).Compiler;
