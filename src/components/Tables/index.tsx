import React from 'react';
import ELOTransitionRankingOld from './ELOTransitionRankingOld';
import ELOTransitionRankingNew from './ELOTransitionRankingNew';

type TablesProps = {
  type: string;
};

const Tables = ({type}: TablesProps) => {
  switch (type) {
    case 'ELOTransitionRankingOld':
      return <ELOTransitionRankingOld />;
    case 'ELOTransitionRankingNew':
      return <ELOTransitionRankingNew />;
    default:
      return null;
  }
};

export default Tables;
