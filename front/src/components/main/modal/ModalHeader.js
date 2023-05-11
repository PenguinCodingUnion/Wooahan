import { useDispatch } from "react-redux"
import { modalActions } from 'store/features/mainCard/modalSlice'

const ModalHeader = () => {

    const dispatch = useDispatch();

    const modalCloseHandler = () => {
        dispatch(modalActions.closeModal())
    }

    return (
        <header className="flex border-b border-black py-[2%]">
            <div className="w-1/3"></div>
            <div className="w-1/3 font-['MaplestoryOTFBold'] text-3xl">
                설정
            </div>
            <div className="flex w-1/3 justify-end">
                <button 
                    onClick={modalCloseHandler}
                    className="border border-black rounded-lg w-[20%] font-['MaplestoryOTFBold'] text-2xl">
                    X
                </button>
            </div>
        </header>
    )
}

export default ModalHeader;