import googleIcon from "assets/images/logo/googleIcon.png";

const GoogleLogin = () => {
  const login = () => {
    if (window.google_login) {
      const goo = window.google_login.googleLogin();
      console.log(goo);
      return goo;
    }
  };

  return (
    <div
      onClick={login}
      className="flex justify-center items-center h-[30%] mt-[1.5%] mb-[1.5%]"
    >
      <div className="flex h-[100%] w-[60%] bg-white rounded-lg">
        <div className="flex justify-center items-center w-[20%]">
          <img src={googleIcon} className="h-[70%] rounded-3xl" alt="#" />
        </div>
        <div className="flex justify-center items-center w-[80%]">
          <div className="font-['MaplestoryOTFBold'] text-[5vh]">
            구글 로그인
          </div>
        </div>
        <div className="w-[10%]"></div>
      </div>
    </div>
  );
};

export default GoogleLogin;
