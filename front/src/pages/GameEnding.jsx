// import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";

import EndingScene from "components/gameEnding/EndingScene";
import GetStar from "components/gameEnding/GetStar";
import PickCard from "components/gameEnding/PickCard";
import { Navigate, useLocation } from "react-router-dom";
import instance from "util/Axios";

export const GameEnding = (props) => {
  const [reward, setReward] = useState([]);
  const [isEndingSceneOpen, setIsEndingSceneOpen] = useState(true);
  const [isGetStarOpen, setIsGetStarOpen] = useState(false);
  const [isPickCardOpen, setIsPickCardOpen] = useState(false);
  const [background, setBackground] = useState();
  const { state } = useLocation();

  // 테스트 편하게하기위해 이메일 박아놓음
  const email = "lsms3723@gmail.com";
  // const email = useSelector((state) => state.loginInfo.email);

  useEffect(() => {
    // eslint-disable-next-line default-case
    switch (state.game) {
      case "jump":
        setBackground(require("assets/images/background_playground.jpg"));
        break;

      case "sleigh":
        setBackground(require("assets/images/background_forestend.jpg"));
        break;

      case "bubble":
        setBackground(require("assets/images/background_beach.jpg"));
        break;

      case "train":
        setBackground(require("assets/images/background_desertend.jpg"));
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
