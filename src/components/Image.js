import React from 'react';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import {Box} from '@chakra-ui/react';

const Image = ({image, alt, ...rest}) => {
  if (image && image.url) {
    // this is an image coming from Decap CMS
    return <Image src={image.url} alt={alt} {...rest} />;
  } else if (image && image.childImageSharp) {
    // this should be an image processed by gatsby-plugin-image
    const imageRef = getImage(image);
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
