import Block from './Block'

const BlockSet =() => {


    return(
        <div className="absolute top-[20%] w-[200%] h-[75%] bg-transparent">
            <Block top={"5%"} left={"2%"} text={"ㄱ"} z={"10"} num={"1"}/>
            <Block top={"-5%"} left={"8%"} text={"ㄴ"} z={"10"} num={"2"}/>
            <Block top={"-20%"} left={"17%"} text={"ㄷ"} z={"10"} num={"1"}/>
            <Block top={"5%"} left={"25%"} text={"ㄹ"} z={"0"} num={"2"}/>
            <Block top={"-20%"} left={"32%"} text={"ㅁ"} z={"20"} num={"1"}/>
            <Block top={"-5%"} left={"38%"} text={"ㅂ"} z={"10"} num={"2"}/>
            <Block top={"10%"} left={"44%"} text={"ㅅ"} z={"0"} num={"1"}/>
            <Block top={"-15%"} left={"52%"} text={"ㅇ"} z={"10"} num={"2"}/>
            <Block top={"-15%"} left={"58%"} text={"ㅈ"} z={"0"} num={"1"}/>
            <Block top={"10%"} left={"63%"} text={"ㅊ"} z={"5"} num={"2"}/>
            <Block top={"0%"} left={"72%"} text={"ㅋ"} z={"10"} num={"1"}/>
            <Block top={"-20%"} left={"78%"} text={"ㅌ"} z={"20"} num={"2"}/>
            <Block top={"10%"} left={"86%"} text={"ㅍ"} z={"10"} num={"1"}/>
            <Block top={"0%"} left={"92%"} text={"ㅎ"} z={"0"} num={"2"}/>
        </div>
    )
}

export default BlockSet;