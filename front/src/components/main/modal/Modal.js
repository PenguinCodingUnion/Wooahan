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
        <div onClick={modalCloseHandler} className="absolute w-[200%] h-screen z-40 bg-tranparent">
        </div>
    )
}

const ModalOverlay = (props) => {
    return (
        <div className={`flex flex-col justify-start ${(props.config === "setting") ? `absolute` : `sticky`} top-[15%] left-[15%] z-40 bg-lightGray w-[70%] h-[72%] px-4 rounded-xl`}>
            <ModalHeader />
            <Level />
            <Login />
        </div>
    )
}

const Modal = (props) => {

    return (
        <Fragment >
            <Overlay />
            <ModalOverlay config={props.config}/>
        </Fragment>
    )
}

export default Modal;