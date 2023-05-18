import ice_burg from "assets/images/background_iceberg.jpg";
import forest from "assets/images/background_forest.jpg";
import underwater from "assets/images/background_underwater.jpg";
import desert from "assets/images/background_desert.jpg";
import penguin_jump from "assets/images/animal/penguin_jump.png"
import penguin from "assets/images/animal/penguin.png"
import fox from "assets/images/animal/fox.png"
import fox_train from "assets/images/animal/fox_train.png"
import PropTypes from "prop-types"
import GameCard from "./GameCard"

const coverImages = [
  ice_burg, forest, underwater, desert, ice_burg, forest, underwater, desert
]

const games =[
  {id: 1, title: '뛰어쓰기', animal: penguin_jump, url: '/jump'},
  {id: 2, title: '팽글썰매', animal: fox, url: '/sleigh'},
  {id: 3, title: '한글방울', animal: penguin, url: '/bubble'},
  {id: 4, title: '끝말기차', animal: fox_train, url: '/train'},
  {id: 5, title: '뛰어쓰기', animal: penguin_jump, url: '/jump'},
  {id: 6, title: '팽글썰매', animal: fox, url: '/sleigh'},
  {id: 7, title: '한글방울', animal: penguin, url: '/bubble'},
  {id: 8, title: '끝말기차', animal: fox_train, url: '/train'},
]

const CardImage = (props) => {
    return (
      <div>
        <img className={`absolute w-[150%] h-[120%] max-w-xl right-[-23%] rounded-2xl bg-cover shadow-2xl shadow-white`} src={coverImages[props.id]} />
        {(props.main === props.id) && <img src={games[props.id].animal} className="absolute max-w-xl right-[-15%] top-[-50%] w-[130%] h-[110%]" />}
        <GameCard title={props.title}/>
      </div>
    );
}

CardImage.propTypes = {
  id : PropTypes.number.isRequired
}

export default CardImage;