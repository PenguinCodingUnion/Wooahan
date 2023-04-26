import classes from './GameCard.module.css'

import CardTitle from './CardTitle'

const GameCard = (props) => {

    // console.log(props.id)

    return (
        <div className={classes.game}>
            <CardTitle title={props.title}/>
        </div>
    )
}


export default GameCard;