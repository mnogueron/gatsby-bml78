import React from 'react';
import Header from '../../components/Header';
import Content from '../../components/Content';
import Container from '../../components/Container';
import {
  Avatar,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  useBreakpointValue,
  GridItem,
} from '@chakra-ui/react';
import { getSrc } from 'gatsby-plugin-image';

const Member = ({ name, picture, title }) => {
  const size = useBreakpointValue({base: 'xl', sm: '2xl'});
  return (
    <VStack>
      <Avatar size={size} name={name} src={picture?.url || getSrc(picture)} />
      <Heading as="h4" size="md" textAlign="center">
        {name}
      </Heading>
      <Text fontWeight="semibold" textAlign="center">
        {title}
      </Text>
    </VStack>
  );
};

function ContentPageTemplate({
  heading,
  subheading,
  html,
  president,
  treasurer,
  secretary,
  team,
}) {
  return (
    <>
      {(heading || subheading) && (
        <Header heading={heading} subheading={subheading} />
      )}
      {html && <Content html={html} pb={0} pt={{ base: 2, md: 4, lg: 6 }} />}
      <Container as="article" pt={{ base: 2, md: 4, lg: 6 }} pb={{ base: 6, md: 10, lg: 20 }}>
        <VStack spacing={{ base: 4, sm: 6, md: 10}}>
          <Member title="Président" {...president} />
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 4, sm: 6, md: 10}} width="100%">
            <GridItem colStart={{ base: 1, md: 2 }}>
              <Member title="Trésorier" {...treasurer} />
            </GridItem>
            <GridItem colStart={{ base: 2, md: 3 }}>
              <Member title="Secrétaire Général" {...secretary} />
            </GridItem>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 2, md: 3 }} spacing={{ base: 4, sm: 6, md: 10}} width="100%">
            {team.map((member) => (
              <Member key={member.name} {...member} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </>
  );
}

export default ContentPageTemplate;
