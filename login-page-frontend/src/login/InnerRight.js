import React from "react";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import {
  Button,
  FilledInput,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  FormControl,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";
// import { makeStyles } from "@material-ui/styles";
import PhoneInputWithFlag from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import indiaFlag from "../images/indiaFlag.png";

import validator from "validator";
import passwordValidator from "password-validator";

import { passwordSchema } from "../utils/utils";

import "./InnerRight.css";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#4caf50",
  },
}));

function InnerRight() {
  // const classes = useStyles();

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token : " + response.credential);
    const userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(e) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
      client_id:
        "452625009369-gt5ii8u5h6ak5o534pedcq74v8niaq5m.apps.googleusercontent.com",
      callback: handleCallbackResponse,
      prompt: "select_account",
      customButtonText: "Sign in with Google",
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);

  const [user, setUser] = useState({});
  const [loginMethod, setLoginMethod] = useState("Email");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  //const [passwordSchema, setPasswordSchema] = useState(new passwordValidator());

  const handleChange = () => {
    if (loginMethod === "Email") setLoginMethod("Mobile Number");
    else setLoginMethod("Email");
  };

  const isValidEmail = (email) => {
    return validator.isEmail(email);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (loginMethod == "Email") {
      if (!isValidEmail(email)) {
        setEmailErrorMessage("Please enter a valid email");
      } else {
        // console.log("email", email);
        // setPassword("");
      }
    } else {
      console.log("Submitted phone number:", phoneNumber);
    }

    if (
      passwordSchema.validate(password) ||
      email === password ||
      phoneNumber === password
    ) {
      console.log(passwordSchema.validate(password));
      //setPasswordErrorMessage();
    }

    console.log("Submitted password:", password);
  };

  return (
    <>
      <Box className="sign-in-block">
        <div className="heading">
          Sign To <span className="single-line">E-Commerce</span>
        </div>

        <div id="signInDiv"></div>
        {Object.keys(user).length !== 0 && (
          <button onClick={(e) => handleSignOut(e)}> Sign Out </button>
        )}

        {Object.keys(user).length !== 0 && <div> Welcome {user.name}</div>}

        <p className="divider-text"> or sign in via email/mobile</p>
        <form onSubmit={handleSubmit}>
          <div className="credentials">
            <div className="login-method">
              <div>Login Via {loginMethod}</div>

              <Button
                variant="text"
                onClick={handleChange}
                style={{
                  fontSize: "calc(0.5vw + 0.7vh)",
                  textTransform: "capitalize",
                }}
                disableRipple
              >
                Use {loginMethod === "Email" ? "Mobile Number" : "Email"}
              </Button>
            </div>

            <div className="input-and-field">
              <InputLabel id="standard-adornment-password">
                {loginMethod}
              </InputLabel>

              {loginMethod === "Email" ? (
                <>
                  <TextField
                    required
                    id="standard-required"
                    placeholder={`Enter ${loginMethod}`}
                    variant="filled"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    onBlur={(event) => console.log(event.target.value)}
                  />
                  {emailErrorMessage && (
                    <div className="error-message">{emailErrorMessage}</div>
                  )}
                </>
              ) : (
                <PhoneInputWithFlag
                  country={"in"}
                  specialLabel={<img src={indiaFlag} alt="India" />}
                  disableCountryCode={true}
                  disableDropdown={true}
                  onlyCountries={["in"]}
                  masks={{ in: ".........." }}
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  inputProps={{ maxLength: 10 }}
                  inputStyle={{ width: "17vw" }}
                  placeholder="Mobile Number"
                />
              )}
            </div>

            <div className="input-and-field">
              <InputLabel id="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => {
                  console.log(event.target.value);
                  setPassword(event.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {passwordErrorMessage && (
                <div className="error-message">{passwordErrorMessage}</div>
              )}
            </div>

            <div className="footer">
              <FormControlLabel
                value="start"
                control={<Checkbox />}
                label={<span className="footer-txt"> Remember me</span>}
                labelPlacement="end"
              />
              <a className="footer-txt">Forget Password ?</a>
            </div>
          </div>

          <Button
            style={{
              background: "black",
              width: "70%",
              position : "absolute",
              bottom: "10%",
              fontSize : "calc(0.5vw + 0.7vh)"
            }}
            onClick={handleSubmit}
          >
            {" "}
            Sign in{" "}
          </Button>
        </form>
      </Box>
    </>
  );
}

export default InnerRight;
