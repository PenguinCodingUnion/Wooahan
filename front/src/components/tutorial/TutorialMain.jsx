import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

export const TutorialMain = (props) => {
  return <div>TutorialMain</div>;
};

TutorialMain.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TutorialMain);
