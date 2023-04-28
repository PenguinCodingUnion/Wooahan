import { Canvas } from "@react-three/fiber";
import PropTypes from "prop-types";
import React, { Suspense, useRef } from "react";
import { connect } from "react-redux";
import { PengulModel } from "components/gameJump/Pengul";
import { Loader, OrbitControls } from "@react-three/drei";
import FallowCamera, { FlatCamera } from "components/gameJump/FollowCamera";
import { IceModel } from "components/gameJump/IcePannel";
import BackgroundImage from "components/gameJump/BackgroundImage";

import bgImage from "assets/images/background/background_iceberg.png";
import WaterFloor from "components/gameJump/WaterFloor";
import Overlay from "components/gameJump/Overlay";

const BOTTOM_POSITION = -70;

export const GameJump = ({ gameStatus, ...props }) => {
  const character = useRef();

  console.log(gameStatus);

  return (
    <div className="mx-auto h-screen w-screen flex">
      <Canvas>
        <Suspense fallback={null}>
          <>
            <OrbitControls />
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
      <Overlay />
    </div>
  );
};

GameJump.propTypes = {
  gameStatus: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({ gameStatus: state.gameStatus.status });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameJump);
