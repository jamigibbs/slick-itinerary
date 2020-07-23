import React from "react";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";

const override = css`
  display: block;
  margin: 0 auto;
`;

class LoadingSpinner extends React.Component {

  render() {
    const { isLoading } = this.props;
    return (
      <div className="sweet-loading">
        <PuffLoader
          css={override}
          size={100}
          color={"#47D7B7"}
          loading={isLoading}
        />
      </div>
    );
  }
}

export default LoadingSpinner;