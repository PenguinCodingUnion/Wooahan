import {
  Environment,
  Lightformer,
  Loader,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import LoadModel from "components/gameSleigh/LoadModel";
import PropTypes from "prop-types";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as THREE from "three";
import forestMap from "assets/images/background_forest.png";
import QuizBox from "components/gameSleigh/QuizBox";
import bfyImg from "assets/images/bfy.png";
import dogIMg from "assets/images/dog.png";

export const GameSleigh = (props) => {
  const texture = new THREE.TextureLoader().load(forestMap);
  texture.encoding = THREE.sRGBEncoding;

  return (
    <div className="mx-auto h-screen">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera
            fov={80}
            aspect={window.innerWidth / window.innerHeight / 2}
            position={[0, 2, 3]}
            makeDefault
          />
          {/* {[...Array(10)].map((k, i) => {
            console.log(k, i);
            return (
              <LoadModel animationIndex={3} timeScale={4} position={i - 5} />
              );
            })} */}
          <LoadModel animationIndex={3} timeScale={10} position={0} />
          <ambientLight />
          <Environment background={true} map={texture} />
          {/* <OrbitControls /> */}
        </Suspense>
      </Canvas>
      <Loader />
      <div
        style={{
          position: "absolute",
          padding: "4vh 6vw 4vh 6vw ",
          top: "11px",
          fontSize: "6vh",
          background: "#D9D9D9",
          borderRadius: "1vw",
        }}
      >
        강아지
      </div>
      <img
        src={bfyImg}
        alt="#"
        style={{
          position: "absolute",
          top: "30vh",
          left: "18vw",
          width: `${
            window.innerHeight < window.innerWidth * 0.4 ? "50vh" : "20vw"
          }`,
          height: `${
            window.innerHeight < window.innerWidth * 0.4 ? "50vh" : "20vw"
          }`,
          borderRadius: "30%",
          border: "1px solid black",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
      />
      <img
        alt="#"
        style={{
          position: "absolute",
          top: "30vh",
          right: "18vw",
          width: `${
            window.innerHeight < window.innerWidth * 0.4 ? "50vh" : "20vw"
          }`,
          height: `${
            window.innerHeight < window.innerWidth * 0.4 ? "50vh" : "20vw"
          }`,
          borderRadius: "30%",
          border: "1px solid black",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
        src={dogIMg}
      />
      {/* <QuizBox />
      <QuizBox /> */}
    </div>
  );
};

GameSleigh.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameSleigh);
