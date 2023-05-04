import { Canvas } from "@react-three/fiber";
// import PropTypes from "prop-types";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { PengulModel } from "components/gameJump/Pengul";
import FallowCamera from "components/gameJump/FollowCamera";
import { IceModel } from "components/gameJump/IcePannel";
import BackgroundImage from "components/gameJump/BackgroundImage";

import bgImage from "assets/images/background/background_iceberg.png";
import WaterFloor from "components/gameJump/WaterFloor";
import GameJumpOverlay from "components/gameJump/GameJumpOverlay";
import { gameStatusActions } from "store/features/gameStatus/gameStatusSlice";
import TextObject from "components/gameJump/TextObject";

import { GameStatus } from "util/Enums.ts";
import { Navigate } from "react-router-dom";
import LoadingComponent from "components/common/LoadingComponent";

const BOTTOM_POSITION = -70;
const SHORTEST_DISTANCE_FOR_JUMP = 50;

const TEST_PROBLEM = [
  [{ word: `개구리가` }, { word: `폴짝폴짝` }, { word: `뛰어요` }],
  [{ word: `니나니나` }, { word: `니고릴라` }],
  [
    { word: `내일의` },
    { word: `이지우가` },
    { word: `빈둥빈둥` },
    { word: `놀아요` },
  ],
];
const LAST_LEVEL = TEST_PROBLEM.length;

export const GameJump = (props) => {
  const character = useRef();
  const dispatch = useDispatch();
  const gameStatus = useSelector((state) => state.gameStatus.status);

  const level = useSelector((state) => state.gameStatus.level);
  const [isLoading, setIsLoading] = useState(true);
  const [problems, setProblems] = useState(TEST_PROBLEM ? TEST_PROBLEM : [[]]);

  let lastIcePosition = -325;

  useEffect(() => {
    // console.log("Loading....");

    //실제로는 비동기 통신이 이루어지면서 게임 데이터를 로딩한다
    dispatch(gameStatusActions.loaded());

    //clear
    return () => {
      dispatch(gameStatusActions.clearLevel());
    };
  }, [dispatch]);

  const startGame = useCallback(() => {
    dispatch(gameStatusActions.start());
  }, [dispatch]);

  return (
    <>
      {level >= LAST_LEVEL ? (
        <Navigate to={`/ending`} />
      ) : (
        //750 length
        <Suspense fallback={<LoadingComponent />}>
          {isLoading ? (
            <LoadingComponent />
          ) : (
            <GameJumpOverlay startGame={startGame} />
          )}
          <Canvas
            onCreated={() => {
              setIsLoading(false);
            }}
          >
            {/** 배경설정 */}
            {/* <OrbitControls /> */}
            <ambientLight args={["white", 1.5]} castShadow />
            <BackgroundImage imagePath={bgImage} />
            <FallowCamera target={character} />
            <WaterFloor bottom={BOTTOM_POSITION} />

            {/** 캐릭터 모델 */}
            <PengulModel ref={character} bottom={BOTTOM_POSITION} />

            {/** 고정 오브젝트 */}
            <IceModel icePosition={-375} bottom={BOTTOM_POSITION} />
            <IceModel icePosition={375} bottom={BOTTOM_POSITION} />

            {/** 동적 오브젝트 */}
            {gameStatus === GameStatus.GAME_START &&
              problems[level].map((el, idx) => {
                const length =
                  (750 -
                    SHORTEST_DISTANCE_FOR_JUMP * (problems[level].length - 1)) /
                  problems[level].length;

                lastIcePosition += length + SHORTEST_DISTANCE_FOR_JUMP;

                if (idx === 0) {
                  lastIcePosition -= length;
                }

                return (
                  <React.Fragment key={idx}>
                    <TextObject
                      text={el.word}
                      position={[lastIcePosition - 75, 150, 0]}
                    />
                    <IceModel
                      icePosition={lastIcePosition}
                      bottom={BOTTOM_POSITION}
                      length={length / 15}
                    />
                  </React.Fragment>
                );
              })}
          </Canvas>
        </Suspense>
      )}
    </>
  );
};

GameJump.propTypes = {
  // gameStatus: PropTypes.number.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameJump);
