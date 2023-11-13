import React, { useMemo } from 'react';
import ClubQuoteSection from '../../containers/home/ClubQuoteSection';
import LastNewsSection from '../../containers/home/LastNewsSection';
import LastResultsSection from '../../containers/home/LastResultsSection';
import Header from '../../containers/home/Header';
import { preparePosts } from '../../utils';
import {Box} from "@chakra-ui/react";

const IndexPageTemplate = ({
  heading,
  subheading,
  headerImage,
  image,
  banner,
  clubSectionContent,
  posts = [],
  results = [],
}) => {
  const preparedPosts = useMemo(() => preparePosts(posts), []);
  const preparedResults = useMemo(() => preparePosts(results), []);

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
      </Box>
    </>
  );
};

export default IndexPageTemplate;
