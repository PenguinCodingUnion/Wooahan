import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux"
import { modalActions } from 'store/features/mainCard/modalSlice'

library.add(faGear);

const Setting = () => {

    const dispatch = useDispatch();

    const modalOpenHandler = () => {
        dispatch(modalActions.openModal())
    }

    return (
        <div className="pr-4 w-[50%] h-full flex justify-end items-center">
            <button onClick={modalOpenHandler} className="bg-palePupple rounded-xl w-full h-4/5 flex items-center justify-center">
                <FontAwesomeIcon icon={faGear} spin size='2xl'/>
            </button>
        </div>
    )
}

export default Setting;