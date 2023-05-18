import React from "react";
import { useNavigate } from "react-router-dom";
import pengul_falldown from "assets/images/penguel_falldown.webp";

const ErrorPage = () => {
  const navigation = useNavigate();
  return (
    <div className="absolute top-0 items-center justify-center w-screen h-screen text-center bg-mainRose-200">
      <img className="absolute w-1/3 left-1/3" src={pengul_falldown} alt="" />
      <div className="font-MaplestoryBold text-[4vw] mt-[25%]">
        펭글이가 아파요
        <div className="relative inline-block">
          <span className="overflow-x-hidden whitespace-nowrap">
            &nbsp;. . .
          </span>
          <span className="absolute top-0 left-0 w-full h-full bg-mainRose-200 animate-typing"></span>
        </div>
      </div>
      <button
        className="bg-white bg-opacity-90 shadow-xl rounded-lg w-24 h-12 font-MaplestoryBold text-2xl leading-[3rem] mt-5"
        onClick={() => {
          navigation("/");
        }}
      >
        홈으로
      </button>
    </div>
  );
};

export default ErrorPage;
