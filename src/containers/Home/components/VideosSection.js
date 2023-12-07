import React from 'react';
import {SimpleGrid} from '@chakra-ui/react';
import HomeSection from './HomeSection';
import YoutubeVideo from './YoutubeVideo';

const VideosSection = ({videos}) => {
  return (
    <HomeSection
      title="Nos dernières vidéos"
      moreButtonRedirectTo="/results/videos"
    >
      <SimpleGrid columns={{base: 1, lg: 2}} spacing={{base: 6, sm: 6, lg: 8}}>
        {videos.slice(0, 2).map(video => (
          <YoutubeVideo key={video.id} id={video.id} />
        ))}
      </SimpleGrid>
    </HomeSection>
  );
};

export default VideosSection;
