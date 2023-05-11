import { Canvas } from "@react-three/fiber";
// import PropTypes from "prop-types";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { jumpActions, jumpDataAction } from "store/features/jump/jumpSlice";

import useSound from "util/hooks/useSound";
import bgm from "assets/sounds/jumpbgm.mp3";

const BOTTOM_POSITION = -70;
const SHORTEST_DISTANCE_FOR_JUMP = 50;
const EDGE = 375;

export const GameJump = (props) => {
  const character = useRef();
  const dispatch = useDispatch();
  const gameStatus = useSelector((state) => state.gameStatus.status);

  const level = useSelector((state) => state.gameStatus.level);
  const [isLoading, setIsLoading] = useState(true);
  const problems = useSelector((state) => state.jump.problems);

  const LAST_LEVEL = problems.length;

  let lastIcePosition = -325;

  useEffect(() => {
    //실제로는 비동기 통신이 이루어지면서 게임 데이터를 로딩한다
    dispatch(jumpDataAction(0));

    dispatch(gameStatusActions.loaded());

    //clear
    return () => {
      dispatch(gameStatusActions.clearLevel());
      dispatch(jumpActions.setAction(-1));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(jumpActions.setAction(0));
  }, [dispatch, level]);

  const startGame = useCallback(() => {
    dispatch(gameStatusActions.start());
  }, [dispatch]);

  useSound(bgm, 1, 2000);

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
              problems[level].result.map((el, idx) => {
                //띄어쓰기 수
                const problemCnt = problems[level].result.length - 1;
                //총 글자 수
                let countWord = 0;
                // problems[level].result[0].content.length();
                problems[level].result.forEach((element, index) => {
                  if (
                    index === 0 ||
                    index === problems[level].result.length - 1
                  ) {
                    countWord += element.content.length / 2;
                  } else {
                    countWord += element.content.length;
                  }
                });

                const length =
                  (325 * 2 - SHORTEST_DISTANCE_FOR_JUMP * problemCnt) /
                  countWord;

                const realLength = length * el.content.length;

                if (idx !== 0) {
                  lastIcePosition += realLength / 2;
                }

                const nowPosition = lastIcePosition;

                lastIcePosition += realLength / 2 + SHORTEST_DISTANCE_FOR_JUMP;

                return (
                  <React.Fragment key={idx}>
                    <TextObject
                      text={el.content}
                      url={el.url}
                      no={idx}
                      edge={EDGE}
                      isFirst={idx === 0}
                      isLast={idx === problemCnt}
                      position={[nowPosition, 150, 0]}
                    />
                    <IceModel
                      icePosition={nowPosition}
                      bottom={BOTTOM_POSITION}
                      length={realLength / 15}
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

export default GameJump;
