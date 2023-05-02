// import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FaStar } from "react-icons/fa";

export const RewardStar = (props) => {
  const [size, setSize] = useState("2rem");
  const [color, setColor] = useState("#FFFFFF");

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line default-case
      switch (props.color) {
        case 1:
          setColor("#FF0000");
          setSize("3rem");
          break;
        case 2:
          setColor("#FF8C00");
          setSize("3rem");
          break;
        case 3:
          setColor("#FFFF00");
          setSize("3rem");
          break;
        case 4:
          setColor("#81c147");
          setSize("3rem");
          break;
        case 5:
          setColor("#40a0ff");
          setSize("3rem");
          break;
      }
    }, props.color * 250);
  }, [props]);

  return (
    <div className="grid content-center bg-[#6937A1] rounded-full h-[3.5rem] w-[3.5rem] justify-center">
      {/* <div className={classStr}></div> */}
      <FaStar
        size={size}
        color={color}
        // style={{ stroke: "white", strokeWidth: "2rem" }}
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
