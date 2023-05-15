import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import snow from "assets/images/loading/snow.png";
import { connect } from "react-redux";

import pengul_swing from "assets/images/penguel_swing.gif";
import pengul_hiphop from "assets/images/penguel_hiphop.gif";
import pengul_chicken from "assets/images/penguel_chicken_dance.gif";

export const MainLoadingComponent = (props) => {
  const gif = [pengul_swing, pengul_hiphop, pengul_chicken];
  const [loadingGif, setLoadingGif] = useState("");
  useEffect(() => {
    const gifNum = Math.floor(Math.random() * 3);
    setLoadingGif(gif[gifNum]);
  }, []);

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="relative bg-mainYellow-200 h-full w-full ">
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
          <p className="font-MaplestoryBold absolute left-[17%] text-7xl">
            우리
          </p>
          <p className="font-MaplestoryBold absolute left-[17%] text-7xl text-red animate-pulse">
            우
          </p>
          <p className="font-MaplestoryBold absolute left-[42%] text-7xl">
            아이
          </p>
          <p className="font-MaplestoryBold absolute left-[42%] text-7xl text-mainBlue-500 animate-pulse">
            아
          </p>
          <p className="font-MaplestoryBold absolute left-[67%] text-7xl">
            한글
          </p>
          <p className="font-MaplestoryBold absolute left-[67%] text-7xl text-mainGreen-500 animate-pulse">
            한
          </p>
        </div>
        <div className="absolute left-[20%] top-[20%] h-5 w-5 animate-ballBounce rounded-full  bg-red"></div>
        <div className="absolute left-[45%] top-[20%] h-5 w-5 animate-ballBounce rounded-full bg-mainBlue-500"></div>
        <div className="absolute left-[70%] top-[20%] h-5 w-5 animate-ballBounce rounded-full bg-mainGreen-600"></div>
        <div className="absolute -bottom-3 w-1/2 left-[25%]">
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
