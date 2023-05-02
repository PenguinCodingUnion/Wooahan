import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

export const Sleigh = (props) => {
  return <div>Sleigh</div>;
};

Sleigh.propTypes = {
  // second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Sleigh);
