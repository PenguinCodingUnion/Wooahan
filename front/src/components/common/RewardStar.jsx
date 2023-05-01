// import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FaStar } from "react-icons/fa";

export const RewardStar = (props) => {
  const [color, setColor] = useState("#FFFFFF");

  useEffect(() => {
    // eslint-disable-next-line default-case
    switch (props.color) {
      case 1:
        setColor("#FF0000");
        break;
      case 2:
        setColor("#FF8C00");
        break;
      case 3:
        setColor("#FFFF00");
        break;
      case 4:
        setColor("#008000");
        break;
      case 5:
        setColor("#0000FF");
        break;
    }
  }, [props]);

  return (
    <div className="grid items-center justify-items-center bg-[#6937A1] rounded-full h-[3rem] w-[3rem]">
      {/* <div className={classStr}></div> */}
      <FaStar
        size="2rem"
        color={color}
        style={{ stroke: "black", strokeWidth: "5" }}
        className="icon"
      />
    </div>
  );
};

RewardStar.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RewardStar);
