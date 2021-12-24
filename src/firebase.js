import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import axios from "axios";
// import {useNavigate} from "react-router-dom";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();
const signIn = (dispatch) => {
  dispatch({ type: "LOGIN_START" });
  signInWithPopup(auth, provider)
    .then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      const userData = result.user;
      const res = axios.post(`${backendBaseURL}/user/create`, {
        email: userData.email,
        name: userData.displayName,
        photoUrl: userData.photoURL,
        uid: userData.uid,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: userData || res.data });
    })
    .catch((error) => {
      dispatch({ type: "LOGIN_FAILURE", payload: error });
    });
};

const signInStatus = (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } else {
      // window.location.replace("/");
      // console.log("Signed Out");
    }
  });
};

const signOutUser = () => {
  signOut(auth).then(() => {
    // SingOut Success
    signInStatus();
  }).catch((error) => {
    console.log(error);
  });
}

const backendBaseURL = "https://cheract-backend.netlify.app/.netlify/functions/server";

export { signIn, signInStatus, signOutUser, backendBaseURL };
