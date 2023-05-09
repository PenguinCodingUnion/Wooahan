import LoginButton from "./LoginButton"
import GoogleLoginButton from "./GoogleLoginButton";

const Login = () => {

    return (
        <div className="h-[45%]">
            <div className="font-['MaplestoryOTFBold'] text-xl mt-[4%]">
                구글 아이디로 로그인 해주세요
            </div>
            {/* <LoginButton /> */}
            <GoogleLoginButton />
        </div>
    )
}

export default Login;