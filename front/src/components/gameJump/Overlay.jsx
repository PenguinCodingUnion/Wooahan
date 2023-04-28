import React from "react";
import PropTypes from "prop-types";
import { useSelect } from "@react-three/drei";
import { GameStatus } from "util/Enums.ts";

const Overlay = (props) => {
  const gameStatus = useSelect((state) => state.gameStatus.status);

  const OVERLAY_CLASS = `absolute h-full w-full mix-blend-multiply bg-slate-300`;

  return (
    gameStatus === GameStatus.GAME_READY && (
      <>
        <div className={OVERLAY_CLASS}></div>
        <div className={`absolute flex flex-col justify-between h-full w-full`}>
          <div
            className={`border-4 border-indigo-600 rounded-2xl w-2/4 p-4 m-8 mx-auto bg-white z-50`}
          >
            <h2 className={`text-center font-bold`}>
              띄어쓰기에 맞게 점프하세요.
            </h2>
          </div>
          <div className={`w-2/4 p-4 m-8 mx-auto`}>
            <h1 className={`text-6xl text-center font-bold text-indigo-600`}>
              시 작 !
            </h1>
          </div>
        </div>
      </>
    )
  );
};

Overlay.propTypes = {};

export default Overlay;
