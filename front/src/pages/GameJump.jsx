import { Canvas } from "@react-three/fiber";
import PropTypes from "prop-types";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { PengulModel } from "components/gameJump/Pengul";
import { OrbitControls } from "@react-three/drei";
import FallowCamera, { FlatCamera } from "components/gameJump/FollowCamera";
import { IceModel } from "components/gameJump/IcePannel";
import BackgroundImage from "components/gameJump/BackgroundImage";

import bgImage from "assets/images/background/background_iceberg.png";
import WaterFloor from "components/gameJump/WaterFloor";
import Overlay from "components/gameJump/Overlay";
import { gameStatusActions } from "store/features/gameStatus/gameStatusSlice";
import TextObject from "components/gameJump/TextObject";

import { GameStatus } from "util/Enums.ts";
import { Navigate } from "react-router-dom";

const BOTTOM_POSITION = -70;

const TEST_PROBLEM = [
  [{ word: `개구리가` }, { word: `폴짝폴짝` }, { word: `뛰어요` }],
  [{ word: `이지우가` }, { word: `빈둥빈둥` }, { word: `놀아요` }],
];
const LAST_LEVEL = TEST_PROBLEM.length;

export const GameJump = (props) => {
  const character = useRef();
  const dispatch = useDispatch();
  const gameStatus = useSelector((state) => state.gameStatus.status);

  const level = useSelector((state) => state.gameStatus.level);
  const [problems, setProblems] = useState(TEST_PROBLEM ? TEST_PROBLEM : [[]]);

  console.log(gameStatus);
  useEffect(() => {
    console.log("Loading....");

    //실제로는 비동기 통신이 이루어지면서 게임 데이터를 로딩한다
    dispatch(gameStatusActions.loaded());
  }, [dispatch]);

  const startGame = useCallback(() => {
    dispatch(gameStatusActions.start());
  }, [dispatch]);

  return (
    <div className="relative flex w-screen h-screen mx-auto">
      {level >= LAST_LEVEL ? (
        <Navigate to={`/`} />
      ) : (
        <Canvas>
          <Suspense fallback={null}>
            <>
              {/* <OrbitControls /> */}
              <ambientLight args={["white", 1.5]} castShadow />
              <BackgroundImage imagePath={bgImage} />
              <FallowCamera target={character} />
              {/* <FlatCamera /> */}
              <WaterFloor bottom={BOTTOM_POSITION} />
            </>

            <PengulModel ref={character} bottom={BOTTOM_POSITION} />

            <>
              <IceModel icePosition={-400} bottom={BOTTOM_POSITION} />
              <IceModel icePosition={-300} bottom={BOTTOM_POSITION} />
              <IceModel icePosition={300} bottom={BOTTOM_POSITION} />
              <IceModel icePosition={400} bottom={BOTTOM_POSITION} />
            </>

            <>
              {gameStatus === GameStatus.GAME_START &&
                problems[level].map((el, idx) => {
                  if (idx === 0) {
                    return (
                      <TextObject
                        key={idx}
                        text={el.word}
                        position={[-360, 150, 0]}
                      />
                    );
                  } else if (idx === problems[level].length - 1) {
                    return (
                      <TextObject
                        key={idx}
                        text={el.word}
                        position={[240, 150, 0]}
                      />
                    );
                  }

                  return (
                    <TextObject
                      key={idx}
                      text={el.word}
                      position={[-80, 150, 0]}
                    />
                  );
                })}
              {/* <TextObject text={`폴짝폴짝`} position={[0, 100, 0]} /> */}
              <IceModel icePosition={0} bottom={BOTTOM_POSITION} />
            </>
          </Suspense>
        </Canvas>
      )}
      <Overlay startGame={startGame} />
    </div>
  );
};

GameJump.propTypes = {
  // gameStatus: PropTypes.number.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameJump);
