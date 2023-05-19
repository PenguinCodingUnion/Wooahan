import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Line, useGLTF } from "@react-three/drei";
import PengulE from "assets/models/peng_v4.gltf";

import { useClonedModel } from "util/hooks/useClonedModel";
import usePengul from "util/hooks/usePengulJump";
import JumpSound from "components/gameJump/JumpSound";

import jumpSoundUrl from "assets/sounds/pengulJump.mp3";
import { useSelector } from "react-redux";
// import { useFrame } from "@react-three/fiber";
// import { Vector3 } from "three";

export const PengulModel = forwardRef(({ bottom, props }, ref) => {
  const pengulE = useRef();
  const { nodes, materials, animations } = useClonedModel(PengulE);

  const speed = useSelector((state) => {
    return state.jump.speed;
  });

  const jumpSound = useRef(speed);

  usePengul({ pengulE, ref, animations, sounds: { jumpSound } });

  // const [origin, setOrigin] = useState(new Vector3(0, 0, 0));
  // let target = new Vector3(origin.x + 100, origin.y - 100, origin.z);

  // useFrame(() => {
  //   const newOrigin = origin.clone();
  //   pengulE.current.getWorldPosition(newOrigin);
  //   newOrigin.setY(newOrigin.y + 55);

  //   setOrigin(newOrigin);
  // });

  return (
    <group {...props} ref={ref} position={[0, 0, -50]} name="PengulE">
      <group name="Scene" position={[0, bottom, 0]}>
        <group
          name="Armature"
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.02}
          ref={pengulE}
        >
          <primitive object={nodes.Bip001} />
          <skinnedMesh
            name="cartoon_penguin"
            geometry={nodes.cartoon_penguin.geometry}
            material={materials["cartoon_penguin.001"]}
            skeleton={nodes.cartoon_penguin.skeleton}
            morphTargetDictionary={nodes.cartoon_penguin.morphTargetDictionary}
            morphTargetInfluences={nodes.cartoon_penguin.morphTargetInfluences}
          />
        </group>
        <JumpSound ref={jumpSound} url={jumpSoundUrl} />
      </group>
      {/* <Line
        points={[origin, target]}
        lineWidth={10}
        segments
        worldUnits
        color={"red"}
      ></Line> */}
    </group>
  );
});

PengulModel.propTypes = {
  bottom: PropTypes.number,
};

useGLTF.preload(PengulE);
