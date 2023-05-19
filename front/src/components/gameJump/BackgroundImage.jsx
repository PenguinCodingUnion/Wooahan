import { connect } from "react-redux";
import PropTypes from "prop-types";
import { TextureLoader, sRGBEncoding } from "three";
import { Environment } from "@react-three/drei";

const BackgroundImage = ({ imagePath }) => {
  const loader = new TextureLoader();

  const texture = loader.load(imagePath, (texture) => {
    texture.encoding = sRGBEncoding;
    return texture;
  });

  return <Environment background={true} map={texture} />;
};

BackgroundImage.propTypes = {
  imagePath: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundImage);
