import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

const FollowCamera = ({
  target,
  distance = 120,
  height = 55,
  viewFace = 0,
}) => {
  const cameraRef = useRef();
  const { invalidate } = useThree();

  useEffect(() => {
    if (cameraRef.current) invalidate();
  }, [invalidate, cameraRef]);

  useFrame(() => {
    if (!target.current || !cameraRef.current) return;

    const newPosition = target.current.position.clone();
    newPosition.y += height;
    newPosition.z += distance;
    newPosition.x += viewFace;

    cameraRef.current.position.lerp(newPosition, 0.1);
    cameraRef.current.lookAt(target.current.position);
    cameraRef.current.updateProjectionMatrix();
  });

  return <OrthographicCamera ref={cameraRef} fov={60} makeDefault={true} />;
};

FollowCamera.propTypes = {
  target: PropTypes.object.isRequired,
  distance: PropTypes.number,
  height: PropTypes.number,
  viewFace: PropTypes.number,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FollowCamera);
