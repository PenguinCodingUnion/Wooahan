import React, { useState } from "react";
import { connect } from "react-redux";
import RewardCard from "./RewardCard";
import SelectedCard from "./SelectedCard";

export const PickCard = (props) => {
  const [isPickedCardrOpen, setIsPickedCardrOpen] = useState(false);

  const cardLoop = () => {
    const newArr = [];
    for (let i = 0; i < 6; i++) {
      newArr.push(
        <RewardCard
          key={i}
          openPickedCard={openPickedCard}
          isCardOpened={isPickedCardrOpen}
          name={props.cardName}
        />
      );
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
        {cardLoop()}
      </div>
      {isPickedCardrOpen && (
        <div>
          <SelectedCard
            name={props.cardName}
            image={props.cardImg}
            closeCard={closePickedCard}
          />
        </div>
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
