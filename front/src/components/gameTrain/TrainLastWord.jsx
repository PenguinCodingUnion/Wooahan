import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import cloud from "assets/images/tmp/cloud1.png";

export const TrainLastWord = (props) => {
  return (
    <div className=" absolute w-[17rem] h-[10rem] top-2 right-2/4 text-stroke-mainRed-900 text-stroke-4 text-[#FF0037]  text-[6rem] font-MaplestoryBold ">
      <p className="bg-main absolute  w-[17rem]  h-[10rem] leading-[11rem] text-center ">
        {props.data}
      </p>
      <img className="" src={cloud} alt="could3" />
    </div>
  );
};

TrainLastWord.propTypes = {
  // eslint-disable-next-line react/no-typos
  // second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TrainLastWord);
