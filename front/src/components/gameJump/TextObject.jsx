import PropTypes from "prop-types";
import { Html } from "@react-three/drei";

const TextObject = ({ text, position = [0, 0, 0], ...props }) => {


  return (
    <mesh position={position}>
      <Html>
        <div className={`whitespace-nowrap mt-8 text-4xl font-MaplestoryBold`}>
          {text}
        </div>
      </Html>
    </mesh>
  );
};

TextObject.propTypes = {
  text: PropTypes.string.isRequired,
  position: PropTypes.array,
};

export default TextObject;
