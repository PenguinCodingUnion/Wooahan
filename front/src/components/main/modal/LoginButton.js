import googleIcon from "assets/images/logo/googleIcon.png" 
import axios from "axios";
import {Cookies} from 'react-cookie'

const cookies = new Cookies()

const url = "https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=658207955186-n84qpvfhtdi82n6mfvbmh6v99aevulv7.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Fk8b206.p.ssafy.io%2Fapi%2Flogin%2Foauth2%2Fcode%2Fgoogle&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&service=lso&o2v=1&flowName=GeneralOAuthFlow"

const LoginButton = () => {

    return(
        <a href={url} className="flex justify-center h-[60%] mt-[1%]">
            <div className="flex h-[70%] w-[60%] bg-white border border-black rounded-3xl">
                <div className="flex justify-center items-center w-[20%]">
                    <img src={googleIcon} className="h-[70%]  rounded-3xl"/>
                </div>
                <div className="flex justify-center items-center w-[80%]">
                    <div className="font-['MaplestoryOTFBold'] text-xl">구글 계정으로 계속하기</div>
                </div>
                <div className="w-[10%]"></div>
            </div>
        </a>
    )
}

export default LoginButton;