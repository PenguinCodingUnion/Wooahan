import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const OVERLAY_CLASS = `absolute h-full w-full mix-blend-multiply bg-mainSlate-900/50`;
const CommonOverlay = ({ children, ...props }) => {
  const el = useRef(document.createElement("div"));
  el.current.className = `fixed top-0 left-0 w-full h-full`;

  useEffect(() => {
    document.body.appendChild(el.current);

    return () => {
      document.body.removeChild(el.current);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={OVERLAY_CLASS}>{children}</div>,
    el.current
  );
};

export default CommonOverlay;
