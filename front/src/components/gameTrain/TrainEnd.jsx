import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";

export const TrainEnd = (props) => {
  return <div className="text-6xl">끝끝끝</div>;
};

TrainEnd.propTypes = {
  //   second: PropTypes.third
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TrainEnd);
