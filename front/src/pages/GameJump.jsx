import { Canvas } from "@react-three/fiber";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import { connect } from "react-redux";
import { PengulModel } from "components/gameJump/Pengul";
import { Environment, OrbitControls } from "@react-three/drei";
import FallowCamera from "components/gameJump/FollowCamera";
import { IceModel } from "components/gameJump/IcePannel";
import BackgroundImage from "components/gameJump/BackgroundImage";

import bgImage from "assets/images/background/background_iceberg.png";
import WaterFloor from "components/gameJump/WaterFloor";

const BOTTOM_POSITION = -70;

export const GameJump = (props) => {
  const character = useRef();

  return (
    <div className="mx-auto h-screen w-screen">
      <Canvas>
        {/* <OrbitControls /> */}
        <ambientLight args={["white", 0.5]} castShadow />
        <FallowCamera target={character} />
        <PengulModel ref={character} bottom={BOTTOM_POSITION} />
        <IceModel icePosition={-300} bottom={BOTTOM_POSITION} />
        <IceModel icePosition={-100} bottom={BOTTOM_POSITION} />
        <IceModel icePosition={100} bottom={BOTTOM_POSITION} />
        <IceModel icePosition={300} bottom={BOTTOM_POSITION} />
        <WaterFloor bottom={BOTTOM_POSITION} />
        <BackgroundImage imagePath={bgImage} />
        <Environment background preset="sunset" />
      </Canvas>
    </div>
  );
};

GameJump.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameJump);
