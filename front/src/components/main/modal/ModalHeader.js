import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { modalActions } from 'store/features/mainCard/modalSlice'

const ModalHeader = (props) => {
    const [titleStyle, setTitleStyle] = useState("");

    useEffect(() => {
        if(props.title === '설정') {
            setTitleStyle("font-['MaplestoryOTFBold'] text-3xl whitespace-nowrap grow")
        }else {
            setTitleStyle("font-['MaplestoryOTFBold'] text-2xl whitespace-nowrap grow")
        }
    }, [props])

    const dispatch = useDispatch();

    const modalCloseHandler = () => {
        dispatch(modalActions.closeModal())
    }

    return (
        <header className="flex border-b border-black py-[2%]">
            <div className="w-1/5"></div>
            <div className={titleStyle}>
                {props.title}
            </div>
            <div className="flex justify-end w-1/5">
                <button 
                    onClick={modalCloseHandler}
                    className=" rounded-lg w-[20%] font-['MaplestoryOTFBold'] text-2xl">
                    X
                </button>
            </div>
        </header>
    )
}

export default ModalHeader;