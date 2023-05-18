import image_snowflake from "assets/images/falling/snow.png";
import image_leaf from "assets/images/falling/leaf1.png";
import image_brownleaf2 from "assets/images/falling/borwnLeaf2.png";
import image_bubble from "assets/images/falling/bubble.png";

const fallingThings = [image_snowflake, image_leaf, image_bubble, image_brownleaf2];
const tmpArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const FallingAnimate = (props) => {
  return (
    // 왜 map으로하면 안될까?
    <div>
      {
        tmpArray.map((el, idx) => {
          return (
            <img
              key={idx}
              src={fallingThings[props.falling]}
              className={`absolute z-10 w-[3%] h-[4%] animate-snow${idx + 1}`}
            />
          );
        })
      }
    </div>
  );
};

export default FallingAnimate;
