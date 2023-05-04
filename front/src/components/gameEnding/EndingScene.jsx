// import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";

export const EndingScene = (props) => {
  useEffect(() => {
    setTimeout(() => props.closeEndingScene(), 2000);
  }, [props]);
  return (
    <>
      <div className="text-[#6937A1] font-MaplestoryBold text-6xl text-stroke-mainWhite text-stroke-2">
        야호!
      </div>
    </>
  );
};

EndingScene.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EndingScene);
