import React from "react";
import { connect } from "react-redux";
import TrainStart from "components/gameTrain/TrainStart";

import bgm from "assets/sounds/trainbgm.mp3";
import useSound from "util/hooks/useSound";

export const GameTrain = (props) => {
  
  useSound(bgm, 1, 2000);

  return (
    <div className="fixed bg-[url('assets/images/tmp/background-desert.jpg')] bg-cover bg-no-repeat h-screen w-screen">
      <TrainStart />
    </div>
  );
};

GameTrain.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameTrain);
