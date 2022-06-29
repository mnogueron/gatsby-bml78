import React from 'react';
import PreviewStyleProvider from './PreviewStyleProvider';

const withPreviewWrapper = (Component) => {
  const WrapperComponent = (props) => {
    const data = props.entry.getIn(['data']).toJS();

    if (data) {
      return (
        <PreviewStyleProvider>
          <Component {...props} data={data} />
        </PreviewStyleProvider>
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  return WrapperComponent;
};

export default withPreviewWrapper;
