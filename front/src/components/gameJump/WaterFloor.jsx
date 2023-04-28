import React from "react";
import PropTypes from "prop-types";
import { Color } from "three";

const WaterFloor = ({ bottom = 0, ...props }) => {
  return (
    <mesh {...props} position={[0, bottom - 105, 30]} name={`WaterFloor`}>
      <boxGeometry args={[1000, 10, -400, 10, 10]} />
      <meshStandardMaterial
        color={(() => {
          const color = new Color("#00bfff");
          return color.convertSRGBToLinear();
        })()}
        opacity={0.1}
      />
    </mesh>
  );
};

WaterFloor.propTypes = {
  bottom: PropTypes.number,
};

export default WaterFloor;
