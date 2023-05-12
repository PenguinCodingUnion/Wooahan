import { useCallback, useEffect, useRef } from "react";
import { useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import useRaycast from "util/hooks/useRaycast.ts";
import { Vector3 } from "three";
import { useDispatch, useSelector } from "react-redux";
import { GameStatus, PengulAnimation } from "util/Enums.ts";
import { gameStatusActions } from "store/features/gameStatus/gameStatusSlice";
import { jumpActions } from "store/features/jump/jumpSlice";

const GRAVITY = -120 * 1.5;
const ANIMATIONS = [
  "t-pose",
  "idle",
  "jumping",
  "walk",
  "surprize",
  "swim",
  "waving",
  "jump_jump",
  "victory",
];

const JUMP_FORCE = 80;

const MIN_SPEED_FOR_JUMP_ICE = 128;

const GROUND_HEIGHT = -80;
const EDGE = window.innerWidth / 2 + 5;

const usePengul = ({ pengulE, ref, animations, sounds, ...props }) => {
  const raycast = useRaycast(pengulE, 55, new Vector3(1, -1, 0));

  //캐릭터 상태관리
  const BASE_MOVEMENT_SPEED = useRef(140); //150

  const isJumping = useRef(false);
  const jumpNow = useRef(false);
  const justJump = useRef(false);
  const isGrounded = useRef(false);

  const characterPosition = useRef([-EDGE, GROUND_HEIGHT, 0]);
  const characterVelocity = useRef([0, 0, 0]);

  //애니메이션 정보
  const activeAnimation = useRef(PengulAnimation.T_POSE);

  //else
  // const { nodes, materials, animations } = useGLTF(PengulE);
  const { actions, mixer } = useAnimations(animations, ref);

  const gameStatus = useSelector((state) => state.gameStatus.status);
  const dispatch = useDispatch();

  //애니메이션 변경하기
  const setActiveAnimation = useCallback(
    (idx) => {
      if (idx < 0 || activeAnimation.current === idx) return;

      // console.log(actions, ANIMATIONS, idx);

      if (idx === PengulAnimation.WALK) {
        mixer.timeScale = 2;
      } else {
        mixer.timeScale = 1;
      }

      actions[ANIMATIONS[activeAnimation.current]]?.fadeOut(0.3);
      actions[ANIMATIONS[idx]]?.reset().fadeIn(0.3).play();

      activeAnimation.current = idx;
    },
    [actions]
  );

  //점프하기
  const doJump = useCallback(() => {
    if (isJumping.current === false && gameStatus === GameStatus.GAME_START) {
      //점프 상태 관리
      isJumping.current = true;
      jumpNow.current = 1;

      //제자리 점프인가?
      if (activeAnimation.current !== 1) {
        justJump.current = true;
      }

      //점프 애니메이션 재생
      setActiveAnimation(PengulAnimation.JUMPING);
      setTimeout(() => {
        setActiveAnimation(PengulAnimation.WALK);
      }, 1000);
    }
  }, [gameStatus, setActiveAnimation]);

  //펭귄의 시작 세팅
  useEffect(() => {
    //Add Jump
    window.addEventListener(`keydown`, (e) => {
      if (e.code === `Space`) {
        e.preventDefault();
        doJump();
      }
    });

    window.doJump = doJump;
    if (window.jump) window.jump.resumeSensor();

    setActiveAnimation(PengulAnimation.IDLE);

    return () => {
      activeAnimation.current = 0;
      window.doJump = () => {
        console.log(`not claim function`);
      };

      if (window.jump) window.jump.pauseSensor();
    };
  }, [doJump, setActiveAnimation]);

  //update
  useFrame((_, delta) => {
    // if (gameStatus !== GameStatus.GAME_START) return;

    if (characterPosition.current[1] < GROUND_HEIGHT && !isGrounded.current) {
      isGrounded.current = true;
      isJumping.current = false;

      if (justJump.current) justJump.current = false;
    }

    //속력 계산하기
    const newVelocity = velocityCalc(delta);

    //맵 오른쪽 끝 도착
    if (characterPosition.current[0] >= EDGE) {
      dispatch(gameStatusActions.goNextLevel());
    }

    //속력에 맞춰 위치 이동
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

  //속력을 계산하는 함수
  const velocityCalc = useCallback(
    (delta) => {
      const newVelocity = [...characterVelocity.current];

      if (gameStatus !== GameStatus.GAME_START) return newVelocity;

      //in Air
      if (!isGrounded.current) {
        //제자리 뛰기인가?
        if (!justJump.current) {
          newVelocity[0] = MIN_SPEED_FOR_JUMP_ICE;
        } else {
          newVelocity[0] = 0;
        }
        newVelocity[1] += GRAVITY * delta;
      } else {
        //calc xVelocity
        newVelocity[0] = BASE_MOVEMENT_SPEED.current;
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
            if (!justJump.current)
              setTimeout(() => dispatch(jumpActions.nextAction()), 1000);
          }
        } else if (raycast().length < 3) {
          //now edge
          newVelocity[0] = 0;
          setActiveAnimation(PengulAnimation.IDLE);
        } else {
          //just walk
          setActiveAnimation(PengulAnimation.WALK);
        }
      }

      characterVelocity.current = newVelocity;

      return newVelocity;
    },
    [raycast, setActiveAnimation, gameStatus, actions, sounds, dispatch]
  );
};

export default usePengul;
