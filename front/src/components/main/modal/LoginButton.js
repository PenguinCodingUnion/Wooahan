/* eslint-disable no-undef */
import googleIcon from "assets/images/logo/googleIcon.png";
import { useEffect, useRef } from "react";

const handleCredentialResponse = (response) => {
  console.log(response);
  // console.log("Encoded JWT ID token: " + response.credential);
};

const url =
  "https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=658207955186-n84qpvfhtdi82n6mfvbmh6v99aevulv7.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Fk8b206.p.ssafy.io%2Fapi%2Flogin%2Foauth2%2Fcode%2Fgoogle&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&service=lso&o2v=1&flowName=GeneralOAuthFlow";

const LoginButton = () => {
  const loginBtn = useRef();

  useEffect(() => {
    (() => {
      google.accounts.id.initialize({
        client_id:
          "475117437057-ebv70ou2abgeuvi2vlif3d7bfgfcnf5q.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        loginBtn.current,
        { theme: "outline", size: "large" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    })();
  }, []);

  const login = async () => {
    if (window.google_login) {
      const goo = window.google_login.googleLogin();
      console.log(goo);
      return goo;
    }
  };
  //onClick={login}
  return (
    <div className="flex justify-center h-[60%] mt-[1%] pb-4">
      {/* <div className="flex h-[70%] w-[60%] bg-white border border-black rounded-3xl"> */}
      {/* <div className="flex justify-center items-center w-[20%]">
          <img src={googleIcon} className="h-[70%] rounded-3xl" />
        </div> */}
      <div className="flex justify-center items-center w-[80%]">
        {/* <div className="font-['MaplestoryOTFBold'] text-xl">
            구글 계정으로 계속하기
          </div> */}
        <div ref={loginBtn}></div>
      </div>
      {/* <div className="w-[10%]"></div> */}
      {/* </div> */}
    </div>
  );
};

export default LoginButton;
