import Block from './Block'
import { useSelector } from 'react-redux';

const BlockSet =() => {

    const selectedText = useSelector(state => state.bookText.text)

    console.log(selectedText)

    return(
        <div className="absolute top-[20%] w-[200%] h-[75%] bg-transparent">
            <Block top={"5%"} left={"5%"} text={"ㄱ"} z={"10"}/>
            <Block top={"17%"} left={"10%"} text={"ㄴ"} z={"10"}/>
            <Block top={"30%"} left={"15%"} text={"ㄷ"} z={"10"}/>
            <Block top={"17%"} left={"20%"} text={"ㄹ"} z={"0"}/>
            <Block top={"30%"} left={"25%"} text={"ㅁ"} z={"20"}/>
            <Block top={"17%"} left={"30%"} text={"ㅂ"} z={"10"}/>
            <Block top={"5%"} left={"35%"} text={"ㅅ"} z={"0"}/>
            <Block top={"17%"} left={"40%"} text={"ㅇ"} z={"10"}/>
            <Block top={"5%"} left={"45%"} text={"ㅈ"} z={"0"}/>
            <Block top={"17%"} left={"50%"} text={"ㅊ"} z={"10"}/>
            <Block top={"30%"} left={"55%"} text={"ㅋ"} z={"20"}/>
            <Block top={"42%"} left={"60%"} text={"ㅌ"} z={"30"}/>
            <Block top={"30%"} left={"65%"} text={"ㅍ"} z={"20"}/>
            <Block top={"17%"} left={"70%"} text={"ㅎ"} z={"10"}/>
        </div>
    )
}

export default BlockSet;