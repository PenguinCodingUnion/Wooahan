import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import clap from "assets/sounds/clap.wav";
import effectSound from "util/effectSound";
import penguin from "assets/images/animal/penguin.png";
import fox from "assets/images/animal/fox.png";

export const EndingScene = ({ model, mention, closeEndingScene, ...props }) => {
  const es_clap = effectSound(clap, 0.4);
  useEffect(() => {
    es_clap.play();
    setTimeout(() => {
      closeEndingScene();
      es_clap.stop();
      es_clap.unload();
    }, 2000);
  }, []);
  return (
    <>
      <img
        className="absolute bottom-0 right-0 w-1/2"
        style={{ transform: "scaleX(-1)" }}
        src={model === "fox" ? fox : penguin}
        alt=""
      />
      <div className="text-[#6937A1] font-MaplestoryBold text-6xl text-stroke-mainWhite text-stroke-2 absolute w-full text-center top-1/3">
        {mention}
      </div>
    </>
  );
};

EndingScene.propTypes = {
  model: PropTypes.string.isRequired,
  mention: PropTypes.string.isRequired,
  closeEndingScene: PropTypes.func.isRequired,
};

export default EndingScene;
