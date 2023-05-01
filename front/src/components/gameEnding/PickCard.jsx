import RewardCard from "components/common/RewardCard";
import AnswerCard from "components/gameBubble/AnswerCard";
import React, { useState } from "react";
import { connect } from "react-redux";

export const PickCard = (props) => {
  const [isPickedCardrOpen, setIsPickedCardrOpen] = useState(false);

  const starLoop = () => {
    const newArr = [];
    for (let i = 0; i < 6; i++) {
      newArr.push(<RewardCard key={i} openPickedCard={openPickedCard} />);
    }
    return newArr;
  };

  const openPickedCard = () => {
    setIsPickedCardrOpen(true);
  };

  const closePickedCard = () => {
    setTimeout(() => {
      props.closePickCard();
      setIsPickedCardrOpen(false);
    }, 1500);
  };

  return (
    <>
      <div className="absolute w-screen h-screen bg-opacity-40 bg-mainGray-300"></div>
      <div className="absolute grid items-center w-2/3 grid-cols-3 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-2/3 justify-items-center">
        {starLoop()}
      </div>
      {isPickedCardrOpen && (
        <AnswerCard
          name={props.cardName}
          image={props.cardImg}
          closeCard={closePickedCard}
        />
      )}
    </>
  );
};

PickCard.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PickCard);
