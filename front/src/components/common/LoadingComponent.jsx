import React from "react";

const LoadingComponent = (props) => {
  return (
    <div
      className={`h-screen w-screen font-MaplestoryBold bg-mainBlue-200`}
    >
      <div className="w-96 h-36 absolute bottom-0 left-1/2 -ml-48">
        <div className="h-5 w-5 rounded-full bg-[#8cc759] absolute border-2 border-mainWhite animate-loadingBall animation-delay-500"></div>
        <div className="h-5 w-5 rounded-full bg-[#8c6daf] absolute border-2 border-mainWhite animate-loadingBall animation-delay-400"></div>
        <div className="h-5 w-5 rounded-full bg-[#ef5d74] absolute border-2 border-mainWhite animate-loadingBall animation-delay-300"></div>
        <div className="h-5 w-5 rounded-full bg-[#f9a74b] absolute border-2 border-mainWhite animate-loadingBall animation-delay-200"></div>
        <div className="h-5 w-5 rounded-full bg-[#60beeb] absolute border-2 border-mainWhite animate-loadingBall animation-delay-100"></div>
        <div className="h-5 w-5 rounded-full bg-[#fbef5a] absolute border-2 border-mainWhite animate-loadingBall animation-delay-none"></div>
        <div className="absolute w-full top-1/3 text-xl"><span>펭글이 양치하는 중</span><span className="">...</span></div>
      </div>

    </div>
  );
};

LoadingComponent.propTypes = {};

export default LoadingComponent;
