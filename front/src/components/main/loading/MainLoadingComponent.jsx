import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import snow from "assets/images/falling/snowflake.png";
import { connect } from "react-redux";

export const MainLoadingComponent = (props) => {
  const gif = [
    require("assets/images/penguel_swing.gif"),
    require("assets/images/penguel_hiphop.gif"),
    require("assets/images/penguel_chicken_dance.gif"),
  ];
  const [loadingGif, setLoadingGif] = useState("");
  useEffect(() => {
    const gifNum = Math.floor(Math.random() * 3);
    setLoadingGif(gif[gifNum]);
  }, []);

  return (
    <div className="h-full w-full bg-mainBlue-200">
      <div className="relative h-full w-full ">
        <div>
          <img className="absolute h-10 w-10" src={snow} alt="" />
          <img className="absolute h-10 w-10 left-[20%]" src={snow} alt="" />
          <img className="absolute h-10 w-10 left-[40%]" src={snow} alt="" />
          <img className="absolute h-10 w-10 left-[60%]" src={snow} alt="" />
          <img className="absolute h-10 w-10 left-[80%]" src={snow} alt="" />
          <img
            className="absolute h-10 w-10 left-[70%] top-[15%]"
            src={snow}
            alt=""
          />
          <img
            className="absolute h-10 w-10 left-[50%] top-[15%]"
            src={snow}
            alt=""
          />
          <img
            className="absolute h-10 w-10 left-[30%] top-[15%]"
            src={snow}
            alt=""
          />
          <img
            className="absolute h-10 w-10 left-[10%] top-[15%]"
            src={snow}
            alt=""
          />
          <img
            className="absolute h-10 w-10 left-[90%] top-[15%]"
            src={snow}
            alt=""
          />
          <img className="absolute h-10 w-10  bottom-0" src={snow} alt="" />
          <img
            className="absolute h-10 w-10 left-[20%]  bottom-0"
            src={snow}
            alt=""
          />
          <img
            className="absolute h-10 w-10 left-[40%] bottom-0"
            src={snow}
            alt=""
          />
          <img
            className="absolute h-10 w-10 left-[60%] bottom-0"
            src={snow}
            alt=""
          />
          <img
            className="absolute h-10 w-10 left-[80%] bottom-0"
            src={snow}
            alt=""
          />
          <img
            className="absolute h-10 w-10 left-[70%]  bottom-[15%]"
            src={snow}
            alt=""
          />
          <img
            className="absolute h-10 w-10 left-[50%]  bottom-[15%]"
            src={snow}
            alt=""
          />
          <img
            className="absolute h-10 w-10 left-[30%]  bottom-[15%]"
            src={snow}
            alt=""
          />
          <img
            className="absolute h-10 w-10 left-[10%]  bottom-[15%]"
            src={snow}
            alt=""
          />
          <img
            className="absolute h-10 w-10 left-[90%] bottom-[15%]"
            src={snow}
            alt=""
          />
        </div>
        <div className=" w-full absolute top-[28%]">
          <p className="font-MaplestoryBold absolute left-[20%] text-7xl">
            우리
          </p>
          <p className="font-MaplestoryBold absolute left-[20%] text-7xl text-red animate-pulse">
            우
          </p>
          <p className="font-MaplestoryBold absolute left-[45%] text-7xl">
            아이
          </p>
          <p className="font-MaplestoryBold absolute left-[45%] text-7xl text-mainYellow-500 animate-pulse">
            아
          </p>
          <p className="font-MaplestoryBold absolute left-[70%] text-7xl">
            한글
          </p>
          <p className="font-MaplestoryBold absolute left-[70%] text-7xl text-mainBlue-500 animate-pulse">
            한
          </p>
        </div>
        <div className="absolute left-[23%] top-[20%] h-5 w-5 animate-ballBounce rounded-full  bg-red"></div>
        <div className="absolute left-[48%] top-[20%] h-5 w-5 animate-ballBounce rounded-full bg-mainYellow-400"></div>
        <div className="absolute left-[73%] top-[20%] h-5 w-5 animate-ballBounce rounded-full bg-mainBlue-600"></div>
        <div className="absolute -bottom-6 w-1/2 left-1/4">
          <img src={loadingGif} alt="" />
        </div>
      </div>
    </div>
  );
};

MainLoadingComponent.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainLoadingComponent);
