import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import PENGUEL from "assets/models/PENGUEL.gltf";

const Pengeul = (props) => {
  const gltf = useLoader(GLTFLoader, PENGUEL);
  console.log(gltf);

  let mixer;
  if (gltf.animations.length) {
    mixer = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.clipAction(gltf.animations[props.actionNumber]);
    action.play();
  }

  useFrame((state, delta) => {
    mixer?.update(delta);
  });

  return (
    <>
      <primitive object={gltf.scene} scale={0.05} />
    </>
  );
};

const App = () => {
  const animation = [
    "idle",
    "jumping",
    "jumping_fail",
    "peng_fall_down",
    "t-pose",
    "walk",
  ];
  const cameraRef = useRef();
  const [actionNumber, setActionNumber] = useState(0);
  const changeAction = () => {
    setActionNumber((actionNumber + 1) % 6);
    console.log(actionNumber);
  };

  useEffect(() => {
    window.changeActionNative = new CustomEvent("NativeEvent");
    const NativeEventCallback = (event) => {
      alert(`event receive from Native`);
    };

    window.addEventListener("NativeEvent", NativeEventCallback);

    return () => {
      window.removeEventListener("removeEvent", NativeEventCallback);
    };
  }, []);

  return (
    <div className="h-screen mx-auto">
      <div className="relative leading-7 text-center text-white bg-black h-7">
        <span className="mx-3 font-bold cursor-pointer" onClick={changeAction}>
          펭글이
        </span>
        <span className="absolute">{animation[actionNumber]}</span>
      </div>

      <Canvas
      // camera={{ fov: 50 }}
      // onCreated={({ camera, gl, scene }) => {
      //   camera.lookAt(new THREE.Vector3(0, 0, 0));
      //   scene.background = new THREE.Color("lightblue");
      //   gl.shadowMap.enabled = true;
      //   gl.shadowMap.type = THREE.PCFSoftShadowMap;
      // }}
      >
        <ambientLight />
        <PerspectiveCamera position={[10, 5, 10]} makeDefault ref={cameraRef} />
        <pointLight position={[10, 10, 10]} />
        <Pengeul actionNumber={actionNumber} />
        <OrbitControls target={[0, 1, 0]} />
      </Canvas>
    </div>
  );
};

export default App;
