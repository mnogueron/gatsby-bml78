import React, {useMemo} from 'react';
import {useLocation} from '@reach/router';
import RehypeReact from 'rehype-react';
import Scoreboard from '../components/Scoreboard';
import TeamScoreboard from '../components/TeamScoreboard';
import TeamCalendar from '../components/TeamCalendar';
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
import ShortCode from '../components/ShortCode';
import IFrame from '../components/IFrame';
import TeamRanking from '../components/TeamRanking';

const Table = props => (
  <TableContainer>
    <TempoTable {...props} />
  </TableContainer>
);

const A = props => {
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

const HeadingLink = props => {
  const {hash} = useLocation();
  const highlightSx = useMemo(() => {
    if (!hash) {
      return {};
    }

    const headerLevel = parseInt(props.as.match(/h(\d)/)[1]);
    const headerArray = Array.from({length: headerLevel}, (_, i) => i + 1);

    return {
      [`&:has(a[href="${hash}"])`]: {
        bg: 'yellow.100',
        borderRadius: 'md',
        '& ~ *': {
          bg: 'yellow.100',
          borderRadius: 'md',
        },
        // Select all next headers and reset background color
        [headerArray.map(hLevel => `& ~ h${hLevel}`).join(', ')]: {
          bg: 'initial',
          borderRadius: 'initial',
        },
        // Select all next headers siblings and reset background color
        [headerArray.map(hLevel => `& ~ h${hLevel} ~ *`).join(', ')]: {
          bg: 'initial',
          borderRadius: 'initial',
        },
      },
    };
  }, [hash, props.as]);

  return (
    <Heading
      {...props}
      sx={{
        ...props.sx,
        ...highlightSx,
      }}
    />
  );
};

const H1 = props => (
  <HeadingLink as="h1" size="2xl" mt={10} mb={8} {...props} />
);
const H2 = props => <HeadingLink as="h2" size="xl" mt={8} mb={7} {...props} />;
const H3 = props => <HeadingLink as="h3" size="lg" mt={7} mb={6} {...props} />;
const H4 = props => <HeadingLink as="h4" size="md" mt={6} mb={4} {...props} />;
const H5 = props => <HeadingLink as="h5" size="sm" mt={5} mb={3} {...props} />;
const H6 = props => <HeadingLink as="h6" size="xs" mt={4} mb={2} {...props} />;

const P = props => (
  <Text
    my={{base: 2, md: 4}}
    as={'p'}
    fontSize={{base: 'md', md: 'lg'}}
    lineHeight="base"
    {...props}
  />
);
const Ul = props => (
  <UnorderedList
    mb={{base: 4}}
    paddingStart={{base: 3, md: 8}}
    sx={{
      '& li::marker': {
        color: 'gray.300',
        borderRadius: '50%',
      },
    }}
    {...props}
  />
);
const Ol = props => (
  <OrderedList
    mb={8}
    paddingStart={{base: 3, md: 8}}
    sx={{
      '& li::marker': {
        color: 'gray.500',
      },
    }}
    {...props}
  />
);
const Li = props => (
  <ListItem
    my={2}
    fontSize={{base: 'md', md: 'lg'}}
    lineHeight="tall"
    {...props}
  />
);
const MediaFile = ({file, title}) => {
  return <Link href={file}>{title || file}</Link>;
};

const Grid = ({columns, children}) => {
  return (
    <SimpleGrid columns={JSON.parse(columns)} spacing={10}>
      {children}
    </SimpleGrid>
  );
};

const FigCaption = props => (
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

const withChildrenAsJSONProps = Component => {
  const PreparedComponent = ({children}) => {
    const props = useMemo(() => JSON.parse(children), [children]);

    return <Component {...props} />;
  };
  return PreparedComponent;
};

export const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: {
    scoreboard: withChildrenAsJSONProps(Scoreboard),
    teamscoreboard: withChildrenAsJSONProps(TeamScoreboard),
    teamranking: withChildrenAsJSONProps(TeamRanking),
    teamcalendar: withChildrenAsJSONProps(TeamCalendar),
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
    thead: props => <Thead borderBottomWidth="4px" {...props} />,
    tbody: Tbody,
    tr: Tr,
    th: Th,
    td: Td,
    tfoot: Tfoot,
    a: A,
    mediafile: withChildrenAsJSONProps(MediaFile),
    simplegrid: Grid,
    figcaption: FigCaption,
    code: ShortCode,
    iframe: IFrame,
  },
}).Compiler;
