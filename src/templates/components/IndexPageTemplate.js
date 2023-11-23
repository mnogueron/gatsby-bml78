import React, {useMemo} from 'react';
import {Box} from '@chakra-ui/react';
import Header from '../../containers/home/Header';
import ClubQuoteSection from '../../containers/home/ClubQuoteSection';
import LastNewsSection from '../../containers/home/LastNewsSection';
import LastResultsSection from '../../containers/home/LastResultsSection';
import VideosSection from '../../containers/home/VideosSection';
import {preparePosts} from '../../utils';

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
        banner={banner}
      />

      <Box pb={16}>
        <ClubQuoteSection content={clubSectionContent} />
        <LastNewsSection posts={preparedPosts} />
        <LastResultsSection results={preparedResults} />
        <VideosSection videos={videos} />
      </Box>
    </>
  );
};

export default IndexPageTemplate;
