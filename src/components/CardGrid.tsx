import React from 'react';
import {SimpleGrid} from '@chakra-ui/react';
import Card from './Card';
import {Post} from '../types/post';

type CardGridProps = {
  posts: Post[];
  getIdKey?: (index: number) => string;
};

const CardGrid = ({posts, getIdKey}: CardGridProps) => {
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
            url={post.fields.slug}
            id={getIdKey ? getIdKey(idx) : undefined}
          />
        );
      })}
    </SimpleGrid>
  );
};

export default CardGrid;
