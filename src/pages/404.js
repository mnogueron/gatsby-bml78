import React from 'react';
import {Link} from 'gatsby';
import {GiShuttlecock} from 'react-icons/gi';
import {Button, Heading, Icon, Text} from '@chakra-ui/react';
import {Container} from '../components/Sections';
import PageLayout from '../components/PageLayout';

function PageNotFound() {
  return (
    <PageLayout>
      <Container className="text-center">
        <Icon as={GiShuttlecock} boxSize={48} />
        <Heading
          as="h2"
          fontSize={{base: '3xl', md: '4xl', lg: '5xl'}}
          color="text.main"
          mt={4}
        >
          {"Quelqu'un s'est perdu..."}
        </Heading>
        <Text mt={{base: 4, sm: 8}} fontSize="lg">
          Il semblerait que votre volant se soit perdu en chemin.
        </Text>
        <Text fontSize="lg" mt={2}>
          Vous le retrouverez peut-être en retournant sur vos pas.
        </Text>

        <Button colorScheme="red" mt={8} as={Link} to="/">
          Retrouver mon volant
        </Button>
      </Container>
    </PageLayout>
  );
}

export default PageNotFound;
