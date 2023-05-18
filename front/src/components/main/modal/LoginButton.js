import googleIcon from "assets/images/logo/googleIcon.png";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useRef } from "react";
const google = window.google;

const handleCredentialResponse = (response) => {
  console.log(response);
  // console.log("Encoded JWT ID token: " + response.credential);
};

const LoginButton = () => {
  const loginBtn = useRef();

  // useEffect(() => {
  //   // Load the Google Sign-In library
  //   const script = document.createElement("script");
  //   script.src = "https://accounts.google.com/gsi/client";
  //   script.async = true;
  //   script.onload = () => {
  //     // Initialize Google Sign-In after the library has been loaded
  //     window.google.accounts.id.initialize({
  //       client_id:
  //         "475117437057-ebv70ou2abgeuvi2vlif3d7bfgfcnf5q.apps.googleusercontent.com",
  //       callback: handleCredentialResponse,
  //     });
  //     window.google.accounts.id.renderButton(loginBtn.current, {
  //       theme: "outline",
  //       size: "large",
  //     });
  //     window.google.accounts.id.prompt();
  //   };
  //   document.body.appendChild(script);

  //   // Clean up function
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  const login = async () => {
    if (window.google_login) {
      const goo = window.google_login.googleLogin();
      console.log(goo);
      return goo;
    }
  };

  /**  authorizationUrl="https://accounts.google.com/o/oauth2/v2/auth"
          responseType="code"
          redirectUri="http://localhost:3000"
          clientId="475117437057-ebv70ou2abgeuvi2vlif3d7bfgfcnf5q.apps.googleusercontent.com"
          clientSecret="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"
          scope="https://www.googleapis.com/auth/userinfo.profile" */

  return (
    <GoogleOAuthProvider clientId="475117437057-ebv70ou2abgeuvi2vlif3d7bfgfcnf5q.apps.googleusercontent.com">
      <div className="flex justify-center h-[60%] mt-[1%] pb-4">
        {/* <div className="flex h-[70%] w-[60%] bg-white border border-black rounded-3xl"> */}
        {/* <div className="flex justify-center items-center w-[20%]">
          <img src={googleIcon} className="h-[70%] rounded-3xl" />
        </div> */}
        <div className="flex justify-center items-center w-[80%]">
          {/* <div className="font-['MaplestoryOTFBold'] text-xl">
            구글 계정으로 계속하기
          </div> */}
          <GoogleLogin
            id="google"
            type="standard"
            useOneTap="true"
            onSuccess={handleCredentialResponse}
            onError={handleCredentialResponse}
          />
        </div>
        {/* <div className="w-[10%]"></div> */}
        {/* </div> */}
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginButton;
