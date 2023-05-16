import PropTypes from "prop-types";
import { Html } from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";
import SentenceSound from "components/gameJump/SentenceSound";
import { useEffect, useMemo, useRef, useState } from "react";
import { AudioLoader } from "three";
import { jumpActions } from "store/features/jump/jumpSlice";

// const soundFileContext = require.context(
//   "assets/sounds/jump",
//   true,
//   /\.(mp3|wav|ogg)$/
// );

const getSoundFile = (filename) => {
  // return soundFileContext(`./${filename}`);
  const path = `${process.env.REACT_APP_SSS_PATH}${filename}`;
  return path;
};

const TextObject = ({
  no,
  text,
  url,
  time,
  iceLength,
  isLast,
  isFirst,
  edge,
  position = [0, 0, 0],
  ...props
}) => {
  const action = useSelector((state) => state.jump.actionWord);

  const audioRef = useRef();

  const [audioLoaded, setAudioLoaded] = useState(false);

  const dispatch = useDispatch();

  const animationStyle = {
    background: "linear-gradient(90deg, red 50%, black 50%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: no === action ? "transparent" : action > no ? "red" : "black",
    backgroundSize: "200% 100%",
  };

  const fileName = useMemo(() => {
    return getSoundFile(url);
  }, [url]);

  useEffect(() => {
    if (no === action && audioLoaded) {
      audioRef.current.stop();
      audioRef.current.play();

      setAudioLoaded(false);
    }

    // if (no === action) {
    //   const speed = iceLength / time;
    //   console.log(iceLength, time, speed);
    //   dispatch(jumpActions.setSpeed(speed * 1000));
    // }
  }, [action, no, audioLoaded]);

  useEffect(() => {
    const loadAudio = async () => {
      const buffer = await new AudioLoader().loadAsync(fileName);
      audioRef.current.setBuffer(buffer);
      setAudioLoaded(true);
    };

    loadAudio();
  }, [fileName]);

  const calcPosition = () => {
    if (isFirst) return -edge;

    if (isLast) return edge;

    return position[0];
  };

  return (
    <mesh position={[calcPosition(), position[1], position[2]]}>
      <Html>
        <div
          className={`whitespace-nowrap 
          bg-clip-text mt-8 p-8 text-5xl font-MaplestoryBold 
          ${!(isFirst || isLast) && `-translate-x-1/2`} 
          ${isLast && `-translate-x-full`}
          ${
            no === action
              ? `animate-[textSlide_1s_linear_1_forwards]`
              : `bg-[0%]`
          }`}
          style={animationStyle}
        >
          {text}
        </div>
      </Html>
      <SentenceSound fileName={fileName} ref={audioRef} />
    </mesh>
  );
};

TextObject.propTypes = {
  no: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  iceLength: PropTypes.number.isRequired,
  edge: PropTypes.number.isRequired,
  position: PropTypes.array,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
};

export default TextObject;
