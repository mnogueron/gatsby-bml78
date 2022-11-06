import React, { useMemo } from 'react';
import ImageGallery from 'react-image-gallery';
import {Box} from "@chakra-ui/react";

const Gallery = ({ pictures }) => {
  const images = useMemo(() => {
    return (
      pictures?.map((picture) => ({
        original: picture.image,
        thumbnail: picture.image,
      })) || []
    );
  }, [pictures]);

  return (
    <Box maxW={900} m="auto">
      <ImageGallery items={images} showPlayButton={false} showBullets={true} />
    </Box>
  );
};

export default Gallery;
