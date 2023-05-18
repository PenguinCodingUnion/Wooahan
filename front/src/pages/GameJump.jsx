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
import TextObject from "components/gameJump/TextObject";

import { GameStatus } from "util/Enums.ts";
import { Navigate } from "react-router-dom";
import LoadingComponent from "components/common/LoadingComponent";
import { jumpActions, jumpDataAction } from "store/features/jump/jumpSlice";

import useSound from "util/hooks/useSound";
import bgm from "assets/sounds/jumpbgm.mp3";

const BOTTOM_POSITION = -window.innerHeight / 2 + 110;
const SHORTEST_DISTANCE_FOR_JUMP = 50;
const EDGE = window.innerWidth / 2 + 5;

export const GameJump = (props) => {
  const character = useRef();
  const dispatch = useDispatch();
  const gameStatus = useSelector((state) => state.jump.status);

  const level = useSelector((state) => state.jump.level);
  const [isLoading, setIsLoading] = useState(true);
  const problems = useSelector((state) => state.jump.problems);

  const LAST_LEVEL = problems.length;

  let lastIcePosition = -EDGE + 50;

  useEffect(() => {
    //비동기 통신이 이루어지면서 게임 데이터를 로딩한다
    dispatch(jumpDataAction(0));

    //clear
    return () => {
      dispatch(jumpActions.clearLevel());
      dispatch(jumpActions.setAction(-1));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(jumpActions.setAction(0));
  }, [dispatch, level]);

  const startGame = useCallback(() => {
    dispatch(jumpActions.start());
  }, [dispatch]);

  useSound(bgm, 0.4, 2000);

  return (
    <>
      {level >= LAST_LEVEL ? (
        <Navigate
          to={`/ending`}
          state={{
            game: "jump",
            character: "penguin",
            mention: "유치원에 도착했어요!",
          }}
        />
      ) : (
        //750 length
        <>
          {isLoading || gameStatus === GameStatus.GAME_NOT_LOADED ? (
            <LoadingComponent />
          ) : (
            <GameJumpOverlay startGame={startGame} />
          )}
          <Canvas
            onCreated={() => {
              setTimeout(() => setIsLoading(false), 2000);
            }}
          >
            <Suspense fallback={null}>
              {/** 배경설정 */}
              {/* <OrbitControls /> */}
              <ambientLight args={["white", 1.5]} castShadow />
              <BackgroundImage imagePath={bgImage} />
              <FallowCamera target={character} />
              <WaterFloor bottom={BOTTOM_POSITION} />

              {/** 캐릭터 모델 */}
              <PengulModel ref={character} bottom={BOTTOM_POSITION} />

              {/** 고정 오브젝트 */}
              <IceModel icePosition={-EDGE} bottom={BOTTOM_POSITION} />
              <IceModel icePosition={EDGE} bottom={BOTTOM_POSITION} />

              {/** 동적 오브젝트 */}
              {gameStatus === GameStatus.GAME_START &&
                problems[level].result.map((el, idx) => {
                  // console.log(problems);

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
                    ((EDGE - 50) * 2 -
                      SHORTEST_DISTANCE_FOR_JUMP * problemCnt) /
                    countWord;

                  const realLength = length * el.content.length;

                  if (idx !== 0) {
                    lastIcePosition += realLength / 2;
                  }

                  const nowPosition = lastIcePosition;

                  lastIcePosition +=
                    realLength / 2 + SHORTEST_DISTANCE_FOR_JUMP;

                  return (
                    <React.Fragment key={idx}>
                      <TextObject
                        text={el.content}
                        url={el.url}
                        time={el.fileLength}
                        iceLength={realLength}
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
            </Suspense>
          </Canvas>
        </>
      )}
    </>
  );
};

GameJump.propTypes = {
  // gameStatus: PropTypes.number.isRequired,
};

export default GameJump;
