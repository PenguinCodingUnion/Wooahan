// import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import clap from "assets/sounds/clap.wav";
import effectSound from "util/effectSound";

export const EndingScene = (props) => {
  const es_clap = effectSound(clap, 0.4);
  const [model, setModel] = useState();
  const [ment, setMent] = useState();
  useEffect(() => {
    // eslint-disable-next-line default-case
    switch (props.model) {
      case "penguin":
        setModel(require("assets/images/animal/penguin.png"));
        break;

      case "fox":
        setModel(require("assets/images/animal/fox.png"));
        break;
    }
    setMent(props.mention);
    es_clap.play();
    setTimeout(() => {
      props.closeEndingScene();
      es_clap.pause();
    }, 2000);
  }, [props]);
  return (
    <>
      <img
        className="absolute bottom-0 right-0 w-1/2"
        style={{ transform: "scaleX(-1)" }}
        src={model}
        alt=""
      />
      <div className="text-[#6937A1] font-MaplestoryBold text-6xl text-stroke-mainWhite text-stroke-2 absolute w-full text-center top-1/3">
        {ment}
      </div>
    </>
  );
};

EndingScene.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EndingScene);
