import { useDispatch } from "react-redux"
import { bookModalActions } from 'store/features/mainCard/bookSlice';
import { Fragment } from "react";
import BookModalHeader from './BookModalHeader'
import BookCard from './BookCard'

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

const cards = [
    "가방", "호랑이", "비행기" ,"나비", "개미", "불", "전화기", "자동차", "다람쥐", "문어", "기린", "사자", "핸드폰", "바구니"
]

const BookModal = () => {

    return (
        <div className="flex flex-col justify-start sticky top-[5%] left-[5%] z-40 bg-beige w-[90%] h-[90%] px-4 rounded-xl">
            <BookModalHeader />
            <div className="w-full h-full flex flex-wrap overflow-y-scroll mt-[2%] bg-beige">
                {cards.map((card, idx) => {
                   return (
                        <BookCard key={idx} word={card}/>
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