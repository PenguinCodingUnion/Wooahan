import { useCallback, useEffect, useRef } from "react";
import { useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import useRaycast from "util/hooks/useRaycast.ts";
import { Vector3 } from "three";
import { useDispatch, useSelector } from "react-redux";
import { GameStatus } from "util/Enums.ts";
import { gameStatusActions } from "store/features/gameStatus/gameStatusSlice";

const GRAVITY = -120 * 1.5;
const ANIMATIONS = ["t-pose", "idle", "jumping", "walk"];

const JUMP_FORCE = 80;
const BASE_MOVEMENT_SPEED = 50;
const MIN_SPEED_FOR_JUMP_ICE = 150;

const GROUND_HEIGHT = -80;
const EDGE = 360;

const usePengul = ({ pengulE, ref, animations, sounds, ...props }) => {
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
  const { actions } = useAnimations(animations, ref);

  const gameStatus = useSelector((state) => state.gameStatus.status);
  const dispatch = useDispatch();

  const setActiveAnimation = useCallback(
    (idx) => {
      if (activeAnimation.current === idx) return;

      actions[ANIMATIONS[activeAnimation.current]].fadeOut(0.3);
      actions[ANIMATIONS[idx]].reset().fadeIn(0.3).play();

      activeAnimation.current = idx;
    },
    [actions]
  );

  const doJump = useCallback(() => {
    if (
      isJumping.current === false &&
      gameStatus === GameStatus.GAME_START &&
      activeAnimation.current === 1
    ) {
      //점프 상태 관리
      isJumping.current = true;
      jumpNow.current = 1;

      //점프 애니메이션 재생
      setActiveAnimation(2);
      setTimeout(() => {
        setActiveAnimation(3);
      }, 1000);
    }
  }, [gameStatus, setActiveAnimation]);

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
  }, [doJump, setActiveAnimation]);

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
        newVelocity[0] = MIN_SPEED_FOR_JUMP_ICE;
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

            //점프 소리 내기
            sounds.jumpSound.current.play();

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
    [raycast, setActiveAnimation, gameStatus, actions, sounds]
  );
};

export default usePengul;
