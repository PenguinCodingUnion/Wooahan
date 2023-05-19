import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import PENGUL from "assets/models/PENGUL_v3.gltf";
import FOX from "assets/models/FOX_V1.gltf";
import { useFrame } from "@react-three/fiber";
import { useClonedModel } from "util/hooks/useClonedModel";

export const Model = (props) => {
  const model = props.modelRef;

  const { materials, animations, nodes } = useClonedModel(FOX);

  const _animations = useAnimations(animations, model);

  useEffect(() => {
    props.setModelAnimations(_animations);
  }, []);

  const ratio = window.innerWidth / window.innerHeight;

  const modelScale = () => {
    if (ratio < 0.6) {
      return ratio * 2.5;
    }
    return 1 + (ratio / 0.6) * 0.5;
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

    if (+model.current.isMove === -1) {
      model.current.position.x -= 0.025 * ratio;
    }
    if (+model.current.isMove === 1) {
      model.current.position.x += 0.025 * ratio;
    }
  });

  return (
    <group ref={model} {...props}>
      <group
        name="Scene"
        rotation={[0, 0, 0]}
        position={[0, -1.8, 0]}
        scale={modelScale()}
      >
        <group name="Bip001">
          <primitive object={nodes.Bip001_Pelvis} />
          <primitive object={nodes.neutral_bone} />
          <skinnedMesh
            name="cartoon_fox"
            geometry={nodes.cartoon_fox.geometry}
            material={materials["fox.001"]}
            skeleton={nodes.cartoon_fox.skeleton}
            morphTargetDictionary={nodes.cartoon_fox.morphTargetDictionary}
            morphTargetInfluences={nodes.cartoon_fox.morphTargetInfluences}
          />
        </group>
      </group>
    </group>
  );
};

export default Model;
