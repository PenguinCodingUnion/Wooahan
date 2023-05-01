import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const Main = (props) => {
  return (
    <div>
      <h1>Main페이지</h1>
      <Link to={"jump"}>고 짬프</Link>
      <br />
      <Link to={"sleigh"}>고 썰매</Link>
      <br />
      <Link to={"bubble"}>고 버블</Link>
      <br />
    </div>
  );
};

Main.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
