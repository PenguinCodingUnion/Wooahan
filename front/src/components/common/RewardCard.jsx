import React from "react";
import { connect } from "react-redux";

export const RewardCard = (props) => {
  return (
    <div
      className="w-[10rem] h-[6rem] bg-[#964b00] border-4 border-[#c68a12] rounded-lg grid justify-items-center items-center"
      onClick={props.openPickedCard}
    >
      <p className="text-2xl text-mainWhite font-MaplestoryBold">우아한</p>
    </div>
  );
};

RewardCard.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RewardCard);
