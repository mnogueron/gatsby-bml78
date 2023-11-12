import React from 'react';
import Card from './Card';
import Image from './Image';
import { Box, SimpleGrid } from '@chakra-ui/react';

/**
 * Basic container to add max-w-7xl, some p-x and p-y
 */
export const Container = ({ className, children, ...rest }) => {
  return (
    <Box
      className={`max-w-7xl px-4 py-10 mx-auto sm:px-6 lg:px-8 lg:py-16 ${className}`}
      {...rest}
    >
      {children}
    </Box>
  );
};

/**
 * Basic style for page section heading
 */
export const SectionHeading = ({ children }) => {
  return (
    <h2 className="text-2xl font-medium text-gray-800 sm:text-3xl lg:text-4xl">
      {children}
    </h2>
  );
};

/**
 * Text image split section, with image on the right by default
 */
export const TextImageSplit = ({
  image,
  children,
  imageLeft = false,
  ...rest
}) => {
  return (
    <Container {...rest}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-x-10">
        <div
          className={`w-full pt-8 pb-12 lg:w-1/2 ${
            imageLeft ? 'lg:order-last' : ''
          }`}
        >
          <div className="text-center max-w-lg mx-auto lg:text-left lg:max-w-7xl">
            {children}
          </div>
        </div>

        <div className={`flex items-center justify-center w-full lg:w-1/2`}>
          <Image
            className="rounded-md h-full w-full object-cover"
            image={image.image || image}
            alt={image.alt || ''}
          />
        </div>
      </div>
    </Container>
  );
};

export const CardGrid = ({ posts }) => {
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, lg: 3 }}
      spacing={{ base: 6, sm: 6, lg: 8 }}
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
