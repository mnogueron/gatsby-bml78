import React from 'react';
import Header from '../../components/Header';
import Container from '../../components/Container';
import {SimpleGrid} from '@chakra-ui/react';
import YoutubeVideo from '../../containers/home/YoutubeVideo';

function VideosPageTemplate({heading, subheading, videos = []}) {
  return (
    <>
      <Header heading={heading} subheading={subheading} />
      <Container px={8} pt={8} pb={16} maxW="7xl">
        <SimpleGrid
          columns={{base: 1, lg: 2}}
          spacing={{base: 6, sm: 6, lg: 8}}
        >
          {videos.map(video => (
            <YoutubeVideo key={video.id} id={video.id} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}

export default VideosPageTemplate;
