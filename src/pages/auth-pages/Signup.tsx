import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 400,
    margin: "0 auto",
    marginTop: 24,
    padding: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 16,
  },
  box: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    maxWidth: "xs",
  },
  paper: {
    padding: 16,
  },
}));

export function Signup() {
  const classes = useStyles();
  const { signup } = useAuth();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const isSignUpDisabled =
    !email ||
    !password ||
    !passwordConfirm ||
    !!emailError ||
    !!passwordError ||
    !!passwordConfirmError;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateEmail() && validatePassword() && validatePasswordConfirm()) {
      try {
        await signup(email, password);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(email);

    setEmailError(valid ? "" : "Invalid email address");
    return valid;
  };

  const validatePassword = () => {
    const valid = password.length >= 8;

    setPasswordError(valid ? "" : "Password must be at least 8 characters");
    return valid;
  };

  const validatePasswordConfirm = () => {
    const valid = password === passwordConfirm;

    setPasswordConfirmError(valid ? "" : "Passwords do not match");
    return valid;
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (emailError) {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (passwordError) {
      setPasswordError("");
    }
  };

  const handlePasswordConfirmChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(event.target.value);
    if (passwordConfirmError) {
      setPasswordConfirmError("");
    }
  };

  return (
    <Box className={classes.box}>
      <Container className={classes.container}>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} variant="h4">
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit} className={classes.form}>
              <TextField
                className={classes.textField}
                type="email"
                label="email"
                value={email}
                error={!!emailError}
                helperText={emailError}
                onChange={handleEmailChange}
                onBlur={validateEmail}
                required
              />
              <TextField
                className={classes.textField}
                type="password"
                label="Password"
                value={password}
                error={!!passwordError}
                helperText={passwordError}
                onChange={handlePasswordChange}
                onBlur={validatePassword}
                required
              />
              <TextField
                className={classes.textField}
                type="password"
                label="Confirm Password"
                value={passwordConfirm}
                error={!!passwordConfirmError}
                helperText={passwordConfirmError}
                onChange={handlePasswordConfirmChange}
                onBlur={validatePasswordConfirm}
                required
              />
              <Button
                className={classes.submitButton}
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSignUpDisabled}
              >
                Sign Up
              </Button>
              <br></br>
              <Typography align="center" variant="subtitle1" gutterBottom>
                Already have an account? Log In
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
