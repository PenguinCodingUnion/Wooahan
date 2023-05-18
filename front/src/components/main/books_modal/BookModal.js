import { useDispatch, useSelector } from "react-redux"
import { bookModalActions } from 'store/features/mainCard/bookSlice';
import { Fragment } from "react";
import BookModalHeader from './BookModalHeader'
import BookCard from './BookCard'


const Overlay = () => {

    const dispatch = useDispatch();
    const modalCloseHandler = () => {
        dispatch(bookModalActions.closeModal())
        dispatch(bookModalActions.setWordArray([]))
    }
    
    return (
        <div onClick={modalCloseHandler} className="absolute w-[200%] h-screen z-40 bg-transparent">
        </div>
    )
}

const BookModal = () => {

    const cards = useSelector((state) => state.bookText.wordArray)

    return (
        <div className="flex flex-col justify-start sticky top-[5%] left-[5%] z-40 bg-beige w-[90%] h-[90%] px-4 rounded-xl">
            <BookModalHeader />
            <div className="w-full h-full flex flex-wrap overflow-y-scroll mt-[2%] bg-beige">
                {cards.map((card, idx) => {
                   return (
                        <BookCard key={idx} word={card.name} img={card.imgUrl}/>
                    )
                })}
            </div>
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