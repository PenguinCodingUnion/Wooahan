import React from "react";
import { connect } from "react-redux";

export const TutorialMain = (props) => {
  return (
    <div className="flex items-center justify-center w-1/4 h-full pt-2 mx-auto mt-5">
      <div className="w-1/3 h-full font-MaplestoryBold font-extrabold text-5xl text-[#FFD600] text-stroke-2 text-stroke-mainBlack">
        우
      </div>
      <div className="w-1/3 h-full font-MaplestoryBold text-5xl text-[#FFD600] text-stroke-2 text-stroke-mainBlack">
        아
      </div>
      <div className="w-1/3 h-full font-MaplestoryBold text-5xl text-[#FFD600] text-stroke-2 text-stroke-mainBlack">
        한
      </div>
    </div>
  );
};

TutorialMain.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TutorialMain);
