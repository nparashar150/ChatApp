import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
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

const signUpWithEmailAndPassword = (
  dispatch,
  email,
  password,
  name,
  photoUrl,
  photoId
) => {
  dispatch({ type: "LOGIN_START" });
  createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      let userData = result.user;
      if (userData) {
        const res = axios.post(
          `${backendBaseURL}/user/create`,
          {
            email: userData.email,
            name,
            photoUrl,
            photoId,
            uid: userData.uid,
          }
        );
        console.log(res.data);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: "Error creating account" });
        console.log("Error creating account");
      }
    })
    .catch((error) => {
      dispatch({ type: "LOGIN_FAILURE", payload: error });
    });
};

const logInWithEmail = (dispatch, email, password) => {
  dispatch({ type: "LOGIN_START" });
  signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const userData = result.user;
      setUser(dispatch, userData.uid);
    })
    .catch((error) => {
      dispatch({ type: "LOGIN_FAILURE", payload: error });
    });
};

const resetPasswordWithEmail = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      return error;
    });
};

const signInStatus = (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(dispatch, user.uid);
    } else {
      // window.location.replace("/");
      // console.log("Signed Out");
    }
  });
};

const setUser = async (dispatch, uid) => {
  const USER = await axios.get(
    `${backendBaseURL}/user/create/${uid}`
  );
  dispatch({ type: "LOGIN_SUCCESS", payload: USER.data[0] });
};

const signOutUser = () => {
  signOut(auth)
    .then(() => {
      // SingOut Success
      signInStatus();
      window.location.replace("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

const backendBaseURL =
  "https://cheract-backend.netlify.app/.netlify/functions/server";

export {
  signIn,
  signUpWithEmailAndPassword,
  logInWithEmail,
  signInStatus,
  signOutUser,
  backendBaseURL,
  resetPasswordWithEmail,
};
