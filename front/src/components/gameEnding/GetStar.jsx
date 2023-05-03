import RewardStar from "components/gameEnding/RewardStar";
import React, { useEffect } from "react";
import { connect } from "react-redux";

export const GetStar = (props) => {
  const starLoop = () => {
    const newArr = [];
    for (let i = 0; i < 5; i++) {
      if (i < props.starCount) {
        newArr.push(
          <RewardStar key={i} color={i + 1} count={props.starCount} />
        );
      } else {
        newArr.push(<RewardStar key={i} color={0} count={props.starCount} />);
      }
    }
    return newArr;
  };
  useEffect(() => {
    setTimeout(() => props.closeGetStar(), 2000);
  }, [props]);
  return (
    <>
      <div className="relative w-screen h-screen bg-opacity-40 bg-mainGray-300"></div>
      <div className="bg-[#8977AD] w-[24rem] h-[4.5rem] absolute top-2/3 left-1/2 -translate-x-[12rem] rounded-3xl grid grid-cols-5 items-center justify-items-center">
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
