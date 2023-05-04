import React, { useState } from "react";
import { connect } from "react-redux";

export const RewardCard = (props) => {
  const [styleStr, setStyleStr] = useState({
    transition: `.4s`,
    transformStyle: `preserve-3d`,
  });
  const rotateCard = () => {
    if (props.isCardOpened) {
      return;
    }
    setStyleStr({
      transition: `.4s`,
      transformStyle: `preserve-3d`,
      transform: `rotateY(180deg)`,
    });
    setTimeout(() => {
      props.openPickedCard();
    }, 500);
  };

  return (
    <div
      className="relative grid items-center justify-items-center "
      style={styleStr}
      onClick={rotateCard}
    >
      <div
        className="absolute w-[10rem] h-[6rem] bg-[#964b00] border-4 border-[#c68a12] rounded-lg  justify-items-center items-center grid"
        style={{
          backfaceVisibility: `hidden`,
        }}
      >
        <p className="text-2xl text-mainWhite font-MaplestoryBold">우아한</p>
      </div>
      <div
        className="absolute w-[10rem] h-[6rem] bg-mainWhite border-4 border-[#c68a12] rounded-lg justify-items-center items-center grid"
        style={{
          transform: `rotateY(180deg)`,
          backfaceVisibility: `hidden`,
        }}
      >
        <p className="text-2xl text-mainBlack font-MaplestoryBold">
          {props.name}
        </p>
      </div>
    </div>
  );
};

RewardCard.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RewardCard);
