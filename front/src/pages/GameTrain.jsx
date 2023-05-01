import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import TrainStart from "components/gameTrain/TrainStart";

export const GameTrain = (props) => {
  return (
    <div className="fixed bg-[url('assets/images/tmp/background-desert.jpg')] bg-cover bg-no-repeat h-screen w-screen">
      <TrainStart />
    </div>
  );
};

GameTrain.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameTrain);
