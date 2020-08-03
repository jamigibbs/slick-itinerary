import React from 'react';
import { css } from '@emotion/core';
import PuffLoader from 'react-spinners/PuffLoader';

const override = css`
  display: block;
  margin: 0 auto;
`;

const LoadingSpinner = (props) => {
  const { isLoading, text } = props;
  return (
    <div className="sweet-loading">
      <PuffLoader
        css={override}
        size={100}
        color={"#47D7B7"}
        loading={isLoading}
      />

      {text ? <p style={{color: '#999999', marginTop: '10px', textAlign: 'center'}}>{text}</p> : null}
    </div>
  );
}

export default LoadingSpinner;