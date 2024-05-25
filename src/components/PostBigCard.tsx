import React from 'react';
import {BoxProps} from '@chakra-ui/react';
import BigCard from './BigCard';
import {Post} from '../types/post';

type PostBigCardProps = {
  post: Post;
} & BoxProps;

const PostBigCard = ({post, ...rest}: PostBigCardProps) => {
  return (
    <BigCard
      image={post.featuredimage}
      heading={post.cardTitle || post.heading}
      subtitle={post.cardSubtitle}
      date={post.date}
      url={post.fields.slug}
      size="md"
      {...rest}
    />
  );
};

export default PostBigCard;
