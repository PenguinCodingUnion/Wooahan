// import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FaStar } from "react-icons/fa";

import star from "assets/sounds/star.wav";
import effectSound from "util/effectSound";

export const RewardStar = (props) => {
  const [size, setSize] = useState("2rem");
  const [color, setColor] = useState("#FFFFFF");
  const [styleStr, setStyleStr] = useState({});
  const [jumpGif, setJumpGif] = useState("");
  const [styleGif, setStyleGif] = useState("");

  const es_star = effectSound(star, 1);

  const gifModels = [
    require("assets/images/penguel_high_jump.gif"),
    require("assets/images/fox_walk_right.gif"),
  ];

  const gifStyles = [
    "absolute -bottom-[200%] w-[20rem] -ml-[8rem]",
    "absolute -top-[200%] w-[20rem] -ml-[8rem]"
  ]

  useEffect(() => {
    if (props.color === props.count && props.color !== 0) {
      es_star.play();
      if (props.model === "penguin") {
        setJumpGif(gifModels[0]);
        setStyleGif(gifStyles[0]);
      } else {
        setJumpGif(gifModels[1]);
        setStyleGif(gifStyles[1]);
      }
      setTimeout(() => {
        setStyleStr({
          transition: `1.6s`,
          transformStyle: `preserve-3d`,
          transform: `rotateY(-360deg)`,
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
      <FaStar size={size} color={color} className="" style={styleStr} />
      <img
        className={styleGif}
        src={jumpGif}
        alt=""
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
