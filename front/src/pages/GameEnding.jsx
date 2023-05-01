// import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";

import playground from "assets/images/background_playground.jpg";
import ant from "assets/images/sample/ant.jpg";
import EndingScene from "components/gameEnding/EndingScene";
import GetStar from "components/gameEnding/GetStar";

export const GameEnding = (props) => {
  const sampleReward = {
    starCount: 4,
    card: { name: "개미", image: ant },
  };

  const [isEndingSceneOpen, setIsEndingSceneOpen] = useState(true);

  const closeEndingScene = () => {
    setIsEndingSceneOpen(false);
  };

  return (
    <div
      className="grid items-center w-screen h-screen"
      style={{
        background: `url(${playground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {isEndingSceneOpen && <EndingScene closeEndingScene={closeEndingScene} />}
      {!isEndingSceneOpen && <GetStar starCount={sampleReward.starCount} />}
    </div>
  );
};

GameEnding.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameEnding);
