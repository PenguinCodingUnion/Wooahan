import image_iceburg from "assets/images/background_iceberg.jpg"
import image_dessert from "assets/images/background_desert.jpg"
import image_forest from "assets/images/background_forest.jpg"
import image_underwater from "assets/images/background_underwater.jpg"
import { useDispatch } from "react-redux"
import { backActions } from 'store/features/mainCard/backSlice' 


const coverImages =[
    image_iceburg, image_forest, image_underwater, image_dessert
]

const CardImage = (props) => {
    
    const dispatch = useDispatch();

    // 리덕스의 백그라운드 변화 메서드 호출
    const backChangeHandler = () => {
        dispatch(backActions.changeBackGround(props.coverImage))
    }
    backChangeHandler();

    return (
        <div className="absolute pin-t pin-l w-full h-full">
            {!(props.coverImage === props.id) && <img className="w-full h-full" src={coverImages[(props.id)]} />}
        </div>
    )
}

export default CardImage;