import React from 'react';
import {Rank} from '../types';
import SmallRankBadge from './SmallRankBadge';
import MediumRankBadge from './MediumRankBadge';

type RankBadgeProps = {
  rank: Rank;
};

const RankBadge = ({rank}: RankBadgeProps) => {
  return (
    <>
      <SmallRankBadge rank={rank} display={{base: 'block', md: 'none'}} />
      <MediumRankBadge rank={rank} display={{base: 'none', md: 'flex'}} />
    </>
  );
};

export default RankBadge;
