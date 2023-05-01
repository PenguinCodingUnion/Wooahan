// import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import playground from "assets/images/background_playground.jpg";

export const GameEnding = (props) => {
  return (
    <div
      className="grid items-center w-screen h-screen"
      style={{
        background: `url(${playground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-[#6937A1] font-MaplestoryBold text-6xl text-stroke-mainWhite text-stroke-2">
        야호!
      </div>
    </div>
  );
};

GameEnding.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameEnding);
