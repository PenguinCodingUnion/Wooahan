import { Fragment } from "react"
import { useDispatch } from "react-redux"
import { modalActions } from 'store/features/mainCard/modalSlice'

import ModalHeader from "./ModalHeader"
import Level from "./Level"
import Login from "./Login"

const Overlay = () => {

    const dispatch = useDispatch();

    const modalCloseHandler = () => {
        dispatch(modalActions.closeModal())
    }

    return (
        <div onClick={modalCloseHandler} className="absolute w-screen h-screen z-20 bg-transparent">
        </div>
    )
}

const ModalOverlay = () => {
    return (
        <div className="flex flex-col justify-start absolute top-[15%] left-[15%] z-30 bg-lightGray w-[70%] h-[70%] px-4 rounded-xl">
            <ModalHeader />
            <Level />
            <Login />
        </div>
    )
}

const Modal = (props) => {

    console.log("hhhhsahshash");

    return (
        <Fragment >
            <Overlay />
            <ModalOverlay />
        </Fragment>
    )
}

export default Modal;