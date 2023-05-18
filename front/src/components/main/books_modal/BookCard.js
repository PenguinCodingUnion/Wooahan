import {useState} from 'react'
import effectSound from 'util/effectSound';

const BookCard = (props) => {

    const [styleStr, setStyleStr] = useState({
        transition: `.4s`,
        transformStyle: `preserve-3d`,
      });
      
      const es_word = effectSound(
        require(`assets/sounds/word/${props.word}.mp3`),
        1
      );

      const rotateCardToBack = () => {
        es_word.play();
        setStyleStr({
          transition: `.4s`,
          transformStyle: `preserve-3d`,
          transform: `rotateY(180deg)`,
        });
      };

      const rotateCardToFront = () => {
        setStyleStr({
            transition: `.4s`,
            transformStyle: `preserve-3d`,
            transform: `rotateY(0deg)`,
          });
      }

    return (
        <div
            className={"relative flex justify-center items-center bg-mainOrange-900 rounded-xl w-[40%] h-[60%] mx-[5%] my-[2%]"}
            style={styleStr}
        >
            <div
                className="absolute w-[80%] h-[80%] flex justify-center items-center"
                style={{backfaceVisibility: `hidden`}}
                onClick={rotateCardToBack}
            >
                <p className="font-['MaplestoryOTFBold'] text-5xl text-white">{props.word}</p>
            </div>

            <div
                className="absolute bg-palePupple w-[80%] h-[80%]"
                style={{
                    transform: `rotateY(180deg)`,
                    backfaceVisibility: `hidden`
                }}
                onClick={rotateCardToFront}

            >
                <img src={`${props.img}`} className="w-full h-full" />
            </div>
        </div>
    )
}

export default BookCard