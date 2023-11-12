import React from 'react';
import { CardGrid } from '../../components/Sections';
import HomeSection from './HomeSection';

const LastResultsSection = ({ results }) => {
  return (
    <HomeSection
      title="Les derniers résultats du club"
      moreButtonRedirectTo="/results"
    >
      <CardGrid posts={results} subheading={'Résultats'} />
    </HomeSection>
  );
};

export default LastResultsSection;
