import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import TrainStart from "components/gameTrain/TrainStart";

import bgm from "assets/sounds/trainbgm.mp3";
import useSound from "util/hooks/useSound";
import { Navigate } from "react-router-dom";
import CommonOverlay from "components/common/CommonOverlay";
import { commonActions } from "store/features/common/commonSlice";
import WarningComponent from "components/common/WarningComponent";

export const GameTrain = (props) => {
  const warning = useSelector((state) => state.common.warning);
  const dispatch = useDispatch();

  useSound(bgm, 0.4, 2000);
  const warn = () => {
    dispatch(commonActions.setWarning());
  };
  return (
    <div className="fixed bg-[url('assets/images/train/background-desert.jpg')] bg-cover bg-no-repeat h-screen w-screen">
      <div>
        <div
          onClick={() => {
            warn();
          }}
          className="absolute h-10 w-10 right-[3%] top-[3%] rounded-lg bg-white bg-opacity-40 font-MaplestoryLight text-4xl"
        >
          <p>X</p>
        </div>
      </div>
      {warning && <WarningComponent />}
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
