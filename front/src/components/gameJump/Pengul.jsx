import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import PengulE from "assets/models/PENGUL_v2.gltf";
import { useFrame } from "@react-three/fiber";

const ANIMATIONS = ["t-pose", "idle", "jumping", "walk"];

export const PengulModel = forwardRef((props, ref) => {
  const isJumping = useRef(false);
  const { nodes, materials, animations } = useGLTF(PengulE);
  const { actions, names } = useAnimations(animations, ref);

  const [activeAnimation, setActiveAnimation] = useState(3);
  const [characterPosition, setCharacterPosition] = useState([0, -25, -50]);

  useEffect(() => {
    window.addEventListener(`keydown`, (e) => {
      e.preventDefault();
      if (isJumping.current === false && e.code === `Space`) {
        isJumping.current = true;
        setActiveAnimation(2);
        setTimeout(() => {
          setActiveAnimation(3);
          isJumping.current = false;
        }, 1600);
      }
    });
  }, []);

  useEffect(() => {
    names.forEach((aniamtion) => {
      actions[aniamtion].stop();
    });

    actions[ANIMATIONS[activeAnimation]].play();
  }, [actions, names, activeAnimation]);

  useFrame((_, delta) => {
    setCharacterPosition((prev) => {
      return [prev[0] + delta * 10, prev[1], prev[2]];
    });
  });

  return (
    <group ref={ref} {...props} dispose={null} position={characterPosition}>
      <group name="Scene">
        <group
          name="Armature"
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.01}
          position={[0, -80, 0]}
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
      </group>
    </group>
  );
});

useGLTF.preload(PengulE);
