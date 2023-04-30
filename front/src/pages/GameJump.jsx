import { Canvas } from "@react-three/fiber";
import PropTypes from "prop-types";
import React, { Suspense, useCallback, useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { PengulModel } from "components/gameJump/Pengul";
import { OrbitControls } from "@react-three/drei";
import FallowCamera, { FlatCamera } from "components/gameJump/FollowCamera";
import { IceModel } from "components/gameJump/IcePannel";
import BackgroundImage from "components/gameJump/BackgroundImage";

import bgImage from "assets/images/background/background_iceberg.png";
import WaterFloor from "components/gameJump/WaterFloor";
import Overlay from "components/gameJump/Overlay";
import { gameStatusActions } from "store/features/gameStatus/gameStatusSlice";

const BOTTOM_POSITION = -70;

export const GameJump = (props) => {
  const character = useRef();
  const dispatch = useDispatch();
  const gameStatus = useSelector((state) => state.gameStatus.status);

  console.log(gameStatus);
  useEffect(() => {
    console.log("Loading....");

    //실제로는 비동기 통신이 이루어지면서 게임 데이터를 로딩한다
    dispatch(gameStatusActions.loaded());
  }, [dispatch]);

  const startGame = useCallback(() => {
    dispatch(gameStatusActions.start());
  }, [dispatch]);

  return (
    <div className="mx-auto h-screen w-screen flex relative">
      <Canvas>
        <Suspense fallback={null}>
          <>
            {/* <OrbitControls /> */}
            <ambientLight args={["white", 1.5]} castShadow />
            <BackgroundImage imagePath={bgImage} />
            <FallowCamera target={character} />
            {/* <FlatCamera /> */}
            <WaterFloor bottom={BOTTOM_POSITION} />
          </>

          <PengulModel ref={character} bottom={BOTTOM_POSITION} />

          <>
            <IceModel icePosition={-400} bottom={BOTTOM_POSITION} />
            <IceModel icePosition={-300} bottom={BOTTOM_POSITION} />
            <IceModel icePosition={300} bottom={BOTTOM_POSITION} />
            <IceModel icePosition={400} bottom={BOTTOM_POSITION} />
          </>

          <>
            <IceModel icePosition={0} bottom={BOTTOM_POSITION} />
          </>
        </Suspense>
      </Canvas>
      <Overlay startGame={startGame} />
    </div>
  );
};

GameJump.propTypes = {
  // gameStatus: PropTypes.number.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameJump);
