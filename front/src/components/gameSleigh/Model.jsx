import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import PENGUL from "assets/models/PENGUL_v2.gltf";
import { useFrame } from "@react-three/fiber";
import { useClonedModel } from "util/hooks/useClonedModel";

export const Model = (props) => {
  const model = props.modelRef;

  const isMove = props.isMove;

  const { scene, materials, animations, nodes } = useClonedModel(PENGUL);

  const _animations = useAnimations(animations, model);

  useEffect(() => {
    props.setModelAnimations(_animations);
  }, []);

  const ratio = window.innerWidth / window.innerHeight;

  const modelScale = () => {
    if (ratio < 0.6) {
      return ratio * 0.025;
    }
    return 0.01 + (ratio / 0.6) * 0.005;
  };

  useFrame(() => {
    const currPosition = model.current.position;
    if (props.quizStatus === "stop") {
      if (currPosition.x < -props.quizScale) {
        props.setQuizStatus("check");
        props.setQuizResult("left");
      }
      if (currPosition.x > props.quizScale) {
        props.setQuizStatus("check");
        props.setQuizResult("right");
      }
    }

    // console.log(props.isMove);

    if (+model.current.isMove === -1) {
      model.current.position.x -= 0.02 * ratio;
    }
    if (+model.current.isMove === 1) {
      model.current.position.x += 0.02 * ratio;
    }
  });

  return (
    <group ref={model} {...props}>
      <group name="Scene">
        <group
          name="Armature"
          rotation={[0.2, 0, 0]}
          position={[0, -2, 0]}
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
  );
};
useGLTF.preload(PENGUL);

export default Model;
