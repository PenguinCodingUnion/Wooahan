import LoginButton from "./LoginButton"
import GoogleLoginButton from "./GoogleLoginButton";
import KakaoLogin from "./KakaoLogin";

const Login = () => {

    return (
        <div className="h-[45%]">
            <div className="font-['MaplestoryOTFBold'] text-2xl mt-[4%] mb-[1%]">
                구글 아이디로 로그인 해주세요
            </div>
            <KakaoLogin />
            {/* <LoginButton /> */}
            {/* <GoogleLoginButton /> */}
        </div>
    )
}

export default Login;