import { useDispatch } from "react-redux"
import { bookModalActions } from 'store/features/mainCard/bookSlice';
import { Fragment } from "react";
import BookModalHeader from './BookModalHeader'

const Overlay = () => {

    const dispatch = useDispatch();
    const modalCloseHandler = () => {
        dispatch(bookModalActions.closeModal())
    }
    
    return (
        <div onClick={modalCloseHandler} className="absolute w-[200%] h-screen z-40 bg-transparent">
        </div>
    )
}

const BookModal = () => {

    return (
        <div className="flex flex-col justify-start sticky top-[5%] left-[5%] z-40 bg-beige w-[90%] h-[90%] px-4 rounded-xl">
            <BookModalHeader />
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