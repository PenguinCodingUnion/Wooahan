import PropTypes from "prop-types";
import { Html } from "@react-three/drei";
import { useSelector } from "react-redux";

const TextObject = ({ no, text, position = [0, 0, 0], ...props }) => {
  const action = useSelector((state) => state.jump.actionWord);

  const animationStyle = {
    fontSize: "24px",
    background: "linear-gradient(90deg, red 50%, black 50%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: no === action ? "transparent" : action > no ? "red" : "black",
    backgroundSize: "200% 100%",
  };

  return (
    <mesh position={position}>
      <Html>
        <div
          className={`whitespace-nowrap bg-clip-text mt-8 text-4xl font-MaplestoryBold ${
            no === action
              ? `animate-[textSlide_1s_linear_1_forwards]`
              : `bg-[0%]`
          }`}
          style={animationStyle}
        >
          {text}
        </div>
      </Html>
    </mesh>
  );
};

TextObject.propTypes = {
  no: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  position: PropTypes.array,
};

export default TextObject;
