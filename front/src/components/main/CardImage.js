import image_iceburg from "assets/images/background_iceberg.jpg"
import image_dessert from "assets/images/background_desert.jpg"
import image_forest from "assets/images/background_forest.jpg"
import image_underwater from "assets/images/background_underwater.jpg"


const coverImages = [
    image_iceburg, image_forest, image_underwater, image_dessert, image_iceburg, image_forest, image_underwater, image_dessert
]

const CardImage = (props) => {

    return (
        <div className="absolute w-full h-full">
            {!(props.coverImage === props.id) && <img className="w-full h-full" src={coverImages[(props.id)]} />}
        </div>
    )
}

export default CardImage;