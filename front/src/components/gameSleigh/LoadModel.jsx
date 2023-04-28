import { Gltf, useAnimations, useFBO, useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import PENGUL from "assets/models/PENGUL_v2.gltf";
import PENGUL_old from "assets/models/PENGUL.gltf";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useClonedModel } from "util/hooks";

export const LoadModel = (props) => {
  const group = useRef();
  // const { scene, materials, animations, nodes } = useClonedModel(PENGUL);
  const { scene, materials, animations, nodes } = useClonedModel(PENGUL_old);

  // const { scene, materials, animations, nodes } = useGLTF(PENGUL); 2가지 방법이 있다....

  const { actions, mixer, names } = useAnimations(animations, group);

  console.log(mixer);

  useEffect(() => {
    actions[names[props.animationIndex]].reset().fadeIn(0.2).play();

    mixer.timeScale = props.timeScale;

    return () => {
      // actions[names[props.animationIndex]].fadeOut(0.5);
    };
  }, [props.animationIndex, props.timeScale]);

  const modelScale = () => {
    const ratio = window.innerWidth / window.innerHeight;

    if (ratio < 0.6) {
      return ratio * 0.025;
    }
    return 0.01 + (ratio / 0.6) * 0.005;
  };

  return (
    <group ref={group} {...props}>
      <group name="Scene">
        <group
          name="Armature"
          rotation={[0.2, Math.PI, 0]}
          scale={modelScale()}
        >
          <primitive object={scene} />
          <skinnedMesh
            name="cartoon_penguin"
            geometry={nodes.cartoon_penguin.geometry}
            material={materials["cartoon_penguin.001"]}
            skeleton={nodes.cartoon_penguin.skeleton}
            morphTargetDictionary={nodes.cartoon_penguin.morphTargetDictionary}
            morphTargetInfluences={nodes.cartoon_penguin.morphTargetInfluences}
          />
        </group>
      </group>
    </group>
    // <Gltf src={PENGUL} ref={group} {...props} />
  );
};
useGLTF.preload(PENGUL);

LoadModel.propTypes = {
  //   second: PropTypes.third
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoadModel);
