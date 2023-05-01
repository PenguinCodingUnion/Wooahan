import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

export const QuizBox = (props) => {
  return <div>QuizBox</div>;
};

QuizBox.propTypes = {
  //   second: PropTypes.third
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(QuizBox);
