import googleIcon from "assets/images/logo/googleIcon.png" 

const LoginButton = () => {
    
    const login = () => {
        console.log("google login!");
    }

    return(
        <div onClick={login} className="flex justify-center h-[60%] mt-[1%]">
            <div className="flex h-[70%] w-[60%] bg-white border border-black rounded-3xl">
                <div className="flex justify-center items-center w-[20%]">
                    <img src={googleIcon} className="h-[70%]  rounded-3xl"/>
                </div>
                <div className="flex justify-center items-center w-[80%]">
                    <div className="font-['MaplestoryOTFBold'] text-xl">구글 계정으로 계속하기</div>
                </div>
                <div className="w-[10%]"></div>
            </div>
        </div>
    )
}

export default LoginButton;