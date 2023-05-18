import { useSelector } from "react-redux";

const Logout = () =>{

    const userName = useSelector(state => state.loginInfo.name)

    return(
        <div className="h-[40%] w-full flex flex-col items-center ">
            <div className="font-['MaplestoryOTFBold'] mt-[1%] text-[5vh] ">소셜 로그인</div>
            <div className="h-[30%] w-[80%] text-[5vh] mt-[3%] font-['MaplestoryOTFBold'] rounded-2xl flex justify-center items-center bg-white">
                {(userName === "") ? "펭글님 안녕하세요" : `${userName}님 안녕하세요`}
            </div>
        </div>
    )
}

export default Logout;