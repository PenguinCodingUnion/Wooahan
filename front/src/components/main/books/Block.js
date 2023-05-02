import brick from 'assets/images/books/brick.png'
import bookModal from '../books_modal/BookModal';
import { useDispatch } from 'react-redux';
import { bookModalActions } from 'store/features/mainCard/bookSlice';

const Block = (props) => {

    const dispatch = useDispatch();

    const modalHandler = (text) => {
        dispatch(bookModalActions.openModal(text))
    }

    return (
        <div onClick={()=>{modalHandler(props.text)}} style={{left: props.left, top: props.top, right: props.right, bottom: props.bottom }} className={`absolute z-${props.z} flex justify-center w-[8%] h-[8%]`}>
            <div className="absolute z-10 text-[550%] text-stroke-2 text-stroke-white font-MaplestoryBold">{props.text}</div>
            <img src={brick} className="absolute pt-[32%]" />
        </div>
    )
}

export default Block;   