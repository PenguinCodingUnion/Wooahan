import ice_burg from "assets/images/background_iceberg.jpg";
import forest from "assets/images/background_forest.jpg";
import underwater from "assets/images/background_underwater.jpg";
import desert from "assets/images/background_desert.jpg";
import penguin from "assets/images/animal/penguin.png"
import fox from "assets/images/animal/fox.png"
import PropTypes from "prop-types"
import GameCard from "./GameCard"
// import jump_penguin from "assets/images/penguel_high_jump.gif"

const coverImages = [
  ice_burg, forest, underwater, desert, ice_burg, forest, underwater, desert
]

const games =[
  {id: 1, title: '뛰어쓰기', animal: penguin, url: '/jump'},
  {id: 2, title: '팽글썰매', animal: fox, url: '/sleigh'},
  {id: 3, title: '한글방울', animal: penguin, url: '/bubble'},
  {id: 4, title: '끝말기차', animal: fox, url: '/train'},
  {id: 5, title: '뛰어쓰기', animal: penguin, url: '/jump'},
  {id: 6, title: '팽글썰매', animal: fox, url: '/sleigh'},
  {id: 7, title: '한글방울', animal: penguin, url: '/bubble'},
  {id: 8, title: '끝말기차', animal: fox, url: '/train'},
]

const CardImage = (props) => {
    return (
      <div>
        {/* <div className={`absolute w-[150%] h-[120%] right-[-25%] rounded-2xl bg-cover ${coverImages[props.id]} `} /> */}
        <img className={`absolute w-[150%] h-[120%] max-w-xl right-[-23%] rounded-2xl bg-cover`} src={coverImages[props.id]} />
        <img src={games[props.id].animal} className="absolute max-w-xl right-[-15%] top-[-50%] w-[130%] h-[110%]" />
        <GameCard title={props.title}/>
      </div>
    );
}

CardImage.propTypes = {
  id : PropTypes.number.isRequired
}

export default CardImage;