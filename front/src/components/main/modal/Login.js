import GoogleLogin from "./GoogleLogin";
import GoogleLoginButton from "./GoogleLoginButton";
import KakaoLogin from "./KakaoLogin";

const Login = () => {
  return (
    <div className="h-[40%] mt-[3%]">
      <div className="font-['MaplestoryOTFBold'] text-[5vh] ">소셜 로그인</div>
      <KakaoLogin />
      <GoogleLogin />
      {/* <GoogleLoginButton /> */}
    </div>
  );
};

export default Login;
