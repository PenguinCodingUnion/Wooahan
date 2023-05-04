import React from "react";
import PropTypes from "prop-types";
import TmpLoadingImage from "assets/images/background/TmpLoading.png";

const LoadingComponent = (props) => {
  return (
    <div
      className={`flex justify-center item-center absolute h-screen w-screen`}
    >
      <img
        className={`flex justify-center item-center absolute h-screen w-screen`}
        src={TmpLoadingImage}
        alt={`로딩 페이지입니다`}
      />
    </div>
  );
};

LoadingComponent.propTypes = {};

export default LoadingComponent;
