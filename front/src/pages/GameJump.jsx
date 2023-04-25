import { Canvas } from "@react-three/fiber";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import { connect } from "react-redux";
import { PengulModel } from "components/gameJump/Pengul";
import { Environment } from "@react-three/drei";
import FallowCamera from "components/gameJump/FollowCamera";

export const GameJump = (props) => {
  const character = useRef();

  return (
    <div className="mx-auto">
      <Canvas>
        <FallowCamera target={character} />
        <PengulModel ref={character} />
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
