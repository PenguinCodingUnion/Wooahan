import React, { useState } from "react";
import { connect } from "react-redux";
import BackgroundImageOnLoad from "background-image-on-load";

export const QuizCard = (props) => {
  const [imageLoadState, setImageLoadState] = useState(false);
  return (
    <div
      className={`${
        imageLoadState ? "animate-scale-up-center" : "hidden"
      } absolute w-64 h-64 -mt-32 -ml-32 border-4 border-mainBlack bg-mainWhite rounded-3xl top-1/2 left-1/2`}
      style={{
        backgroundImage: `url(${props.image})`,
        backgroundSize: "16rem 16rem",
        width: "16rem",
        backgroundRepeat: "no-repeat",
      }}
    >
      <BackgroundImageOnLoad
        src={`${props.image}`}
        onLoadBg={() => setImageLoadState(true)}
      />
    </div>
  );
};

QuizCard.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(QuizCard);
