import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { useGLTF, useAnimations } from "@react-three/drei";
import PengulE from "assets/models/PENGUL_v2.gltf";
import { useFrame } from "@react-three/fiber";
import useRaycast from "util/hooks/useRaycast.ts";
import { Vector3 } from "three";

const GRAVITY = -60 * 2;
const ANIMATIONS = ["t-pose", "idle", "jumping", "walk"];

const JUMP_FORCE = 80;
const GROUND_HEIGHT = -80;
const BASE_MOVEMENT_SPEED = 50;

const EDGE = 360;

export const PengulModel = forwardRef(({ bottom, props }, ref) => {
  const pengulE = useRef();
  const raycast = useRaycast(pengulE, 55, new Vector3(1, -1, 0));

  //캐릭터 상태관리
  const isJumping = useRef(false);
  const jumpNow = useRef(false);
  const isGrounded = useRef(false);

  const [characterPosition, setCharacterPosition] = useState([
    -EDGE,
    GROUND_HEIGHT,
    0,
  ]);
  const [characterVelocity, setCharacterVelocity] = useState([0, 0, 0]);

  //애니메이션 정보
  const [activeAnimation, setActiveAnimation] = useState(3);

  //else
  const { nodes, materials, animations } = useGLTF(PengulE);
  const { actions, names } = useAnimations(animations, ref);

  useEffect(() => {
    //Add Jump
    window.addEventListener(`keydown`, (e) => {
      if (isJumping.current === false && e.code === `Space`) {
        e.preventDefault();
        isJumping.current = true;
        jumpNow.current = true;
        setActiveAnimation(2);
        setTimeout(() => {
          setActiveAnimation(3);
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

  //update
  useFrame((_, delta) => {
    if (characterPosition[1] < GROUND_HEIGHT) {
      isGrounded.current = true;
      isJumping.current = false;
    }

    const newVelocity = velocityCalc(delta);

    // console.log(newVelocity, characterPosition);

    setCharacterPosition(() => {
      return [
        characterPosition[0] < EDGE
          ? characterPosition[0] + newVelocity[0] * delta
          : -EDGE,
        isGrounded.current
          ? GROUND_HEIGHT
          : characterPosition[1] + newVelocity[1] * delta,
        characterPosition[2] + newVelocity[2] * delta,
      ];
    });
  });

  const velocityCalc = useCallback(
    (delta) => {
      const newVelocity = [...characterVelocity];

      //in Air
      if (!isGrounded.current) {
        newVelocity[0] = BASE_MOVEMENT_SPEED * 2.8;
        newVelocity[1] += GRAVITY * delta;
      } else {
        //calc xVelocity
        newVelocity[0] = BASE_MOVEMENT_SPEED;
        newVelocity[1] = 0;

        if (jumpNow.current) {
          jumpNow.current = false;
          isGrounded.current = false;

          newVelocity[1] += JUMP_FORCE;
        } else if (raycast().length < 3) {
          newVelocity[0] = 0;
          setActiveAnimation(1);
        }
      }

      setCharacterVelocity(newVelocity);

      return newVelocity;
    },
    [characterVelocity, raycast]
  );

  return (
    <group {...props} ref={ref} position={[0, 0, -50]} name="PengulE">
      <group name="Scene" position={[0, bottom, 0]}>
        <group
          name="Armature"
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.02}
          position={characterPosition}
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
      </group>
    </group>
  );
});

PengulModel.propTypes = {
  bottom: PropTypes.number,
};

useGLTF.preload(PengulE);
