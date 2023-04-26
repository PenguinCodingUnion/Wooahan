import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { TextureLoader, sRGBEncoding } from "three";

const BackgroundImage = ({ imagePath }) => {
  const { scene } = useThree();

  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(imagePath, (texture) => {
      texture.encoding = sRGBEncoding;
      scene.background = texture;
    });

    return () => {
      scene.background = null;
    };
  }, [imagePath, scene]);

  return null;
};

BackgroundImage.propTypes = {
  imagePath: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundImage);
