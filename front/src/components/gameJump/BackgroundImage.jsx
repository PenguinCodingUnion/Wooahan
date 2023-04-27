import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { TextureLoader, sRGBEncoding } from "three";
import { Environment } from "@react-three/drei";

const BackgroundImage = ({ imagePath }) => {
  // useEffect(() => {
  const loader = new TextureLoader();

  const texture = loader.load(imagePath, (texture) => {
    texture.encoding = sRGBEncoding;
    // scene.background = texture;
    return texture;
  });

  // return () => {
  //   scene.background = null;
  // };
  // }, [imagePath, scene]);

  return <Environment background={true} map={texture} />;
};

BackgroundImage.propTypes = {
  imagePath: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundImage);
