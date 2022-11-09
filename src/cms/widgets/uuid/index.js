import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import React from 'react';

export class UuidControl extends React.Component {
  handleClick = () => {
    this.props.onChange(v4());
  };

  render() {
    const { forID, value, classNameWrapper } = this.props;

    return (
      <div style={{ display: 'flex' }}>
        <input
          id={forID}
          className={classNameWrapper}
          value={value}
          disabled={true}
          placeholder={'Press "Generate ID" first'}
        />
        <button onClick={this.handleClick} style={{ marginLeft: '1em' }}>
          Generate ID
        </button>
      </div>
    );
  }
}

UuidControl.propTypes = {
  onChange: PropTypes.func.isRequired,
  forID: PropTypes.string,
  value: PropTypes.node,
  classNameWrapper: PropTypes.string.isRequired,
};

UuidControl.defaultProps = {
  value: '',
};

export function UuidPreview({ value }) {
  return <div>{value}</div>;
}

UuidPreview.propTypes = {
  value: PropTypes.node,
};
