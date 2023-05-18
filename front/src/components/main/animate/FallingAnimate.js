import image_snowflake from "assets/images/falling/snow.png";
import image_leaf from "assets/images/falling/leaf.png";
import image_brownleaf from "assets/images/falling/brownLeaf.png";
import image_bubble from "assets/images/falling/bubble.png";

const fallingThings = [image_snowflake, image_leaf, image_bubble, image_brownleaf, image_snowflake, image_leaf, image_bubble, image_brownleaf];
const tmpArray = ["animate-snow1", "animate-snow2", "animate-snow3", "animate-snow4", "animate-snow5", "animate-snow6", "animate-snow7", "animate-snow8",
"animate-snow9", "animate-snow10", "animate-snow11", "animate-snow12"];

const FallingAnimate = (props) => {
  return (
    // 왜 map으로하면 안될까?
    <div>
      {
        tmpArray.map((idx) => {
          return (
            <img
              key={idx}
              src={fallingThings[props.falling]}
              className={`absolute z-10 w-[3%] h-[4%] ${idx}`}
              alt=""
            />
          );
        })
      }
    </div>
  );
};

export default FallingAnimate;
