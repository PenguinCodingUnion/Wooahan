import axiosRequest from "util/Axios";
import kakaoButton from "assets/images/loginButton/kakaoLogin.png";

const KakaoLogin = () => {
    const Rest_api_key = "d313cf6ba97344781a1976206aed6112"
    const redirect_uri = "https://k8b206.p.ssafy.io/main"
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = ()=>{
        window.location.href = kakaoURL
    }

    return(
        <div onClick={handleLogin} className="flex justify-center items-center h-[60%] mt-[1%] pb-4">
        <div className="flex h-[70%] w-[60%] bg-yellow rounded-xl">
          <div className="flex justify-center items-center w-[20%]">
            <img src={kakaoButton} className="h-[70%] rounded-3xl" />
          </div>
          <div className="flex justify-center items-center w-[80%]">
            <div className="font-['MaplestoryOTFBold'] text-xl">
              카카오 계정으로 계속하기
            </div>
          </div>
          <div className="w-[10%]"></div>
        </div>
      </div>
    )

}

export default KakaoLogin
