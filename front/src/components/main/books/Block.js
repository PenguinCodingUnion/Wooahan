import brick from 'assets/images/books/brick.png'

const Block = (props) => {
    return (
        <div style={{left: props.left, top: props.top, right: props.right, bottom: props.bottom }} className={`absolute z-${props.z} flex justify-center w-28 h-28`}>
            <div className="absolute z-10 text-8xl text-stroke-2 text-stroke-white font-MaplestoryBold">{props.text}</div>
            <img src={brick} className="absolute pt-[30%]" />
        </div>
    )
}

export default Block;   