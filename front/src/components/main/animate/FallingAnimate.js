import image_snowflake from "assets/images/falling/snowflake.png"
import image_leaf from "assets/images/falling/leaf.png"


const fallingThings =[image_snowflake, image_leaf]

const FallingAnimate = (props) => {



    return(
        // 왜 map으로하면 안될까?
        <div>
            <img src={fallingThings[props.falling]} className={`absolute z-10 w-[3%] h-[4%] animate-snow1`} />
            <img src={fallingThings[props.falling]} className={`absolute z-10 w-[3%] h-[4%] animate-snow2`} />
            <img src={fallingThings[props.falling]} className={`absolute z-10 w-[3%] h-[4%] animate-snow3`} />
            <img src={fallingThings[props.falling]} className={`absolute z-10 w-[3%] h-[4%] animate-snow4`} />
            <img src={fallingThings[props.falling]} className={`absolute z-10 w-[3%] h-[4%] animate-snow5`} />
            <img src={fallingThings[props.falling]} className={`absolute z-10 w-[3%] h-[4%] animate-snow6`} />
            <img src={fallingThings[props.falling]} className={`absolute z-10 w-[3%] h-[4%] animate-snow7`} />
            <img src={fallingThings[props.falling]} className={`absolute z-10 w-[3%] h-[4%] animate-snow8`} />
            <img src={fallingThings[props.falling]} className={`absolute z-10 w-[3%] h-[4%] animate-snow9`} />
            <img src={fallingThings[props.falling]} className={`absolute z-10 w-[3%] h-[4%] animate-snow10`} />
            <img src={fallingThings[props.falling]} className={`absolute z-10 w-[3%] h-[4%] animate-snow11`} />
            <img src={fallingThings[props.falling]} className={`absolute z-10 w-[3%] h-[4%] animate-snow12`} />
        </div>
    )
}

export default FallingAnimate;