import Bubble from "components/tutorial/Bubble";
import Jump from "components/tutorial/Jump";
import Sleigh from "components/tutorial/Sleigh";
import Train from "components/tutorial/Train";
import React, { useState } from "react";
import { connect } from "react-redux";
import TutorialMain from "components/tutorial/TutorialMain";

export const Tutirial = (props) => {
  const [page, setPage] = useState(<TutorialMain />);
  const [css1, setCss1] = useState(
    "bg-mainBlue-100 w-48 h-full pr-6 rounded-3xl"
  );
  const [css2, setCss2] = useState(
    "bg-mainBlue-100 w-48 h-full pr-6 rounded-3xl"
  );
  const [css3, setCss3] = useState(
    "bg-mainBlue-100 w-48 h-full pr-6 rounded-3xl"
  );
  const [css4, setCss4] = useState(
    "bg-mainBlue-100 w-48 h-full pr-6 rounded-3xl"
  );

  const goLink = (prop) => {
    switch (prop) {
      case 1:
        setCss1("bg-mainBlue-300 w-48 h-full pr-6 rounded-3xl");
        setCss2("bg-mainBlue-100 w-48 h-full pr-6 rounded-3xl");
        setCss3("bg-mainBlue-100 w-48 h-full pr-6 rounded-3xl");
        setCss4("bg-mainBlue-100 w-48 h-full pr-6 rounded-3xl");
        setPage(<Jump />);
        break;
      case 2:
        setCss1("bg-mainBlue-100 w-48 h-full pr-6 rounded-3xl");
        setCss2("bg-mainBlue-300 w-48 h-full pr-6 rounded-3xl");
        setCss3("bg-mainBlue-100 w-48 h-full pr-6 rounded-3xl");
        setCss4("bg-mainBlue-100 w-48 h-full pr-6 rounded-3xl");
        setPage(<Sleigh />);
        break;
      case 3:
        setCss1("bg-mainBlue-100 w-48 h-full pr-6 rounded-3xl");
        setCss2("bg-mainBlue-100 w-48 h-full pr-6 rounded-3xl");
        setCss3("bg-mainBlue-300 w-48 h-full pr-6 rounded-3xl");
        setCss4("bg-mainBlue-100 w-48 h-full pr-6 rounded-3xl");
        setPage(<Bubble />);
        break;
      case 4:
        setCss1("bg-mainBlue-100 w-48 h-full pr-6 rounded-3xl");
        setCss2("bg-mainBlue-100 w-48 h-full pr-6 rounded-3xl");
        setCss3("bg-mainBlue-100 w-48 h-full pr-6 rounded-3xl");
        setCss4("bg-mainBlue-300 w-48 h-full pr-6 rounded-3xl");
        setPage(<Train />);
        break;
      default:
    }
  };
  return (
    <div>
      <div className="bg-mainYellow-200 grid grid-cols-5 overflow-hidden">
        <div className=" grid grid-rows-4 items-center content-between w-48 h-screen left-0 ">
          <div
            className={css1}
            onClick={() => {
              goLink(1);
            }}
          >
            <p className="font-MaplestoryBold text-3xl leading-[6rem] ">
              뛰어쓰기
            </p>
          </div>
          <div
            className={css2}
            onClick={() => {
              goLink(2);
            }}
          >
            <p className="font-MaplestoryBold text-3xl leading-[6rem] ">
              펭글썰매
            </p>
          </div>
          <div
            className={css3}
            onClick={() => {
              goLink(3);
            }}
          >
            <p className="font-MaplestoryBold text-3xl leading-[6rem] ">
              한글방울
            </p>
          </div>
          <div
            className={css4}
            onClick={() => {
              goLink(4);
            }}
          >
            <p className="font-MaplestoryBold text-3xl leading-[6rem] ">
              끝말기차
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
