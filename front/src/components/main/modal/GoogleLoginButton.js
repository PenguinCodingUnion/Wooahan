
import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";


const url = "https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=658207955186-n84qpvfhtdi82n6mfvbmh6v99aevulv7.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Fk8b206.p.ssafy.io%2Fapi%2Flogin%2Foauth2%2Fcode%2Fgoogle&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&service=lso&o2v=1&flowName=GeneralOAuthFlow"

const GoogleLoginButton = () => {
    const clientId = 'clientID'
    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={(res) => {
                        console.log(res);
                    }}
                    onFailure={(err) => {
                        console.log(err);
                    }}
                />
            </GoogleOAuthProvider>
        </>
    );
};

export default GoogleLoginButton
