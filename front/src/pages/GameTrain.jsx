import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import TrainStart from "components/gameTrain/TrainStart";
import ReactAudioPlayer from "react-audio-player";

import bgm from "assets/sounds/trainbgm.mp3";

export const GameTrain = (props) => {
  return (
    <div className="fixed bg-[url('assets/images/tmp/background-desert.jpg')] bg-cover bg-no-repeat h-screen w-screen">
      <TrainStart />
      <ReactAudioPlayer src={bgm} autoPlay={true} volume={1} />
    </div>
  );
};

GameTrain.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameTrain);
