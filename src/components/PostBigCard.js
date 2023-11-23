import React from 'react';
import BigCard from './BigCard';

const PostBigCard = ({post, ...rest}) => {
  return (
    <BigCard
      image={post.featuredimage}
      heading={post.cardTitle || post.heading}
      subtitle={post.cardSubtitle}
      date={post.date}
      to={post.fields.slug}
      size="md"
      {...rest}
    />
  );
};

export default PostBigCard;
