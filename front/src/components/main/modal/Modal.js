import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "store/features/mainCard/modalSlice";

import ModalHeader from "./ModalHeader";
import Level from "./Level";
import Login from "./Login";
import OpenSourceLicenses from "./OpenSourceLicenses";

const Overlay = (props) => {
  const dispatch = useDispatch();

  const modalCloseHandler = () => {
    dispatch(modalActions.closeModal());
  };

  return (
    <div
      onClick={modalCloseHandler}
      className={`absolute ${
        props.currentPage === "main" ? "w-[100%]" : "w-[200%]"
      } h-screen z-40 bg-tranparent`}
    ></div>
  );
};

const ModalOverlay = (props) => {
  const [title, setTitle] = useState("설정");
  const [OSLOpen, setOSLOpen] = useState(false);

  const openOSLHandler = () => {
    setTitle("Open Source Licences");
    setOSLOpen(true);
  };

  return (
    <div
      className={`flex flex-col justify-start ${
        props.config === "setting" ? `absolute` : `sticky`
      } top-[15%] left-[15%] z-40 bg-lightGray w-[70%] h-[76%] px-4 rounded-xl`}
    >
      <ModalHeader title={title} />
      {!OSLOpen && (
        <>
          <Level />
          <Login />{" "}
          <div
            className="mb-1 text-sm font-MaplestoryLight text-mainSlate-700"
            onClick={openOSLHandler}
          >
            Open Source Licenses
          </div>
        </>
      )}
      {OSLOpen && <OpenSourceLicenses />}
    </div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      <Overlay currentPage={props.current} />
      <ModalOverlay config={props.config} />
    </Fragment>
  );
};

export default Modal;
