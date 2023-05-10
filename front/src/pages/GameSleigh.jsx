import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
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
import LoadingProgress from "components/gameSleigh/LoadingProgress";
import QuizResult from "components/gameSleigh/QuizResult";
import { useNavigate } from "react-router-dom";
import { getQuizData, sleighActions } from "store/features/sliegh/sleighSlice";
import Intro from "components/gameSleigh/Intro";
import QuizWord from "components/gameSleigh/QuizWord";
import LoadingComponent from "components/common/LoadingComponent";

const GameSleigh = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  // 게임 진행 관련 State
  const [isCanvasLoading, setIsCanvasLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // 로딩

  const [isStart, setIsStart] = useState(false); // 게임 시작
  const [isEnd, setIsEnd] = useState(false); // 게임 종료
  const [quizStatus, setQuizStatus] = useState("idle"); // 퀴즈 상태 idle(대기) start(퀴즈내려옴) stop(퀴즈맞추기) check(정답확인)
  const [quizCount, setQuizCount] = useState(0);
  const [quizResult, setQuizResult] = useState("left"); // left right

  const quizData = useSelector((state) => state.sleigh.quizData);
  // const { isStart, isEnd, quizStatus, quizCount, quizResult, quizData } =
  //   useSelector((state) => state.sleigh);

  useEffect(() => {
    dispatch(getQuizData(0));
  }, []);

  const [random, setRandom] = useState([
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
  ]);

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
      actions[names[5]].fadeOut(0.2).stop();
      mixer.timeScale = 5;
      modelRef.current.scale.y = 1.055;
      modelRef.current.rotation.y = (Math.PI / 2) * value;
      actions[names[7]].play();
    },
    [modelAnimations]
  );

  const stopMove = useCallback(() => {
    const { actions, mixer, names } = modelAnimations;

    // setIsMove(0);
    modelRef.current.isMove = 0;
    actions[names[7]].fadeOut(0.5).stop();
    modelRef.current.rotation.y = 0;
    mixer.timeScale = 1.5;
    modelRef.current.scale.y = 1;
    actions[names[5]].play();
  }, [modelAnimations]);

  useEffect(() => {
    if (modelAnimations) {
      modelRef.current.rotation.x = -0.1;
      modelAnimations.actions[modelAnimations.names[5]].play();
    }
  }, [modelAnimations]);

  // 게임 시작 시
  useEffect(() => {
    if (!modelAnimations || !isStart) return;

    const { actions, mixer, names } = modelAnimations;

    actions[names[5]].stop();
    modelRef.current.rotation.y = Math.PI;
    actions[names[6]].play();
    actions[names[7]].play();
    mixer.timeScale = 4;
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
      if (quizCount < 5) {
        modelRef.current.rotation.y = Math.PI;
        mixer.timeScale = 4;
        actions[names[6]].play();
        actions[names[7]].play();

        setTimeout(() => {
          setQuizStatus("start");
        }, 2000);
      } else {
        // 퀴즈 전부 종료
        modelRef.current.rotation.x = -0.2;
        mixer.timeScale = 3;
        actions[names[4]].play();
        actions[names[6]].play();

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
      actions[names[5]].play();
    }

    // 정답 확인
    if (quizStatus === "check") {
      stopActions();
      stopMove();
      modelRef.current.position.x = 0;
      mixer.timeScale = 1.5;
      actions[names[4]].play();
      actions[names[5]].play();
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

  // 게임 입장 시 중력센서 사용
  useEffect(() => {
    if (window.sleigh) {
      window.sleigh.resumeSensor();
    }

    return () => {
      if (window.sleigh) {
        window.sleigh.pauseSensor();
      }
    };
  }, []);

  // 게임 진행상황에 맞게 함수 추가 삭제
  useEffect(() => {
    if (quizStatus === "stop" && quizCount < 5) {
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
      <div className="h-screen w-screen">
        {quizStatus !== "idle" &&
          quizStatus !== "start" &&
          quizStatus !== "nextQuiz" &&
          quizCount < 5 && (
            <div className=" absolute h-screen w-screen justify-center items-center flex">
              <div
                className="animate-scale-up-center z-50 absolute w-[19vw] h-[19vw] left-[12.5vw]"
                style={{
                  top: `${(30 / (quizScale / 1.25)) * 0.7}vh`,
                }}
              >
                <div className="w-[100%] h-[100%] rounded-[20px] animate-card-bounce border-2 bg-white">
                  <img
                    className="w-[100%] h-[100%] rounded-[16px]"
                    alt="#"
                    src={
                      random[quizCount] > 0.5
                        ? quizData[quizCount].words[0].word.imgUrl
                        : quizData[quizCount].words[1].word.imgUrl
                    }
                  />
                </div>
              </div>
              <div
                className="animate-scale-up-center z-50 absolute w-[19vw] h-[19vw] right-[12.5vw]"
                style={{
                  top: `${(30 / (quizScale / 1.25)) * 0.7}vh`,
                }}
              >
                <div className="w-[100%] h-[100%] rounded-[20px] animate-card-bounce border-2 bg-white">
                  <img
                    className="w-[100%] h-[100%] rounded-[16px]"
                    alt="#"
                    src={
                      random[quizCount] > 0.5
                        ? quizData[quizCount].words[1].word.imgUrl
                        : quizData[quizCount].words[0].word.imgUrl
                    }
                  />
                </div>
              </div>
            </div>
          )}
        <Canvas
          onCreated={() => {
            setIsCanvasLoading(false);
          }}
          flat={true}
        >
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
              quizCount < 5 && (
                <>
                  <QuizCard
                    side="left"
                    setQuizStatus={setQuizStatus}
                    quizScale={quizScale}
                    quiz={
                      random[quizCount] > 0.5
                        ? quizData[quizCount].words[0]
                        : quizData[quizCount].words[1]
                    }
                  />
                  <QuizCard
                    side="right"
                    quizScale={quizScale}
                    quiz={
                      random[quizCount] > 0.5
                        ? quizData[quizCount].words[1]
                        : quizData[quizCount].words[0]
                    }
                  />
                </>
              )}
          </Suspense>
          {isLoading && <LoadingProgress setIsLoading={setIsLoading} />}
        </Canvas>
        {/* {!isCanvasLoading && !isLoading && !isStart && (
          <Intro setIsStart={setIsStart} />
        )} */}
        {quizStatus === "stop" && quizCount < 5 && (
          <div className="absolute bottom-[5vh] w-screen flex justify-between px-[10vw]">
            <button
              type="button"
              onTouchStart={(e) => {
                removeMoveEvent();
                doMove(-1);
              }}
              onMouseDown={() => {
                doMove(-1);
              }}
              onTouchEnd={(e) => {
                addMoveEvent();
                stopMove();
              }}
              onMouseUp={stopMove}
              className="bg-mainBlack opacity-80 rounded-[100%] text-[4vw] text-white w-[8vw] h-[8vw] z-20"
            >
              <p className="translate-x-[-0.3vw]">◀</p>
            </button>
            <button
              type="button"
              onTouchStart={(e) => {
                removeMoveEvent();
                doMove(1);
              }}
              onMouseDown={() => {
                doMove(1);
              }}
              onTouchEnd={(e) => {
                addMoveEvent();
                stopMove();
              }}
              onMouseUp={stopMove}
              className="bg-mainBlack opacity-80 rounded-[100%] text-[4vw] text-white w-[8vw] h-[8vw] z-20 translate-x-[2%]"
            >
              <p className="translate-x-[0.3vw]">▶</p>
            </button>
          </div>
        )}
        {quizStatus === "stop" && quizCount < 5 && (
          <QuizWord word={quizData[quizCount].quiz} />
        )}
        {/* {(isCanvasLoading || isLoading) && <LoadingComponent />} */}
        {quizStatus === "check" && (
          <QuizResult
            setQuizStatus={setQuizStatus}
            setQuizCount={setQuizCount}
            result={
              quizResult === "left"
                ? quizData[quizCount].words[random[quizCount] > 0.5 ? 0 : 1]
                : quizData[quizCount].words[random[quizCount] > 0.5 ? 1 : 0]
            }
          />
        )}
      </div>
    </>
  );
};

export default GameSleigh;
