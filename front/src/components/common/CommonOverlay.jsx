import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

const OVERLAY_CLASS = `fixed top-0 left-0 h-full w-full`;
const CommonOverlay = ({ children, type = `overlay`, ...props }) => {
  const el = useRef(document.getElementById("overlay"));
  // el.current.className = `fixed top-0 left-0 w-full h-full `;

  const bgColor = () => {
    switch (type) {
      case "overlay":
        return "bg-mainSlate-900/50";

      case "parent":
        return "bg-parent";

      default:
        break;
    }
  };

  // useEffect(() => {
  //   return () => {
  //     el.current.className = `none`;
  //   };
  // }, []);

  return ReactDOM.createPortal(
    <div className={`${OVERLAY_CLASS} ${bgColor()}`}>{children}</div>,
    el.current
  );
};

CommonOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};

export default CommonOverlay;
