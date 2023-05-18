// import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";

import EndingScene from "components/gameEnding/EndingScene";
import GetStar from "components/gameEnding/GetStar";
import PickCard from "components/gameEnding/PickCard";
import { Navigate, useLocation } from "react-router-dom";
import instance from "util/Axios";

import playground from "assets/images/background_playground.webp";
import forestend from "assets/images/background_forestend.webp";
import beach from "assets/images/background_beach.webp";
import desertend from "assets/images/background_desertend.webp";

export const GameEnding = (props) => {
  const [reward, setReward] = useState([]);
  const [isEndingSceneOpen, setIsEndingSceneOpen] = useState(true);
  const [isGetStarOpen, setIsGetStarOpen] = useState(false);
  const [isPickCardOpen, setIsPickCardOpen] = useState(false);
  const [background, setBackground] = useState();
  const { state } = useLocation();

  const email = useSelector((state) => state.loginInfo.email);
  const dummy = { starCount: 3, card: null };

  useEffect(() => {
    // eslint-disable-next-line default-case
    switch (state.game) {
      case "jump":
        setBackground(playground);
        break;

      case "sleigh":
        setBackground(forestend);
        break;

      case "bubble":
        setBackground(beach);
        break;

      case "train":
        setBackground(desertend);
        break;
    }
    const getStarData = async () => {
      await instance
        .get(`/reward/over/${email}`)
        .then((response) => {
          setReward(response);
        })
        .catch((error) => {
          console.log(error);
          setReward(dummy);
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
      className="grid items-center w-screen h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {isEndingSceneOpen && !isGetStarOpen && !isPickCardOpen && (
        <div>
          <EndingScene
            closeEndingScene={closeEndingScene}
            model={state.character}
            mention={state.mention}
          />
        </div>
      )}
      {!isEndingSceneOpen && isGetStarOpen && !isPickCardOpen && (
        <div>
          <GetStar
            starCount={reward.starCount}
            closeGetStar={closeGetStar}
            model={state.character}
          />
        </div>
      )}
      {reward.card &&
        !isEndingSceneOpen &&
        !isGetStarOpen &&
        isPickCardOpen && (
          <PickCard
            cardName={reward.card.name}
            cardImg={reward.card.imgUrl}
            closePickCard={closePickCard}
          />
        )}
      {!isEndingSceneOpen && !isGetStarOpen && !isPickCardOpen && (
        <Navigate to={`/main`} />
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
