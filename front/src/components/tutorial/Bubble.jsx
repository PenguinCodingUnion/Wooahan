import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

export const Bubble = (props) => {
  return <div>Bubble</div>;
};

Bubble.propTypes = {
  // second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Bubble);
