import React, { useState } from "react";
import { connect } from "react-redux";
import TrainStart from "components/gameTrain/TrainStart";

import bgm from "assets/sounds/trainbgm.mp3";
import useSound from "util/hooks/useSound";
import { Navigate } from "react-router-dom";
import CommonOverlay from "components/common/CommonOverlay";

export const GameTrain = (props) => {
  useSound(bgm, 1, 2000);
  const [exit, setExit] = useState(false);
  const [warning, setWarning] = useState(<></>);
  const close = () => {
    setExit(true);
  };
  const back = () => {
    setWarning(<></>);
  };
  const warn = () => {
    setWarning(
      <CommonOverlay>
        <div className="absolute top-1/2 left-1/2 bg-white -mt-[5.5rem] -ml-[9rem] h-44 w-72  rounded-lg">
          <div className="font-MaplestoryBold">
            <p className="mt-8 text-4xl text-center">홈으로 나갈까요?</p>
            <div className="mt-5 flex col-span-2">
              <div
                onClick={() => {
                  close();
                }}
                className="bg-lightGray rounded-xl w-16 text-3xl h-12 leading-[3rem] mx-auto "
              >
                <p className="text-center">네</p>
              </div>
              <div
                onClick={() => {
                  back();
                }}
                className="bg-mainYellow-300 rounded-xl w-28 text-3xl h-12 leading-[3rem] mx-auto"
              >
                <p className="text-center">아니요</p>
              </div>
            </div>
          </div>
        </div>
      </CommonOverlay>
    );
  };
  return (
    <div className="fixed bg-[url('assets/images/tmp/background-desert.jpg')] bg-cover bg-no-repeat h-screen w-screen">
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
      {warning}
      {exit && <Navigate to={`/main`} />}
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
