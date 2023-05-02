import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useGLTF, useAnimations, useSelect } from "@react-three/drei";
import PengulE from "assets/models/PENGUL_v2.gltf";
import { useFrame } from "@react-three/fiber";
import useRaycast from "util/hooks/useRaycast.ts";
import { Vector3 } from "three";
import { useClonedModel } from "util/hooks/useClonedModel";
import { useDispatch, useSelector } from "react-redux";
import { GameStatus } from "util/Enums.ts";
import { gameStatusActions } from "store/features/gameStatus/gameStatusSlice";

const GRAVITY = -120 * 1.5;
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

  const characterPosition = useRef([-EDGE, GROUND_HEIGHT, 0]);
  const characterVelocity = useRef([0, 0, 0]);

  //애니메이션 정보
  const activeAnimation = useRef(0);

  //else
  // const { nodes, materials, animations } = useGLTF(PengulE);
  const { nodes, materials, animations } = useClonedModel(PengulE);
  const { actions, names } = useAnimations(animations, ref);

  const gameStatus = useSelector((state) => state.gameStatus.status);
  const dispatch = useDispatch();

  const doJump = useCallback(() => {
    if (
      isJumping.current === false &&
      gameStatus === GameStatus.GAME_START &&
      activeAnimation.current === 1
    ) {
      isJumping.current = true;
      jumpNow.current = 1;
      setActiveAnimation(2);
      setTimeout(() => {
        setActiveAnimation(3);
      }, 1000);
    }
  }, [gameStatus]);

  useEffect(() => {
    //Add Jump
    window.addEventListener(`keydown`, (e) => {
      if (e.code === `Space`) {
        e.preventDefault();
        doJump();
      }
    });

    window.doJump = doJump;

    setActiveAnimation(1);

    return () => {
      activeAnimation.current = 0;
      window.doJump = () => {
        console.log(`not claim function`);
      };
    };
  }, [doJump]);

  const setActiveAnimation = useCallback(
    (idx) => {
      if (activeAnimation.current === idx) return;

      actions[ANIMATIONS[activeAnimation.current]].fadeOut(0.3);
      actions[ANIMATIONS[idx]].reset().fadeIn(0.3).play();

      activeAnimation.current = idx;
    },
    [actions]
  );

  //update
  useFrame((_, delta) => {
    // if (gameStatus !== GameStatus.GAME_START) return;

    if (characterPosition.current[1] < GROUND_HEIGHT && !isGrounded.current) {
      isGrounded.current = true;
      isJumping.current = false;
    }

    const newVelocity = velocityCalc(delta);

    // console.log(newVelocity, characterPosition);

    // console.log(pengulE.current);

    if (characterPosition.current[0] >= EDGE) {
      dispatch(gameStatusActions.goNextLevel());
    }

    const newPosition = [
      characterPosition.current[0] < EDGE
        ? characterPosition.current[0] + newVelocity[0] * delta
        : -EDGE,
      isGrounded.current
        ? GROUND_HEIGHT
        : characterPosition.current[1] + newVelocity[1] * delta,
      characterPosition.current[2] + newVelocity[2] * delta,
    ];

    pengulE.current.position.set(
      newPosition[0],
      newPosition[1],
      newPosition[2]
    );
    characterPosition.current = newPosition;
  });

  const velocityCalc = useCallback(
    (delta) => {
      const newVelocity = [...characterVelocity.current];

      if (gameStatus !== GameStatus.GAME_START) return newVelocity;

      //in Air
      if (!isGrounded.current) {
        newVelocity[0] = BASE_MOVEMENT_SPEED * 3;
        newVelocity[1] += GRAVITY * delta;
      } else {
        //calc xVelocity
        newVelocity[0] = BASE_MOVEMENT_SPEED;
        newVelocity[1] = 0;

        if (jumpNow.current) {
          //jump
          if (jumpNow.current === 1) {
            //jump ready pose

            //stop
            newVelocity[0] = 0;

            //ready for jump action  => go jump
            if (actions[ANIMATIONS[activeAnimation.current]].time > 0.3)
              jumpNow.current = 2;
          } else if (jumpNow.current === 2) {
            //do jump
            newVelocity[1] += JUMP_FORCE;

            jumpNow.current = false;
            isGrounded.current = false;
          }
        } else if (raycast().length < 3) {
          //now edge
          newVelocity[0] = 0;
          setActiveAnimation(1);
        } else {
          //just walk
          setActiveAnimation(3);
        }
      }

      characterVelocity.current = newVelocity;

      return newVelocity;
    },
    [raycast, setActiveAnimation, gameStatus]
  );

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
      </group>
    </group>
  );
});

PengulModel.propTypes = {
  bottom: PropTypes.number,
};

useGLTF.preload(PengulE);
