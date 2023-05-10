import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { bookModalActions } from 'store/features/mainCard/bookSlice';

library.add(faCircleXmark);

const BookModalHeader = () => {

    const dispatch = useDispatch();
    const textTitle = useSelector(state => state.bookText.text)

    const modalCloseHandler = () => {
        dispatch(bookModalActions.closeModal())
    }

    return (
        <header className="w-full h-[17%] flex mt-[3%]">
            <div className="w-1/3 h-full">
            </div>
            <div className="w-1/3 h-full flex justify-center items-center">
                <div className="bg-modernOrange rounded-xl w-[70%] h-[80%] font-MaplestoryBold text-[200%] text-white flex justify-center item-center">
                    {textTitle}
                </div>
            </div>
            <div className="w-1/3 h-full flex justify-end item-start">
               <button onClick={modalCloseHandler}>
                <FontAwesomeIcon className="bg-white rounded-full" icon={faCircleXmark} size="3x" style={{ color: '#6fe8a7' }}/>
               </button>
            </div>
        </header>
    )
}

export default BookModalHeader;