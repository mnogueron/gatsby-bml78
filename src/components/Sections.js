import React from 'react';
import Card from './Card';
import {Box, SimpleGrid} from '@chakra-ui/react';

/**
 * Basic container to add max-w-7xl, some p-x and p-y
 */
export const Container = ({children, ...rest}) => {
  return (
    <Box
      maxW="7xl"
      px={{base: 4, sm: 6, lg: 8}}
      py={{base: 10, lg: 16}}
      mx="auto"
      {...rest}
    >
      {children}
    </Box>
  );
};

export const CardGrid = ({posts}) => {
  return (
    <SimpleGrid
      columns={{base: 1, sm: 2, lg: 3}}
      spacing={{base: 6, sm: 6, lg: 8}}
    >
      {posts.map((post, idx) => {
        return (
          <Card
            key={idx}
            image={post.featuredimage}
            heading={post.cardTitle || post.heading}
            subtitle={post.cardSubtitle}
            date={post.date}
            to={post.fields.slug}
          />
        );
      })}
    </SimpleGrid>
  );
};
