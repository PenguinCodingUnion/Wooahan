import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import IcePlane from "assets/models/jump/ICE_FLAT_GROUND.gltf";
import PropTypes from "prop-types";

export const IceModel = ({ icePosition = 0, bottom = 0, ...props }) => {
  const me = useRef();
  const { nodes, materials } = useGLTF(IcePlane);
  return (
    <group {...props} dispose={null} ref={me} position={[0, bottom - 55, -50]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.IceFloeLow.geometry}
        material={materials.MAT_MAIN}
        position={[icePosition, -31.5, 0]}
        scale={[20, 10, 10]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
};

IceModel.propTypes = {
  icePosition: PropTypes.number,
  bottom: PropTypes.number,
};

useGLTF.preload(IcePlane);
