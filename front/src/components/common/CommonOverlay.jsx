import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

const OVERLAY_CLASS = `absolute top-0 left-0 h-full w-full bg-mainSlate-900/50`;
const CommonOverlay = ({ children, ...props }) => {
  const el = useRef(document.getElementById("overlay"));
  el.current.className = `fixed top-0 left-0 w-full h-full `;

  useEffect(() => {
    return () => {
      el.current.className = `none`;
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={OVERLAY_CLASS}>{children}</div>,
    el.current
  );
};

CommonOverlay.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CommonOverlay;
