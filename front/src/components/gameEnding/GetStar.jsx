import RewardStar from "components/common/RewardStar";
import React, { useEffect } from "react";
import { connect } from "react-redux";

export const GetStar = (props) => {
  const starLoop = () => {
    const newArr = [];
    for (let i = 0; i < 5; i++) {
      if (i < props.starCount) {
        newArr.push(<RewardStar key={i} color={i + 1} />);
      } else {
        newArr.push(<RewardStar key={i} color={0} />);
      }
    }
    return newArr;
  };
  useEffect(() => {
    setTimeout(() => props.closeGetStar(), 1500);
  }, [props]);
  return (
    <>
      <div className="absolute w-screen h-screen bg-opacity-40 bg-mainGray-300"></div>
      <div className="bg-[#8977AD] w-[24rem] h-[4rem] absolute top-2/3 left-1/2 -translate-x-[12rem] rounded-3xl grid grid-cols-5 items-center justify-items-center">
        {starLoop()}
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
