
import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";


const url = "https://accounts.google.com/o/oauth2/auth?client_id=658207955186-n84qpvfhtdi82n6mfvbmh6v99aevulv7.apps.googleusercontent.com&redirect_uri=http://localhost:9090/login/oauth2/code/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"

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
