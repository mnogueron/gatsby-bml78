import { AspectRatio, Box } from '@chakra-ui/react';
import React from 'react';

const YoutubeVideo = ({ id }) => {
  return (
    <AspectRatio ratio={16 / 9}>
      <Box
        as="iframe"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        borderRadius={10}
      />
    </AspectRatio>
  );
};

export default YoutubeVideo;
