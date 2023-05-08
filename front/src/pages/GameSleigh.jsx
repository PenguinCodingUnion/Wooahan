import {
  Environment,
  Html,
  Image,
  Loader,
  OrbitControls,
  PerspectiveCamera,
  useProgress,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import Model from "components/gameSleigh/Model";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as THREE from "three";
import forestMap from "assets/images/background_forest.png";
import QuizCard from "components/gameSleigh/QuizCard";
import bfyImg from "assets/images/bfy.png";
import dogIMg from "assets/images/dog.png";
import { SleighLoading, LoadingProgress } from "components/gameSleigh/Loading";
import QuizResult from "components/gameSleigh/QuizResult";
import { useNavigate } from "react-router-dom";
import { sleighActions } from "store/features/sliegh/sleighSlice";
import Intro from "components/gameSleigh/Intro";
import QuizWord from "components/gameSleigh/QuizWord";

//메인에서 클릭 시  -> 게임 단계 화면 -> 단계선택 -> 로딩화면 -> 게임시작 버튼 -> 클릭 시 게임시작 -> 캐릭터 걷기 -> 문제정보가 위에서 떨어짐
// -> 캐릭터 멈춤 -> 자이로센서 값 받아서 캐릭터 이동 -> 정답 시 동그라미 보여주고 정보? -> 틀릴 시 X 하고 오답정보와 모션
// -> 다음 문제 진행 -> 반복 -> 문제 3개 완료되면 완료화면 보여주고 별가루 하나 주던가하고 메인으로

// 로딩화면 만들고 로딩 완료되면 시작버튼이 보여지게 해야 함 <- useProgress

// 캔버스에 이미지 그려서 한다고하면... lookat으로 해당방향의 이미지 처다보게하고 걷게함
// 그리고 기울이는 방향으로 캐릭터가 움직일지.. 아니면 그림이 움직여서 캐릭터로 오게할지..
// raycaster로 그림에 닿는거를 판단하던지 아니면 포지션위치가 같아지는 거로 정답 판단하면 될듯
// ㅅㅂ 개어렵네 이미지 네모깍는거만 하루종일햇네 ㅅㅂ

// 캔버스의 이미지를 안쓴다면 이미지가 가운데로 이동하는 거로해서 가운뎅왓을때 정답체크해야할듯

// 만약 캔버스에 안그리는 거면 펭귄이 어디쯤 갓을때 정답인지 판단하기 힘듬..
// 화면 크기, 비율별로 펭귄이 움직여야하는 거리가 달라짐...

// export const STAGE_DATA = [
//   [
//     [
//       { quiz: "나비" },
//       { word: "나비", url: bfyImg, answer: true },
//       { word: "강아지", url: dogIMg, answer: false },
//     ],
//     [
//       { quiz: "도그" },
//       { word: "도그", url: dogIMg, answer: true },
//       { word: "버터", url: bfyImg, answer: false },
//     ],
//     [
//       { quiz: "호랑나비" },
//       { word: "호랑나비", url: bfyImg, answer: true },
//       { word: "웰시코기", url: dogIMg, answer: false },
//     ],
//   ],
//   [
//     [
//       { quiz: "고고고" },
//       { word: "고고고", url: bfyImg, answer: true },
//       { word: "가가가", url: dogIMg, answer: false },
//     ],
//     [
//       { quiz: "123" },
//       { word: "그33", url: dogIMg, answer: true },
//       { word: "버터", url: bfyImg, answer: false },
//     ],
//     [
//       { quiz: "2322" },
//       { word: "2322", url: bfyImg, answer: true },
//       { word: "132", url: dogIMg, answer: false },
//     ],
//   ],
// ];
export const STAGE_DATA = [
  [
    { quiz: "나비" },
    { word: "나비", url: bfyImg, answer: true },
    { word: "강아지", url: dogIMg, answer: false },
  ],
  [
    { quiz: "도그" },
    { word: "도그", url: dogIMg, answer: true },
    { word: "버터", url: bfyImg, answer: false },
  ],
  [
    { quiz: "호랑나비" },
    { word: "호랑나비", url: bfyImg, answer: true },
    { word: "웰시코기", url: dogIMg, answer: false },
  ],
  [
    { quiz: "고고고" },
    { word: "고고고", url: bfyImg, answer: true },
    { word: "가가가", url: dogIMg, answer: false },
  ],
  [
    { quiz: "123" },
    { word: "그33", url: dogIMg, answer: true },
    { word: "버터", url: bfyImg, answer: false },
  ],
  [
    { quiz: "2322" },
    { word: "2322", url: bfyImg, answer: true },
    { word: "132", url: dogIMg, answer: false },
  ],
];

const GameSleigh = () => {
  // 게임 진행 관련 State
  const [isLoading, setIsLoading] = useState(true); // 로딩
  const [isStart, setIsStart] = useState(false); // 게임 시작
  const [isEnd, setIsEnd] = useState(false); // 게임 종료
  const [quizStatus, setQuizStatus] = useState("idle"); // 퀴즈 상태 idle(대기) start(퀴즈내려옴) stop(퀴즈맞추기) check(정답확인)
  const [quizCount, setQuizCount] = useState(0);
  const [quizResult, setQuizResult] = useState("left"); // left right
  // const [isMove, setIsMove] = useState(0); // 0 정지 (-) 왼쪽 (+) 오른쪽

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [random, setRandom] = useState([
    Math.random(),
    Math.random(),
    Math.random(),
  ]);

  // stage 단계 정보
  // const stageLevel = useSelector((state) => {
  //   return state.sleigh.stageLevel;
  // });

  // 게임 배경 Texture 로딩 및 색상 인코딩
  const texture = new THREE.TextureLoader().load(forestMap);
  texture.encoding = THREE.sRGBEncoding;

  // 캐릭터 Ref
  const modelRef = useRef();

  // 캐릭터 애니메이션
  const [modelAnimations, setModelAnimations] = useState(null);

  const doMove = useCallback(
    (value) => {
      const { actions, mixer, names } = modelAnimations;

      // setIsMove(+value);
      modelRef.current.isMove = value;
      actions[names[0]].fadeOut(0.2).stop();
      mixer.timeScale = 1.5;
      modelRef.current.rotation.y = (Math.PI / 2) * value;
      actions[names[3]].play();
    },
    [modelAnimations]
  );

  const stopMove = useCallback(() => {
    const { actions, mixer, names } = modelAnimations;

    // setIsMove(0);
    modelRef.current.isMove = 0;
    actions[names[3]].fadeOut(0.5).stop();
    modelRef.current.rotation.y = 0;
    mixer.timeScale = 1;
    actions[names[0]].play();
  }, [modelAnimations]);

  useEffect(() => {
    if (modelAnimations)
      modelAnimations.actions[modelAnimations.names[0]].play();
  }, [modelAnimations]);

  // 게임 시작 시
  useEffect(() => {
    if (!modelAnimations || !isStart) return;

    const { actions, mixer, names } = modelAnimations;

    actions[names[0]].stop();
    modelRef.current.rotation.y = Math.PI;
    actions[names[3]].reset().fadeIn(0.2).play();
    mixer.timeScale = 1.5;
    setTimeout(() => {
      setQuizStatus("start");
    }, 2000);

    return () => {
      names.forEach((element) => {
        actions[element].reset().fadeOut(0.5).stop();
      });
    };
  }, [isStart]);

  useEffect(() => {
    if (quizStatus === "idle") return;

    const { actions, mixer, names } = modelAnimations;

    const stopActions = () => {
      names.forEach((element) => {
        actions[element].stop();
      });
    };

    // 다음 문제
    if (quizStatus === "nextQuiz") {
      stopActions();
      if (quizCount < 3) {
        modelRef.current.rotation.y = Math.PI;
        mixer.timeScale = 1.5;
        actions[names[3]].fadeIn(0.2).play();

        setTimeout(() => {
          setQuizStatus("start");
        }, 2000);
      } else {
        // 퀴즈 전부 종료
        actions[names[1]].fadeIn(0.2).play();

        setTimeout(() => {
          setQuizStatus("idle");
          setQuizCount(0);
          setIsEnd(true);
        }, 3000);
      }
    }

    // 문제 시작
    if (quizStatus === "stop") {
      stopActions();
      modelRef.current.rotation.y = 0;
      mixer.timeScale = 1.5;
      actions[names[0]].play();
    }

    // 정답 확인
    if (quizStatus === "check") {
      stopActions();
      stopMove();
      modelRef.current.position.x = 0;
      actions[names[0]].play();
    }

    // return () => {};
  }, [quizStatus]);

  useEffect(() => {
    if (isEnd) navigation("/ending");
  }, [isEnd]);

  const addMoveEvent = () => {
    window.doMove = (value) => {
      doMove(value);
    };
    window.stopMove = stopMove;
  };

  const removeMoveEvent = () => {
    window.doMove = () => null;
    window.stopMove = () => null;
  };

  // 게임 입장 시 중력센서용 함수 윈도우에 추가
  useEffect(() => {
    if (window.sleigh) {
      window.sleigh.addGravitySensor();
    }

    return () => {
      if (window.sleigh) {
        window.sleigh.removeGravitySensor();
      }
    };
  }, []);

  // 게임 진행상황에 맞게 센서 사용 온오프
  useEffect(() => {
    if (quizStatus === "stop" && quizCount < 3) {
      addMoveEvent();
    }

    return () => {
      removeMoveEvent();
    };
  }, [quizStatus]);

  // 카메라 설정
  const camera = {
    fov: 80,
    aspect: window.innerWidth / window.innerHeight / 2,
    position: [0, 0, 3],
  };

  const quizScale = (window.innerWidth / window.innerHeight) * 1.25;

  return (
    <>
      <div className="mx-auto h-screen">
        <Canvas flat={true}>
          <Suspense fallback={null}>
            <PerspectiveCamera {...camera} makeDefault />
            <ambientLight />
            <Environment background={true} map={texture} />
            <Model
              modelRef={modelRef}
              quizScale={quizScale}
              quizStatus={quizStatus}
              setQuizResult={setQuizResult}
              setQuizStatus={setQuizStatus}
              setModelAnimations={setModelAnimations}
            />
            {quizStatus !== "idle" &&
              quizStatus !== "nextQuiz" &&
              quizCount < 3 && (
                <>
                  <QuizCard
                    side="left"
                    setQuizStatus={setQuizStatus}
                    quizScale={quizScale}
                    quizData={
                      random[quizCount] > 0.5
                        ? STAGE_DATA[quizCount][1]
                        : STAGE_DATA[quizCount][2]
                    }
                  />
                  <QuizCard
                    side="right"
                    quizScale={quizScale}
                    quizData={
                      random[quizCount] > 0.5
                        ? STAGE_DATA[quizCount][2]
                        : STAGE_DATA[quizCount][1]
                    }
                  />
                </>
              )}
          </Suspense>
          {isLoading && <LoadingProgress setIsLoading={setIsLoading} />}
        </Canvas>

        {!isLoading && !isStart && <Intro setIsStart={setIsStart} />}
        {quizStatus === "stop" && quizCount < 3 && (
          <div className="absolute bottom-[5vh] w-screen flex justify-between px-[10vw]">
            <button
              type="button"
              onTouchStart={(e) => {
                e.preventDefault();
                removeMoveEvent();
                doMove(-1);
              }}
              onMouseDown={() => {
                doMove(-1);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                addMoveEvent();
                stopMove();
              }}
              onMouseUp={stopMove}
              style={{
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
                userSelect: "none",
              }}
              className="bg-mainBlack opacity-80 rounded-[100%] text-[4vw] text-white w-[8vw] h-[8vw] z-20"
            >
              {"⬅"}
            </button>
            <button
              type="button"
              onTouchStart={(e) => {
                e.preventDefault();
                removeMoveEvent();
                doMove(1);
              }}
              onMouseDown={() => {
                doMove(1);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                addMoveEvent();
                stopMove();
              }}
              onMouseUp={stopMove}
              style={{
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
                userSelect: "none",
              }}
              className="bg-mainBlack opacity-80 rounded-[100%] text-[4vw] text-white w-[8vw] h-[8vw] z-20"
            >
              {"➡"}
            </button>
          </div>
        )}

        {quizStatus === "stop" && quizCount < 3 && (
          <QuizWord word={STAGE_DATA[quizCount][0].quiz} />
        )}

        {isLoading && <SleighLoading />}
        {quizStatus === "check" && (
          <QuizResult
            setQuizStatus={setQuizStatus}
            setQuizCount={setQuizCount}
            result={
              quizResult === "left"
                ? STAGE_DATA[quizCount][random[quizCount] > 0.5 ? 1 : 2]
                : STAGE_DATA[quizCount][random[quizCount] > 0.5 ? 2 : 1]
            }
          />
        )}
        {/* {isEnd && (
          <div>
            <button
              onClick={() => {
                // dispatch(sleighActions.setStage(stageLevel + 1));
                setIsEnd(false);
                setIsStart(false);
                setIsLoading(true);
              }}
            >
              다음 단계로
            </button>
            <button
              onClick={() => {
                setIsEnd(false);
                setIsStart(false);
                setIsLoading(true);
              }}
            >
              다시하기
            </button>
            <button
              onClick={() => {
                navigation("/");
              }}
            >
              메인으로
            </button>
          </div>
        )} */}
      </div>
    </>
  );
};

export default GameSleigh;
