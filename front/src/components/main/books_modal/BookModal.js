import { useDispatch } from "react-redux"
import { bookModalActions } from 'store/features/mainCard/bookSlice';
import { Fragment } from "react";

const Overlay = () => {

    const dispatch = useDispatch();
    const modalCloseHandler = () => {
        dispatch(bookModalActions.closeModal())
    }
    
    return (
        <div onClick={modalCloseHandler} className="absolute w-screen h-screen z-20 bg-transparent">
        </div>
    )
}

const BookModal = (props) => {

    return (
        <div className="flex flex-col justify-start absolute top-[5%] left-[5%] z-30 bg-beige w-[90%] h-[90%] px-4 rounded-xl">
            {props.text}
        </div>
    )
}

const Modal = () => {
    return (
        <Fragment>
            <Overlay />
            <BookModal />
        </Fragment>
    )
}

export default Modal;