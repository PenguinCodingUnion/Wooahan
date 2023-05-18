import cloud1 from 'assets/images/books/cloud1.png'
import cloud2 from 'assets/images/books/cloud2.png'
import { useDispatch } from 'react-redux';
import { bookModalActions } from 'store/features/mainCard/bookSlice';
import axiosRequest from "util/Axios";
import { useSelector } from 'react-redux'

const Block = (props) => {

    const dispatch = useDispatch();

    const modalHandler = (text) => {
        cardRequest(text)       
        dispatch(bookModalActions.openModal(text))
    }

    // const starCount = useSelector(state => state.loginInfo.starCount)
    // const rewards = useSelector(state => state.loginInfo.rewards)
    const email = useSelector(state => state.loginInfo.email)

    const cardRequest = async(text) => {
    
        let data = {
            "email": email,
            "text": text
        }

        await axiosRequest
            .post("/reward", data)
            .then((res) => {
                dispatch(bookModalActions.setWordArray(res.cards))
            })
    }

    
    return (
        <div  
             style={{left: props.left, top: props.top, right: props.right, bottom: props.bottom }} 
             className={`absolute z-${props.z} ${props.cloud} flex justify-center w-[8%] h-[8%] bg-trans`}>
            <div onClick={() => {modalHandler(props.text)}} className="absolute z-10 text-[550%] text-stroke-2 text-stroke-white font-MaplestoryBold">{props.text}</div>
            <img src={`${(props.num === "1") ? cloud1 : cloud2}`} className="absolute top-[170%]" />
        </div>
    )

}

export default Block;   