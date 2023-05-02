import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

export const Train = (props) => {
  return <div>Train</div>;
};

Train.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Train);
