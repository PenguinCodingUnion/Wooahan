import penguin from "assets/images/animal/penguin.png"
import fox from "assets/images/animal/fox.png"
import PropTypes from "prop-types"
import GameCard from "./GameCard"

const coverImages = [
  "bg-[url('assets/images/background_iceberg.jpg')]",
  "bg-[url('assets/images/background_desert.jpg')]",
  "bg-[url('assets/images/background_forest.jpg')]",
  "bg-[url('assets/images/background_underwater.jpg')]",
  "bg-[url('assets/images/background_iceberg.jpg')]",
  "bg-[url('assets/images/background_desert.jpg')]",
  "bg-[url('assets/images/background_forest.jpg')]",
  "bg-[url('assets/images/background_underwater.jpg')]",
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
        <div className={`absolute w-full h-full bg-cover ${coverImages[props.id]} `} />
        <img src={games[props.id].animal} className="absolute top-[-30%] w-full h-[80%]" />
        <GameCard title={props.title}/>
      </div>
    );
}

CardImage.propTypes = {
  id : PropTypes.number.isRequired
}

export default CardImage;