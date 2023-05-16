import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import TrainStart from "components/gameTrain/TrainStart";

import bgm from "assets/sounds/trainbgm.mp3";
import useSound from "util/hooks/useSound";
import { Navigate, useNavigate } from "react-router-dom";
import CommonOverlay from "components/common/CommonOverlay";
import { commonActions } from "store/features/common/commonSlice";

export const WarningComponent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  return (
    <CommonOverlay>
      <div className="absolute top-1/2 left-1/2 bg-white -mt-[5.5rem] -ml-[9rem] h-44 w-72  rounded-lg z-[1000]">
        <div className="font-MaplestoryBold">
          <p className="mt-8 text-4xl text-center">홈으로 나갈까요?</p>
          <div className="mt-5 flex col-span-2">
            <div
              onClick={() => {
                dispatch(commonActions.setWarning());
                navigation("/main");
              }}
              className="bg-lightGray rounded-xl w-16 text-3xl h-12 leading-[3rem] mx-auto "
            >
              <p className="text-center">네</p>
            </div>
            <div
              onClick={() => {
                dispatch(commonActions.setWarning());
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

export default WarningComponent;
