// import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

export const RewardStar = (props) => {
  const [color, setColor] = useState("bg-mainTransparent");

  useEffect(() => {
    // eslint-disable-next-line default-case
    switch (props.color) {
      case 1:
        setColor("bg-[#FF0000]");
        break;
      case 2:
        setColor("bg-[#FF8C00]");
        break;
      case 3:
        setColor("bg-[#FFFF00]");
        break;
      case 4:
        setColor("bg-[#008000]");
        break;
      case 5:
        setColor("bg-[#0000FF]");
        break;
    }
  }, [props]);
  const classStr = classNames("border h-[2rem] w-[2rem] rounded-full", color);

  return (
    <div className="grid items-center justify-items-center bg-white rounded-full h-[3rem] w-[3rem]">
      <div className={classStr}></div>
    </div>
  );
};

RewardStar.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RewardStar);
