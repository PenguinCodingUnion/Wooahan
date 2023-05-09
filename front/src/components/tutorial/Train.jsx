import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import train1 from "assets/images/tutorials/train1.png";

export const Train = (props) => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div>
        <div className="rounded-full left-1/2 bottom-0 absolute h-48 w-48 shadow-[0_-1000px_0_1000px_rgba(169,169,169,0.4)]">
          <div className="rounded-full mx-auto m-12 h-24 w-24 bg-mainRed-200 animate-ping"></div>
        </div>
        <div className=" absolute top-6 flex w-full ">
          <div className="bg-white rounded-md px-5 py-2 border mx-auto font-netmarbleB text-3xl ">
            <p className="whitespace-nowrap">
              끝 글자와 맞는 단어를 선택해주세요
            </p>
          </div>
          <div className=" bg-mint w-28 h-12 mr-6 font-MaplestoryBold text-2xl leading-[3rem]">
            <p>다음</p>
          </div>
        </div>
      </div>

      <div className="grid justify-center h-screen items-center ">
        <img className="" src={train1} alt="기차설명1" />
      </div>
    </div>
  );
};

Train.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Train);
