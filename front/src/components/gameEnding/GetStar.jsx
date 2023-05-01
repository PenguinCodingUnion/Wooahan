import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

export const GetStar = (props) => {
  return (
    <>
      <div className="bg-white w-[24rem] h-[4rem] absolute top-2/3 left-1/2 -translate-x-[12rem] rounded-3xl">
        {props.starCount}
      </div>
    </>
  );
};

GetStar.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GetStar);
