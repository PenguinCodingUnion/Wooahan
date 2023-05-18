import { Edges } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export const QuizCard = (props) => {
  const imgRef = useRef();

  // const [texture, setTexture] = useState(
  //   new THREE.TextureLoader().load(props.quiz.word.imgUrl)
  // );
  const [shape, setShape] = useState(new THREE.Shape());
  const [geometry, setGeometry] = useState(new THREE.ShapeGeometry(shape));

  useEffect(() => {
    setGeometry(new THREE.ShapeGeometry(shape));
  }, [shape]);

  const x = 0;
  const y = 0;
  const width = 1;
  const height = 1;
  const radius = 0.25;

  shape.lineTo(x, y + height - radius);
  shape.quadraticCurveTo(x, y + height, x + radius, y + height);
  shape.lineTo(x + width - radius, y + height);
  shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  shape.lineTo(x + width, y + radius);
  shape.quadraticCurveTo(x + width, y, x + width - radius, y);
  shape.lineTo(x + radius, y);
  shape.quadraticCurveTo(x, y, x, y + radius);

  // texture.encoding = THREE.sRGBEncoding;
  // texture.magFilter = THREE.NearestFilter;
  // texture.minFilter = THREE.LinearMipMapLinearFilter;

  const [down, setDown] = useState(true);

  useFrame(({ clock }, delta) => {
    imgRef.current.visible = false;

    if (down) {
      imgRef.current.position.y -= delta * 5;
      if (imgRef.current.position.y < 0) {
        setDown(false);
        if (props.setQuizStatus) props.setQuizStatus("stop");
      }
    } else {
      // imgRef.current.position.y = Math.sin(clock.getElapsedTime() * 4) * 0.03;
    }
  });

  return (
    <group>
      <mesh
        ref={imgRef}
        geometry={geometry}
        scale={props.quizScale}
        position={[
          props.side === "left" ? -props.quizScale * 2 : props.quizScale,
          4,
          -1,
        ]}
      >
        {/* <meshStandardMaterial attach="material" map={texture} /> */}
        <meshStandardMaterial attach="material" />
        <Edges />
      </mesh>
    </group>
  );
};

export default QuizCard;
