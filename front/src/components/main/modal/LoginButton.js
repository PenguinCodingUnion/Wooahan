import googleIcon from "assets/images/logo/googleIcon.png";
import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useRef, useState } from "react";

const LoginButton = () => {
  const loginBtn = useRef();

  const [user, setUser] = useState([]);

  const url =
    process.env.NODE_ENV === "production"
      ? "https://k8b206.p.ssafy.io/"
      : "http://localhost:3000";

  console.log("URL : ", url);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
    onNonOAuthError: (error) => console.log("?? Error :", error),
    hosted_domain: url,

    ux_mode: "popup",
    redirect_uri: url,
  });

  console.log(user);

  return (
    <div onClick={login} className="flex justify-center h-[60%] mt-[1%] pb-4">
      <div className="flex h-[70%] w-[60%] bg-white border border-black rounded-3xl">
        <div className="flex justify-center items-center w-[20%]">
          <img src={googleIcon} className="h-[70%] rounded-3xl" />
        </div>
        <div className="flex justify-center items-center w-[80%]">
          <div className="font-['MaplestoryOTFBold'] text-xl">
            구글 계정으로 계속하기
          </div>
        </div>
        <div className="w-[10%]"></div>
      </div>
    </div>
  );
};

export default LoginButton;
