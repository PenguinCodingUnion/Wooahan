import React, { forwardRef, useRef } from "react";
import PropTypes from "prop-types";
import { useGLTF } from "@react-three/drei";
import PengulE from "assets/models/PENGUL_v3.gltf";

import { useClonedModel } from "util/hooks/useClonedModel";
import usePengul from "util/hooks/usePengulJump";
import JumpSound from "components/gameJump/JumpSound";

import jumpSoundUrl from "assets/sounds/pengulJump.mp3";

export const PengulModel = forwardRef(({ bottom, props }, ref) => {
  const pengulE = useRef();
  const { nodes, materials, animations } = useClonedModel(PengulE);

  const jumpSound = useRef();

  usePengul({ pengulE, ref, animations, sounds: { jumpSound } });

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
    </group>
  );
});

PengulModel.propTypes = {
  bottom: PropTypes.number,
};

useGLTF.preload(PengulE);
