// import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";

import playground from "assets/images/background_playground.jpg";
import ant from "assets/images/sample/ant.jpg";
import EndingScene from "components/gameEnding/EndingScene";
import GetStar from "components/gameEnding/GetStar";
import PickCard from "components/gameEnding/PickCard";
import { Navigate } from "react-router-dom";

export const GameEnding = (props) => {
  const sampleReward = {
    starCount: 4,
    card: { name: "개미", image: ant },
  };

  const [isEndingSceneOpen, setIsEndingSceneOpen] = useState(true);
  const [isGetStarOpen, setIsGetStarOpen] = useState(false);
  const [isPickCardOpen, setIsPickCardOpen] = useState(false);

  const closeEndingScene = () => {
    setIsEndingSceneOpen(false);
    setIsGetStarOpen(true);
  };

  const closeGetStar = () => {
    setIsGetStarOpen(false);
    setIsPickCardOpen(true);
  };

  const closePickCard = () => {
    setIsPickCardOpen(false);
  };

  // 별이 5개 아니면 pickcard안열고 메인으로 보내기
  return (
    <div
      className="grid items-center w-screen h-screen"
      style={{
        background: `url(${playground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {isEndingSceneOpen && !isGetStarOpen && !isPickCardOpen && (
        <EndingScene closeEndingScene={closeEndingScene} />
      )}
      {!isEndingSceneOpen && isGetStarOpen && !isPickCardOpen && (
        <GetStar
          starCount={sampleReward.starCount}
          closeGetStar={closeGetStar}
        />
      )}
      {!isEndingSceneOpen && !isGetStarOpen && isPickCardOpen && (
        <PickCard
          cardName={sampleReward.card.name}
          cardImg={sampleReward.card.image}
          closePickCard={closePickCard}
        />
      )}
      {!isEndingSceneOpen && !isGetStarOpen && !isPickCardOpen && (
        <Navigate to={`/`} />
      )}
    </div>
  );
};

GameEnding.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameEnding);
