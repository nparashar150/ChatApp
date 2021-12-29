import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import { signInStatus } from "../../firebase";
import { AuthContext } from "../../context/authContext";
import { darkBlue, red, white } from "../Shared/ColorPalette";
import { ButtonSubmit } from "../Shared/Button/Button";
import defaultUserProfile from "../../data/Login/defaultUserProfile.png";
import axios from "axios";
import {
  signIn,
  signUpWithEmailAndPassword,
  resetPasswordWithEmail,
  logInWithEmail,
  backendBaseURL,
} from "../../firebase";

const LoginWrapper = styled.section`
  background: ${white};
  width: 100vw;
  height: 100vh;
  gap: 1rem;

  @media (max-width: 768px) {
    padding-top: 2rem;
    flex-direction: column-reverse !important;
    height: max-content;
  }
`;

const SignIn = styled.section`
  width: calc(50vw - 3px);
  height: 100%;
  gap: 1rem;

  @media (max-width: 768px) {
    height: 100vh;
    width: 80vw;
  }
`;

const DividerLine = styled.div`
  width: 0.2rem;
  height: calc(100vh - 2rem);
  border-radius: 0.25rem;
  background: ${darkBlue + "50"};

  @media (max-width: 768px) {
    height: 0.25rem;
    width: calc(100vw - 2rem);
  }
`;

const LoginForm = styled.form`
  gap: 1rem;
  width: calc(50vw - 3px);
  /* height: 100%; */

  @media (max-width: 768px) {
    height: ${(props) => (props.createAccount ? "100vh" : "")};
  }
`;
const LoginInput = styled.input`
  border: 3px solid ${darkBlue + "50"};
  outline: none;
  border-radius: 2rem;
  height: 2.75rem;
  width: 30vw;
  background: ${white};
  font-size: 0.95rem;
  padding: 0 0.75rem;
  display: ${(props) => (props.file ? "none" : "block")};

  &:hover,
  &:focus {
    border-color: ${darkBlue + "AA"};
  }

  @media (max-width: 768px) {
    width: 80vw;
  }
`;
const LoginLabelFile = styled.label`
  border: 3px solid ${darkBlue + "50"};
  outline: none;
  border-radius: 2rem;
  height: 2.75rem;
  width: 30vw;
  background: ${white};
  font-size: 0.95rem;
  padding: 0 0.75rem;
  line-height: 2.5rem;

  &:hover,
  &:focus {
    border-color: ${darkBlue + "AA"};
  }

  @media (max-width: 768px) {
    width: 80vw;
  }
`;

const ErrorLabel = styled.div`
  border: 3px solid ${darkBlue + "75"};
  outline: none;
  border-radius: 2rem;
  height: 2.75rem;
  width: 30vw;
  background: ${(props) => (props.notError ? "#2E8B5750" : "#e6394650")};
  font-size: 0.95rem;
  padding: 0 0.75rem;
  line-height: 2.5rem;
  color: ${darkBlue};
  font-weight: 600;
  text-align: center;
  &:hover,
  &:focus {
    border-color: ${darkBlue + "AA"};
  }

  @media (max-width: 768px) {
    width: 80vw;
  }
`;

const PreviewImageContainer = styled.div`
  border: 3px solid ${darkBlue + "50"};
  border-top: 0px;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  width: calc(30vw - 4rem);
  margin-top: -1rem;
  background: ${darkBlue + "25"};
  padding: 1rem;

  &:hover,
  &:focus {
    border-color: ${darkBlue + "AA"};
  }

  @media (max-width: 768px) {
    width: calc(80vw - 4rem);
  }
`;

const PreviewImage = styled.img`
  width: 10rem;
  height: 10rem;
  /* min-width: 8rem; */
  /* min-height: 8rem; */
  overflow: hidden;
  outline: 3px solid ${darkBlue + "50"};
  outline-offset: 2px;
  border-radius: 50%;

  &:hover,
  &:focus {
    outline-color: ${darkBlue + "AA"};
  }
`;

const Heading = styled.h2`
  font-weight: 600;
  color: ${darkBlue};

  @media (max-width: 768px) {
    width: 80vw;
    text-align: center;
  }
`;

const ORLineWrapper = styled.div`
  width: 40%;
  height: 1rem;
  border-bottom: 2px solid ${darkBlue + "50"};
  text-align: center;
  margin: 0.25em 0 0.75rem 0;
`;

const ORLine = styled.span`
  font-size: 1.25rem;
  background-color: ${white};
  color: ${darkBlue};
  padding: 0 1rem 0px 1rem;
`;

const ForgotPassword = styled.button`
  border: none;
  outline: none;
  color: ${red};
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;

  &:hover,
  &:focus,
  &:visited,
  &:active {
    color: ${red};
  }
`;

export default function Login() {
  let { user, dispatch } = useContext(AuthContext);
  let [isSignedIn, setIsSignedIn] = useState(false);
  let [previewSrc, setPreviewSrc] = useState(defaultUserProfile);
  let [photoPlaceholder, setPhotoPlaceholder] = useState(false);
  let [error, setError] = useState(null);
  let [success, setSuccess] = useState(null);
  let [loading, setLoading] = useState(false);
  let [forgotPassword, setForgotPassword] = useState(false);
  let [resetLinkSent, setResetLinkSent] = useState(false);
  let SignInUser = useRef();
  let LogInUserRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      if (forgotPassword) {
        let email = LogInUserRef.current.LoginInput_Email.value;
        if (email && forgotPassword) {
          setLoading(true);
          setResetLinkSent(true);
          resetPasswordWithEmail(email);
          setTimeout(() => {
            setResetLinkSent(false);
            setLoading(false);
          }, 2000);
        }
      } else {
        const loginData = {
          email: LogInUserRef.current.LoginInput_Email.value,
          password: LogInUserRef.current.LoginInput_Password.value,
        };
        logInWithEmail(dispatch, loginData.email, loginData.password);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (
      SignInUser.current.LoginInput_Name.value === "" &&
      SignInUser.current.LoginInput_Email.value === "" &&
      SignInUser.current.LoginInput_Password.value === "" &&
      SignInUser.current.LoginInput_Password_Confirm.value === ""
    ) {
      return setError("Fill all the fields");
    }
    if (
      SignInUser.current.LoginInput_Password_Confirm.value !==
      SignInUser.current.LoginInput_Password.value
    ) {
      return setError("Passwords donot match");
    }
    if (!photoPlaceholder) {
      return setError("Upload your Image for Profile Picture");
    }
    try {
      setError(null);
      setLoading(true);
      const formData = {
        name: SignInUser.current.LoginInput_Name.value,
        file: SignInUser.current.LoginInput_Photo.files[0],
        email: SignInUser.current.LoginInput_Email.value,
        password: SignInUser.current.LoginInput_Password.value,
      };
      const mimeType = SignInUser.current.LoginInput_Photo.files[0].type;
      const fileName = SignInUser.current.LoginInput_Photo.files[0].name;
      const getPhoto = { base64: previewSrc, mimeType, fileName };
      const res = await axios.post(
        `${backendBaseURL}/user/image/upload/getPhotoURL`,
        getPhoto
      );
      formData.photoId = res.data.uploadStatus.id;
      formData.photoUrl = res.data.URL.webContentLink;
      signUpWithEmailAndPassword(
        dispatch,
        formData.email,
        formData.password,
        formData.name,
        formData.photoUrl,
        formData.photoId
      );
    } catch (err) {
      console.log(err);
    }
    SignInUser.current.LoginInput_Name.value = "";
    SignInUser.current.LoginInput_Email.value = "";
    SignInUser.current.LoginInput_Password.value = "";
    SignInUser.current.LoginInput_Password_Confirm.value = "";
    setSuccess("Account Created successfully");
    setLoading(false);
  };

  const handleFilePreview = () => {
    if (SignInUser.current.LoginInput_Photo.files[0]) {
      setPhotoPlaceholder(true);
      checkFile(SignInUser.current.LoginInput_Photo.files[0]);
    }
  };

  const checkFile = (file) => {
    let readFile = new FileReader();
    readFile.onload = () => {
      setPreviewSrc(readFile.result);
    };
    if (file) {
      if (file.size < 4718592) {
        setError(null);
        setPhotoPlaceholder(true);
        readFile.readAsDataURL(file);
      } else {
        setError("Error: file size should be less than 4Mb");
        setPhotoPlaceholder(false);
        setPreviewSrc(defaultUserProfile);
      }
    } else {
      setPreviewSrc(defaultUserProfile);
    }
  };

  useEffect(() => {
    user ? setIsSignedIn(true) : setIsSignedIn(false);
  }, [user]);

  useEffect(() => {
    const CheckLoginState = () => {
      signInStatus(dispatch);
    };
    if (!isSignedIn) {
      CheckLoginState();
    }
  }, [dispatch, isSignedIn]);

  return (
    <>
      <LoginWrapper className="d-flex justify-content-center align-items-center flex-row">
        <LoginForm
          createAccount
          id="CreateAccount"
          ref={SignInUser}
          onSubmit={(e) => handleSignUp(e)}
          className="d-flex justify-content-center align-items-center flex-column"
        >
          <Heading>Create Account</Heading>
          <LoginInput
            required
            name="LoginInput_Name"
            autocomplete="off"
            type="text"
            placeholder="Enter Name"
          />
          <LoginLabelFile for="LoginInput_Photo">
            {photoPlaceholder
              ? SignInUser.current.LoginInput_Photo.files[0].name
              : "Upload Photo"}
          </LoginLabelFile>
          <LoginInput
            required
            name="LoginInput_Photo"
            id="LoginInput_Photo"
            autocomplete="off"
            type="file"
            onChange={handleFilePreview}
            file
            accept=".jpg, .jpeg, .png"
          />
          <PreviewImageContainer
            onClick={() => SignInUser.current.LoginInput_Photo.click()}
            className="d-flex justify-content-center align-items-center"
          >
            <PreviewImage src={previewSrc} alt="img" />
          </PreviewImageContainer>
          {/* {er ? <ErrorLabel>{"Error: file size should be less than 4Mb"}</ErrorLabel> : ""} */}
          <LoginInput
            required
            name="LoginInput_Email"
            autocomplete="off"
            type="email"
            placeholder="Enter Email"
          />
          <LoginInput
            required
            name="LoginInput_Password"
            autocomplete="off"
            type="password"
            placeholder="Enter Password"
            minLength={8}
          />
          <LoginInput
            required
            name="LoginInput_Password_Confirm"
            autocomplete="off"
            type="password"
            placeholder="Confirm Password"
            minLength={8}
          />
          {error ? <ErrorLabel>{error}</ErrorLabel> : ""}
          {success ? <ErrorLabel success>{success}</ErrorLabel> : ""}
          <ButtonSubmit
            mediaWidth="80vw"
            padding=".5rem 2.5rem"
            radius="2rem"
            type="submit"
            disabled={loading}
            onClick={handleSignUp}
          >
            {loading ? "Please wait..." : "Create Account"}
          </ButtonSubmit>
        </LoginForm>
        <DividerLine />
        <SignIn className="d-flex justify-content-center align-items-center flex-column">
          <Heading>Log In</Heading>
          <ButtonSubmit
            onClick={() => signIn(dispatch)}
            mediaWidth="80vw"
            padding=".5rem 9rem"
            radius="2rem"
            type="submit"
          >
            Log In with Google
          </ButtonSubmit>
          <ORLineWrapper>
            <ORLine>OR</ORLine>
          </ORLineWrapper>
          <LoginForm
            onSubmit={(e) => handleLogin(e)}
            ref={LogInUserRef}
            className="d-flex justify-content-center align-items-center flex-column"
          >
            <LoginInput
              required
              name="LoginInput_Email"
              autocomplete="off"
              type="email"
              placeholder="Enter Email"
            />
            {forgotPassword ? (
              resetLinkSent ? (
                <ErrorLabel notError>
                  {"Check your Inbox for instructions."}
                </ErrorLabel>
              ) : (
                ""
              )
            ) : (
              <LoginInput
                required
                name="LoginInput_Password"
                autocomplete="off"
                type="password"
                placeholder="Enter Password"
                minLength={8}
              />
            )}
            <ButtonSubmit
              disabled={loading}
              onClick={handleLogin}
              mediaWidth="80vw"
              padding=".5rem 2.5rem"
              radius="2rem"
              type="submit"
            >
              {forgotPassword
                ? loading
                  ? "Please wait..."
                  : "Reset Password"
                : loading
                ? "Please wait..."
                : "Log In"}
            </ButtonSubmit>
            <ForgotPassword onClick={() => setForgotPassword(!forgotPassword)}>
              {forgotPassword ? "Back to Login?" : "Forgot Password?"}
            </ForgotPassword>
          </LoginForm>
        </SignIn>
      </LoginWrapper>
    </>
  );
}
