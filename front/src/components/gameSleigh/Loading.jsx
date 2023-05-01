import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

export const Loading = (props) => {
  return <div>Loading</div>;
};

Loading.propTypes = {
  //   second: PropTypes.third
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
