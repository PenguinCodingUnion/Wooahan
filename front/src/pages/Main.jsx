import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

export const Main = (props) => {
  return (
    <div>
      <h1>Main</h1>
      <Link to={"jump"}>고 짬프</Link>
      <Link to={"sleigh"}>고 썰매</Link>
    </div>
  );
};

Main.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Main)