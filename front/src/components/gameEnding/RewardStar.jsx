// import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FaStar } from "react-icons/fa";

export const RewardStar = (props) => {
  const [size, setSize] = useState("2rem");
  const [color, setColor] = useState("#FFFFFF");
  const [styleStr, setStyleStr] = useState({});
  useEffect(() => {
    if (props.color === props.count && props.color !== 0) {
      setTimeout(() => {
        setStyleStr({
          transition: `.4s`,
          transformStyle: `preserve-3d`,
          transform: `rotateY(360deg)`,
        });
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
      }, 500);
    } else {
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
    }
  }, [props]);

  return (
    <div className="grid content-center bg-[#6937A1] rounded-full h-[3.5rem] w-[3.5rem] justify-center">
      <FaStar size={size} color={color} className="icon" style={styleStr} />
    </div>
  );
};

RewardStar.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RewardStar);
