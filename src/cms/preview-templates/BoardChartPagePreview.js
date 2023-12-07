import React from 'react';
import BoardChartPageTemplate from '../../containers/Board/BoardChartPageTemplate';
import useProcessedHAST from '../useProcessedHAST';

const ContentPagePreview = ({data, getAsset}) => {
  const html = useProcessedHAST(data.body);

  const president = {
    ...data.president,
    picture: data.president.picture && getAsset(data.president.picture),
  };

  const treasurer = {
    ...data.treasurer,
    picture: data.treasurer.picture && getAsset(data.treasurer.picture),
  };

  const secretary = {
    ...data.secretary,
    picture: data.secretary.picture && getAsset(data.secretary.picture),
  };

  const board = data.board.map(member => ({
    ...member,
    picture: member.picture && getAsset(member.picture),
  }));

  return (
    <BoardChartPageTemplate
      heading={data.heading}
      subheading={data.subheading}
      html={html}
      president={president}
      treasurer={treasurer}
      secretary={secretary}
      team={board}
    />
  );
};

export default ContentPagePreview;
