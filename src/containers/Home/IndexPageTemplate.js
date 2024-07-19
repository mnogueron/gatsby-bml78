import React, {useMemo} from 'react';
import {Box} from '@chakra-ui/react';
import Header from './components/Header';
import ClubQuoteSection from './components/ClubQuoteSection';
import LastNewsSection from './components/LastNewsSection';
import LastResultsSection from './components/LastResultsSection';
import VideosSection from './components/VideosSection';
import {preparePosts} from '../../utils';
import Banner from '../../components/Banner';

const IndexPageTemplate = ({
  heading,
  subheading,
  headerImage,
  image,
  banner,
  clubSectionContent,
  posts = [],
  results = [],
  videos = [],
}) => {
  const preparedPosts = useMemo(() => preparePosts(posts), [posts]);
  const preparedResults = useMemo(() => preparePosts(results), [results]);

  return (
    <>
      <Header
        headerImage={headerImage}
        heading={heading}
        subheading={subheading}
        image={image}
      />

      <Box pb={16}>
        <Banner banner={banner} />

        <ClubQuoteSection content={clubSectionContent} />
        <LastNewsSection posts={preparedPosts} />
        <LastResultsSection results={preparedResults} />
        <VideosSection videos={videos} />
      </Box>
    </>
  );
};

export default IndexPageTemplate;
