import LoginButton from "./LoginButton"

const Login = () => {

    return (
        <div className="h-[45%]">
            <div className="font-['MaplestoryOTFBold'] text-xl mt-[4%]">
                구글 아이디로 로그인 해주세요
            </div>
            <LoginButton />
        </div>
    )
}

export default Login;