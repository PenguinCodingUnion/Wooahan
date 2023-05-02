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
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as THREE from "three";
import forestMap from "assets/images/background_forest.png";
import QuizBox from "components/gameSleigh/QuizBox";
import bfyImg from "assets/images/bfy.png";
import dogIMg from "assets/images/dog.png";
import { SleighLoading, LoadingProgress } from "components/gameSleigh/Loading";
import QuizResult from "components/gameSleigh/QuizResult";
import { useNavigate } from "react-router-dom";
import { sleighActions } from "store/features/sliegh/sleighSlice";

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

export const STAGE_DATA = [
  [
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
  ],
  [
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

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [random, setRandom] = useState([
    Math.random(),
    Math.random(),
    Math.random(),
  ]);

  // stage 단계 정보
  const stageLevel = useSelector((state) => {
    return state.sleigh.stageLevel;
  });

  // 게임 배경 Texture 로딩 및 색상 인코딩
  const texture = new THREE.TextureLoader().load(forestMap);
  texture.encoding = THREE.sRGBEncoding;

  // 캐릭터 Ref
  const modelRef = useRef();

  // 캐릭터 애니메이션
  const [modelAnimations, setModelAnimations] = useState(null);

  // 게임 시작 시
  useEffect(() => {
    if (!modelAnimations || !isStart) return;

    const { actions, mixer, names } = modelAnimations;

    actions[names[3]].reset().fadeIn(0.2).play();

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

    const onKeyDown = (e) => {
      e.preventDefault();
      if (e.key === "ArrowLeft") {
        modelAnimations.mixer.timeScale = 1.5;
        modelRef.current.position.x -= 0.06;
        modelRef.current.rotation.y = Math.PI / 2;
        actions[names[3]].play();
      } else if (e.key === "ArrowRight") {
        modelAnimations.mixer.timeScale = 1.5;
        modelRef.current.position.x += 0.06;
        modelRef.current.rotation.y = -Math.PI / 2;
        actions[names[3]].play();
      }
    };

    const onKeyUp = (e) => {
      e.preventDefault();
      if (e.key === "ArrowLeft") {
        actions[names[3]].reset().fadeOut(0.5).stop();
        modelRef.current.rotation.y = Math.PI;
        modelAnimations.mixer.timeScale = 1;
      } else if (e.key === "ArrowRight") {
        actions[names[3]].reset().fadeOut(0.5).stop();
        modelRef.current.rotation.y = Math.PI;
        modelAnimations.mixer.timeScale = 1;
      }
    };

    // 다음 문제
    if (quizStatus === "nextQuiz") {
      stopActions();

      if (quizCount < 3) {
        modelRef.current.rotation.y = 0;
        actions[names[3]].reset().fadeIn(0.2).play();

        setTimeout(() => {
          setQuizStatus("start");
        }, 2000);
      } else {
        actions[names[1]].reset().fadeIn(0.2).play();
        setQuizStatus("idle");
        setQuizCount(0);
        setIsEnd(true);
      }
    }

    // 문제 시작
    if (quizStatus === "stop") {
      stopActions();
      modelRef.current.rotation.y = Math.PI;

      document.addEventListener("keydown", onKeyDown);
      document.addEventListener("keyup", onKeyUp);

      actions[names[0]].fadeIn(0.2).play();
    }

    // 정답 확인
    if (quizStatus === "check") {
      stopActions();
      modelRef.current.rotation.y = Math.PI;
      modelRef.current.position.x = 0;
      actions[names[0]].fadeIn(0.2).play();
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [quizStatus]);

  // 카메라 설정
  const camera = {
    fov: 80,
    aspect: window.innerWidth / window.innerHeight / 2,
    position: [0, 0, 3],
  };

  const quizScale = (window.innerWidth / window.innerHeight) * 1.25;

  useEffect(() => {
    if (+quizCount === 3) {
    }
  }, [quizCount]);

  return (
    <>
      <div className="mx-auto h-screen">
        <Canvas>
          <Suspense fallback={null}>
            <PerspectiveCamera {...camera} makeDefault />
            <Model
              modelRef={modelRef}
              quizScale={quizScale}
              quizStatus={quizStatus}
              setQuizResult={setQuizResult}
              setQuizStatus={setQuizStatus}
              setModelAnimations={setModelAnimations}
            />
            <ambientLight />
            {quizStatus !== "idle" &&
              quizStatus !== "nextQuiz" &&
              quizCount < 3 && (
                <>
                  <QuizBox
                    side="left"
                    setQuizStatus={setQuizStatus}
                    quizScale={quizScale}
                    quizData={
                      random[quizCount] > 0.5
                        ? STAGE_DATA[stageLevel][quizCount][1]
                        : STAGE_DATA[stageLevel][quizCount][2]
                    }
                  />
                  <QuizBox
                    side="right"
                    quizScale={quizScale}
                    quizData={
                      random[quizCount] > 0.5
                        ? STAGE_DATA[stageLevel][quizCount][2]
                        : STAGE_DATA[stageLevel][quizCount][1]
                    }
                  />
                </>
              )}
            <Environment background={true} map={texture} />
          </Suspense>
          {isLoading && <LoadingProgress setIsLoading={setIsLoading} />}
        </Canvas>
        {quizStatus === "stop" && quizCount < 3 && (
          <>
            <div
              style={{
                position: "absolute",
                top: 10,
                background: "#d9d9d9",
                left: "50%",
                fontSize: "40px",
              }}
            >
              {STAGE_DATA[stageLevel][quizCount][0].quiz}
            </div>
          </>
        )}
        {isLoading && <SleighLoading />}
        {!isLoading && !isStart && (
          <div
            style={{
              position: "absolute",
              background: "blue",
              textAlign: "center",
              top: "50%",
              left: "50%",
            }}
            onClick={() => {
              setIsStart(!isStart);
            }}
          >
            시작하기
          </div>
        )}
        {quizStatus === "check" && (
          <QuizResult
            setQuizStatus={setQuizStatus}
            setQuizCount={setQuizCount}
            result={
              quizResult === "left"
                ? STAGE_DATA[stageLevel][quizCount][
                    random[quizCount] > 0.5 ? 1 : 2
                  ]
                : STAGE_DATA[stageLevel][quizCount][
                    random[quizCount] > 0.5 ? 2 : 1
                  ]
            }
          />
        )}
        {isEnd && (
          <div>
            <button
              onClick={() => {
                dispatch(sleighActions.setStage(stageLevel + 1));
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
        )}
      </div>
    </>
  );
};

export default GameSleigh;
