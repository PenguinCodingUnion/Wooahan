// import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import playground from "assets/images/background_playground.jpg";
import EndingScene from "components/gameEnding/EndingScene";
import GetStar from "components/gameEnding/GetStar";
import PickCard from "components/gameEnding/PickCard";
import { Navigate } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";
import clap from "assets/sounds/clap.wav";
import star from "assets/sounds/star.wav";
import instance from "util/Axios";

export const GameEnding = (props) => {
  const [reward, setReward] = useState([]);
  const [isEndingSceneOpen, setIsEndingSceneOpen] = useState(true);
  const [isGetStarOpen, setIsGetStarOpen] = useState(false);
  const [isPickCardOpen, setIsPickCardOpen] = useState(false);

  const email = "lsms3723@gmail.com";

  useEffect(() => {
    const getStarData = async () => {
      await instance
        .get(`/reward/over/${email}`)
        .then((response) => {
          setReward(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getStarData();
  }, []);

  const closeEndingScene = () => {
    setIsEndingSceneOpen(false);
    setIsGetStarOpen(true);
  };

  const closeGetStar = () => {
    setIsGetStarOpen(false);
    if (reward.starCount === 0) {
      setIsPickCardOpen(true);
    }
  };

  const closePickCard = () => {
    setIsPickCardOpen(false);
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
      {isEndingSceneOpen && !isGetStarOpen && !isPickCardOpen && (
        <div>
          <EndingScene closeEndingScene={closeEndingScene} />
          <ReactAudioPlayer src={clap} autoPlay volume={1} />
        </div>
      )}
      {!isEndingSceneOpen && isGetStarOpen && !isPickCardOpen && (
        <div>
          <GetStar
            starCount={reward.starCount}
            closeGetStar={closeGetStar}
          />
          <ReactAudioPlayer src={star} autoPlay />
        </div>
      )}
      {reward.card && !isEndingSceneOpen && !isGetStarOpen && isPickCardOpen && (
        <PickCard
          cardName={reward.card.name}
          cardImg={reward.card.imgUrl}
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
