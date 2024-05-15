import React from 'react';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import {Box, BoxProps, Image as ChakraImage} from '@chakra-ui/react';
import {
  FileNode,
  ImageDataLike,
} from 'gatsby-plugin-image/dist/src/components/hooks';
import {IGatsbyImageData} from 'gatsby-plugin-image/dist/src/components/gatsby-image.browser';
import {DeepNullable} from '../types/utils';

type StaticImage = {url: string};

export type ImageType = StaticImage | ImageDataLike;

type ImageProps = {
  image: DeepNullable<ImageType> | null;
  alt: string;
} & BoxProps;

const Image = ({image, alt, ...rest}: ImageProps) => {
  if (image && (image as StaticImage).url) {
    // Image from Decap CMS
    return <ChakraImage src={(image as StaticImage).url} alt={alt} {...rest} />;
  } else if (
    image &&
    ((image as FileNode).childImageSharp || (image as IGatsbyImageData).layout)
  ) {
    // Image processed by gatsby-plugin-image
    const imageRef = getImage(image as ImageDataLike);
    return <Box as={GatsbyImage} image={imageRef} alt={alt} {...rest} />;
  } else {
    return (
      <Box bg="gray-100" p={4} color="gray.600" {...rest}>
        Image not defined.
      </Box>
    );
  }
};

export default Image;
