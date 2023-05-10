import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

export const Jump = (props) => {
  return <div>Jump</div>;
};

Jump.propTypes = {
  // second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Jump);
