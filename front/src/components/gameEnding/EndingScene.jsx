// import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import clap from "assets/sounds/clap.wav";
import effectSound from "util/effectSound";

export const EndingScene = (props) => {
  const es_clap = effectSound(clap, 1);

  useEffect(() => {
    es_clap.play();
    setTimeout(() => {
      props.closeEndingScene();
      es_clap.pause();
    }, 2000);
  }, [props]);
  return (
    <>
      <div className="text-[#6937A1] font-MaplestoryBold text-6xl text-stroke-mainWhite text-stroke-2">
        야호!
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
