import React, { useRef } from "react";
import { Edges, useGLTF } from "@react-three/drei";
import IcePlane from "assets/models/jump/ICE_FLAT_GROUND.gltf";
import PropTypes from "prop-types";

//width 150 //딱 4글자 정도 들어감
export const IceModel = ({
  icePosition = 0,
  bottom = 0,
  length = 10,
  ...props
}) => {
  const me = useRef();
  const { nodes, materials } = useGLTF(IcePlane);
  return (
    <group
      {...props}
      dispose={null}
      ref={me}
      position={[0, bottom - 55, -50]}
      name={`icePannel`}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.IceFloeLow.geometry}
        material={materials.MAT_MAIN}
        position={[icePosition, -31.5, 0]}
        scale={[length, 10, 10]}
        rotation={[Math.PI / 2, 0, 0]}
        name={"realIcePannel"}
      >
        {/* <Edges scale={1} threshold={1} color="red" /> */}
      </mesh>
    </group>
  );
};

IceModel.propTypes = {
  icePosition: PropTypes.number,
  bottom: PropTypes.number,
  length: PropTypes.number,
};

useGLTF.preload(IcePlane);
