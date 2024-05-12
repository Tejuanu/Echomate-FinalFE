import axios from "axios";
import { FacebookAuthProvider, User, signInWithPopup } from "firebase/auth";
import { get } from "lodash";
import { firebaseAuth, firebaseConfig } from "service/firebase";
import config from 'utils/config/env'

export async function getNewAccessToken( refreshToken: string ) {
  try {
    const { data }: any = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${firebaseConfig.apiKey}`,
      {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }
    );
    return data;
  } catch ( error: any ) {
    console.log( error.message );
  }
}


export async function getValidAccessToken( user: User ) {
  const { accessToken, expirationTime, refreshToken }: any = get(
    user,
    "stsTokenManager"
  );
  if ( new Date( expirationTime ) < new Date() ) {
    // this condition will run when access token is expired
    // use refresh token to get another accesstoken
    const { access_token } = await getNewAccessToken( refreshToken );
    return {
      accessToken: access_token,
      expirationTime: new Date().setHours( new Date().getHours() + 1 ),
    }; //new access token
  }
  return { accessToken, expirationTime }; // old access token
}



// facebook login
export const handleFacebookSignIn = async () => {
  try {
    const provider = new FacebookAuthProvider();
    provider.addScope( "ads_management" );
    provider.addScope( "ads_read" );
    provider.addScope( "read_insights" );
    const result = await signInWithPopup( firebaseAuth, provider );
    // The signed-in user info.
    console.log(
      "result",
      JSON.parse( get( result, "_tokenResponse.rawUserInfo", "" ) )
    );
    // localStorage.setItem("fbData", JSON.stringify(result));
    // // Save the access token and refresh token in local storage
    // localStorage.setItem("time", new Date().toISOString());
    // localStorage.setItem("accessToken", get(user, "accessToken", ""));
    // localStorage.setItem("refreshToken", user.refreshToken);
    // localStorage.setItem("email", `${user.email}`);
    // localStorage.setItem("name", `${user.displayName}`);
    // localStorage.setItem("userId", user.uid);
    // navigate("/", { replace: true });
    // window.location.href = "/";
    // window.amplitude.identify({ user_id: user.email });
    // window.amplitude.track("Session started", { email: user.email });
  } catch ( error ) {
    throw error;
  }
};

interface TokenResponse {
  "access_token": string,
  "token_type": string,
  "expires_in": number
}
export async function getLongLivedToken( token: string ) {
  try {
    const { data } = await axios.get( `${config.GRAPH_API}/oauth/access_token`, {
      params: {
        fb_exchange_token: token,
        client_id: config.REACT_APP_FACEBOOK_APP_ID,
        client_secret: config.REACT_APP_FACEBOOK_SECRET,
        grant_type: "fb_exchange_token"
      }
    } )
    return data as TokenResponse
  } catch ( error: any ) {
    throw error;
  }
}