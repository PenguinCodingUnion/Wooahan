import Bubble from "components/tutorial/Bubble";
import Jump from "components/tutorial/Jump";
import Sleigh from "components/tutorial/Sleigh";
import Train from "components/tutorial/Train";
import React, { useState } from "react";
import { connect } from "react-redux";
import TutorialMain from "components/tutorial/TutorialMain";

export const Tutirial = (props) => {
  const [page, setPage] = useState(<TutorialMain />);
  const goLink = (prop) => {
    switch (prop) {
      case 1:
        setPage(<Jump />);
        break;
      case 2:
        setPage(<Sleigh />);
        break;
      case 3:
        setPage(<Train />);
        break;
      case 4:
        setPage(<Bubble />);
        break;
      default:
    }
  };
  return (
    <div>
      <div className="bg-mainRed-400 grid grid-cols-5 overflow-hidden">
        <div className=" grid grid-rows-4 items-center content-between w-48 h-screen left-0 ">
          <div
            className="bg-mainBlue-400 w-48 h-[6rem] pr-6 rounded-3xl"
            onClick={() => {
              goLink(1);
            }}
          >
            <p className="font-MaplestoryBold text-3xl leading-[6rem] ">
              뛰어쓰기
            </p>
          </div>
          <div
            className="bg-mainBlue-400 top-32 w-48 h-[6rem] pr-6 rounded-3xl"
            onClick={() => {
              goLink(2);
            }}
          >
            <p className="font-MaplestoryBold text-3xl leading-[6rem] ">
              펭글썰매
            </p>
          </div>
          <div
            className="bg-mainBlue-400 top-32 w-48 h-[6rem] pr-6 rounded-3xl"
            onClick={() => {
              goLink(3);
            }}
          >
            <p className="font-MaplestoryBold text-3xl leading-[6rem] ">
              끝말기차
            </p>
          </div>
          <div
            className="bg-mainBlue-400 top-32 w-48 h-[6rem] pr-6 rounded-3xl"
            onClick={() => {
              goLink(4);
            }}
          >
            <p className="font-MaplestoryBold text-3xl leading-[6rem] ">
              한글방울
            </p>
          </div>
        </div>
        <div className="bg-mainPurple-300 col-span-4 rounded-xl">{page}</div>
      </div>
    </div>
  );
};

Tutirial.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Tutirial);
