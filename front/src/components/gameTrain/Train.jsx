import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import TrainLastWord from "./TrainLastWord";
import TrainWordCard from "./TrainWordCard";
import { Navigate } from "react-router-dom";

export const Train = (props) => {
  const [round, setRound] = useState(0);
  const [end, setEnd] = useState(false);
  const nextGame = () => {
    if (round === 2) {
      setEnd(true);
      return;
    }
    setRound(round + 1);
  };
  return (
    <div className="h-screen">
      <div className=" h-[13rem]"></div>
      {!end && <TrainLastWord data={props.data[round].last} />}
      {!end && <TrainWordCard data={props.data[round]} nextGame={nextGame} />}
      {end && <Navigate to={`/ending`} />}
    </div>
  );
};

Train.propTypes = {
  // second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Train);
