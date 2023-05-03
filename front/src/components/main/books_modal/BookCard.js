import {useState} from 'react'

const BookCard = (props) => {

    const [styleStr, setStyleStr] = useState({
        transition: `.4s`,
        transformStyle: `preserve-3d`,
      });

      const rotateCard = () => {
        setStyleStr({
          transition: `.4s`,
          transformStyle: `preserve-3d`,
          transform: `rotateY(180deg)`,
        });
        setTimeout(() => {
        }, 500);
      };

    return (
        <div
            className={"relative flex justify-center items-center bg-mainOrange-900 rounded-xl w-[40%] h-[60%] mx-[5%] my-[2%]"}
            style={styleStr}
            onClick={rotateCard}
        >
            <div
                className="absolute w-[80%] h-[80%] flex justify-center items-center"
                style={{backfaceVisibility: `hidden`}}
            >
                <p className="font-['MaplestoryOTFBold'] text-5xl text-white">{props.word}</p>
            </div>

            <div
                className="absolute bg-palePupple w-[80%] h-[80%]"
                style={{
                    transform: `rotateY(180deg)`,
                    backfaceVisibility: `hidden`
                }}
            >
                뒷면!!
            </div>
        </div>
    )
}

export default BookCard