import { Edges, Image, Wireframe } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

export const QuizCard = (props) => {
  const imgRef = useRef();

  const x = 0;
  const y = 0;
  const width = 1;
  const height = 1;
  const radius = 0.25;

  const shape = new THREE.Shape();
  shape.lineTo(x, y + height - radius);
  shape.quadraticCurveTo(x, y + height, x + radius, y + height);
  shape.lineTo(x + width - radius, y + height);
  shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  shape.lineTo(x + width, y + radius);
  shape.quadraticCurveTo(x + width, y, x + width - radius, y);
  shape.lineTo(x + radius, y);
  shape.quadraticCurveTo(x, y, x, y + radius);

  const geometry = new THREE.ShapeGeometry(shape);

  const texture = new THREE.TextureLoader().load(props.quizData.url);
  texture.encoding = THREE.sRGBEncoding;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.LinearMipMapLinearFilter;

  const [down, setDown] = useState(true);

  useFrame(({ clock }, delta) => {
    if (down) {
      imgRef.current.position.y -= delta * 5;
      if (imgRef.current.position.y < 0) {
        setDown(false);
        if (props.setQuizStatus) props.setQuizStatus("stop");
      }
    } else {
      imgRef.current.position.y = Math.sin(clock.getElapsedTime() * 4) * 0.03;
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
        <meshStandardMaterial attach="material" map={texture} />
        {/* <Edges /> */}
      </mesh>
    </group>
  );
};

export default QuizCard;
