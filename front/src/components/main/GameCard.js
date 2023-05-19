import CardTitle from './CardTitle'

const GameCard = (props) => {

    return (
        <div className="absolute bottom-[10%] w-full h-[30%]">
            <CardTitle title={props.title}/>
        </div>
    )
}


export default GameCard;