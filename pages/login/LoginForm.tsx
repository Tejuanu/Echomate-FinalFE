import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
// import { init, identify, Identify, track } from "@amplitude/analytics-node";
import { firebaseAuth } from "src/service/firebase";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "react-componentry";
import { styled } from "@mui/material/styles";
import { useAppDispatch } from "src/redux/hooks";
import { setSnack } from "src/redux/reducers/snack.reducer";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordValidation from "./PasswordValidation";
import { Icon } from '@iconify/react'

const passwordSchema = yup
  .string()
  .min(8, "Password must be at least 8 characters long")
  .matches(/[a-zA-Z]/, "Password must contain at least one alphabet letter")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(/[\W_]/, "Password must contain at least one special character")
  .required("Password is required");

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Should be a valid email")
    .required("email is required"),
  password: passwordSchema,
});

const lengthSchema = yup
  .string()
  .min(8, "Password must be at least 8 characters long");
const uppercaseSchema = yup
  .string()
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter");
const lowercaseSchema = yup
  .string()
  .matches(/[a-z]/, "Password must contain at least one lowercase letter");
const numberSchema = yup
  .string()
  .matches(/[0-9]/, "Password must contain at least one number");
const specialSchema = yup
  .string()
  .matches(/[\W_]/, "Password must contain at least one special character");

const StyledSpan = styled("span")({
  color: "#0054B6",
  fontWeight: 600,
  cursor: "pointer",
});
export interface PasswordState {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}

function LoginForm() {
  const dispatch = useAppDispatch();
  const {
    reset,
    watch,
    control,
    getValues,
    formState: { isValid, dirtyFields, errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "all",
  });
  const [showLogin, setShowLogin] = useState(true);
  const [showReset, setShowReset] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [passwordState, setPasswordState] = useState<PasswordState>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const watchEmail = watch("email");
  const watchPassword = watch("password");

  async function handleResetPassword() {
    try {
      const email = getValues("email");
      await sendPasswordResetEmail(firebaseAuth, email);
      setEmailSent(true);
      dispatch(setSnack({ message: "Email sent", type: "success", open: true }));
    } catch (error: any) {
      dispatch(setSnack({ message: error.message, type: "error", open: true }));
    }
  }

  async function handleFacebookSignIn() {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      handleLogin(result.user);
    } catch (error: any) {
      dispatch(setSnack({ message: error.message, type: "error", open: true }));
    }
  }

  async function registerUser() {
    try {
      const { email, password } = getValues();
      const result = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      await handleLogin(result.user);
    } catch (error: any) {
      dispatch(setSnack({ message: error.message, type: "error", open: true }));
    }
  }

  async function loginUser() {
    try {
      const { email, password } = getValues();
      const result = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      await handleLogin(result.user);
    } catch (error: any) {
      //Firebase: Error (auth/wrong-password)
      const message = error.message.replace("Firebase: Error", "").replace(")", "").replace("(auth/", "");
      dispatch(setSnack({ message, type: "error", open: true }));
    }
  }

  async function handleLogin(user: any) {
    const accessToken = await user.getIdToken();
    localStorage.setItem("time", new Date().toISOString());
    // localStorage.setItem("accessToken", get(user, "accessToken", ""));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", user.refreshToken);
    localStorage.setItem("email", `${user.email}`);
    localStorage.setItem("name", `${user.displayName}`);
    localStorage.setItem("userId", user.uid);
    navigate("/", { replace: true });

    // init(`${config.REACT_APP_AMPLITUDE_KEY}`);
    // window.location.href = "/";
    // window.amplitude.identify({ user_id: user.email });
    // window.amplitude.track("Session started", { email: user.email });
  }

  async function handleGoogleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      const user = result.user;
      await handleLogin(user);
    } catch (error: any) {
      dispatch(setSnack({ message: error.message, type: "error", open: true }));
    }
  }

  React.useEffect(() => {
    async function validatePassword() {
      try {
         if (watchPassword.length > 0) await passwordSchema.validate(watchPassword);
      } catch (error) {
        console.log(error)
      }
      try {
        await lengthSchema.validate(watchPassword);
        setPasswordState((prevState) => ({ ...prevState, length: true }));
      } catch (error) {
        setPasswordState((prevState) => ({ ...prevState, length: false }));
      }
      try {
        await uppercaseSchema.validate(watchPassword);
        setPasswordState((prevState) => ({ ...prevState, uppercase: true }));
      } catch (err) {
        setPasswordState((prevState) => ({ ...prevState, uppercase: false }));
      }
      try {
        await lowercaseSchema.validate(watchPassword);
        setPasswordState((prevState) => ({ ...prevState, lowercase: true }));
      } catch (err) {
        setPasswordState((prevState) => ({ ...prevState, lowercase: false }));
      }
      try {
        await numberSchema.validate(watchPassword);
        setPasswordState((prevState) => ({ ...prevState, number: true }));
      } catch (err) {
        setPasswordState((prevState) => ({ ...prevState, number: false }));
      }
      try {
        await specialSchema.validate(watchPassword);
        setPasswordState((prevState) => ({ ...prevState, special: true }));
      } catch (err) {
        setPasswordState((prevState) => ({ ...prevState, special: false }));
      }
    }
    validatePassword();
  }, [watchEmail, watchPassword]);

  function goBack() {
    reset({
      email: "",
      password: "",
    })
    setShowReset(false);
    setEmailSent(false);
  }

  const disableCondition = !isValid || !dirtyFields;

  return (
    <Box
      sx={{
        maxWidth: 420,
        "& .MuiTypography-subtitle1": {
          fontWeight: 400,
        },
        bgcolor: "white",
        p: 4,
        borderRadius: 2,
        "& #password": {
          "& .MuiFormHelperText-root": {
            display: "none",
          },
        },
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
      }}
    >
      <Typography variant="h6">ECHO MATE</Typography>
      {!showReset ? (
        <Box>
          <Input
            fullWidth
            id="email"
            placeholder="Enter your email"
            control={control}
            name="email"
            label="Email"
            size="small"
            sx={{ mb: 1 }}
          />
          <Input
            id="password"
            fullWidth
            sx={{ mb: 2 }}
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            control={control}
            name="password"
            label="Password"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Icon icon="material-symbols:visibility-off-outline" /> : <Icon icon="material-symbols:visibility" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <PasswordValidation
            dirtyFields={dirtyFields}
            passwordState={passwordState}
          />
          <Typography
            variant="body1"
            onClick={() => setShowReset(true)}
            sx={{ cursor: "pointer", color: "#0054B6" }}
          >
            Forgot password?
          </Typography>
          <Button
            variant="contained"
            disableElevation
            fullWidth
            disabled={disableCondition}
            size="medium"
            sx={{
              bgcolor: "#0265DC",
              color: "white",
              mt: 2,
              "&:hover": { bgcolor: "#0265DC" },
            }}
            onClick={showLogin ? loginUser : registerUser}
          >
            {!showLogin ? "Sign Up" : "Login"}
          </Button>

          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: 12,
            }}
          >
            {showLogin ? (
              <Typography variant="caption">
                Don't have an account?{" "}
                <StyledSpan onClick={() => setShowLogin(false)}>
                  Sign up
                </StyledSpan>
              </Typography>
            ) : (
              <Typography variant="caption">
                Already have an account?{" "}
                <StyledSpan onClick={() => setShowLogin(true)}>
                  Log in
                </StyledSpan>
              </Typography>
            )}
          </div>
          <Divider sx={{ my: 2 }}>OR</Divider>
          <Button
            startIcon={<Icon icon="flat-color-icons:google" />}
            variant="outlined"
            size="medium"
            fullWidth
            onClick={handleGoogleSignIn}
            sx={{
              backgroundColor: "white",
              fontSize: "16px",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          >
            Continue with Google
          </Button>
          <Button
            startIcon={<Icon icon="logos:facebook" />}
            variant="outlined"
            size="medium"
            fullWidth
            onClick={handleFacebookSignIn}
            sx={{
              // color: "rgba(0,0,0,0.54)",
              backgroundColor: "white",
              fontSize: "16px",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "white",
              },
              mt: 2,
            }}
          >
            Continue with Facebook
          </Button>
        </Box>
      ) : (
        <Box textAlign="center">
          {!emailSent ? (
            <Box>
              <Typography variant="h4">Reset your password</Typography>
              <Typography variant="subtitle2">
                Enter your email address and we will send you instructions to
                reset your password.
              </Typography>
              <Box
                textAlign="left"
                my={2}
                sx={{
                  "& .MuiFormHelperText-root": {
                    marginLeft: 0,
                  },
                }}
              >
                <Input
                  fullWidth
                  id="email"
                  placeholder="Enter your email"
                  control={control}
                  name="email"
                  label="Email"
                  size="small"
                />
              </Box>
              <Button
                variant="contained"
                disableElevation
                fullWidth
                disabled={!dirtyFields.email || Boolean(errors.email)}
                size="medium"
                sx={{
                  bgcolor: "#0265DC",
                  color: "white",
                  mt: 2,
                  "&:hover": { bgcolor: "#0265DC" },
                }}
                onClick={handleResetPassword}
              >
                Continue
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography variant="h4" sx={{ color: "#0054B6" }}>
                Check your email
              </Typography>
              <Typography variant="subtitle2">
                Please check the email address <strong>{watchEmail}</strong> for instructions to
                reset your password.
              </Typography>
              <Button fullWidth sx={{mt: 2}} variant="outlined" onClick={handleResetPassword}>
                Resend
              </Button>
            </Box>
          )}
          <Button
            onClick={goBack}
            sx={{
              color: "#0054B6",
              ml: "auto",
              width: 150,
              mt: 1,
              bgcolor: "transparent",
            }}
          >
            Go Back
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default LoginForm;

// const actionCodeSettings = {
//   url: "https://app.getflavor.ai/signin?email=" + email,
//   handleCodeInApp: true,
// };
// const handleContinue = () => {
//   let mailformat = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\w{2,3})+$/;
//   if (email.match(mailformat)) {
//     setEmailError("");
//   } else {
//     setEmailError("Please enter valid email");
//     return;
//   }
//   setIsSubmittingEmail(true);
//   sendSignInLinkToEmail(firebaseAuth, email, actionCodeSettings)
//     .then(() => {
//       window.localStorage.setItem("email", email);
//       // const identifyObj = new Identify();
//       // identify(identifyObj, {
//       //   user_id: email,
//       // });
//       // track("Sign in link sent", { email: email });
//       setemailLinkSent(true);
//       setIsSubmittingEmail(false);
//     })
//     .catch((error) => {
//       console.log(error.message);
//       setIsSubmittingEmail(false);
//     });
// };

// const handleContinueAgain = () => {
//   let mailformat = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\w{2,3})+$/;
//   if (email.match(mailformat)) {
//     setEmailError("");
//   } else {
//     setEmailError("Please enter valid email");
//     return;
//   }
//   setemailLinkSent(false);
//   setIsSubmittingEmail(true);
//   window.localStorage.setItem("email", "");
//   sendSignInLinkToEmail(firebaseAuth, email, actionCodeSettings)
//     .then(() => {
//       window.localStorage.setItem("email", email);
//       setemailLinkSent(true);
//       setIsSubmittingEmail(false);
//     })
//     .catch((error) => {
//       console.log(error.message);
//       setIsSubmittingEmail(false);
//     });
// };
