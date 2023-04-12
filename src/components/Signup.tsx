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

import { useAuth } from "../contexts/AuthContext";

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
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordsError, setPasswordsError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateEmail() && validatePasswords()) {
      try {
        await signup(email, passwords.password);
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

  const validatePasswords = () => {
    const valid =
      passwords.password.length >= 8 &&
      passwords.password === passwords.confirmPassword;

    setPasswordsError(
      valid ? "" : "Passwords do not match or password is too short"
    );
    return valid;
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
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                required
              />
              <TextField
                className={classes.textField}
                type="password"
                label="Password"
                value={passwords.password}
                error={!!passwordsError}
                helperText={passwordsError}
                onChange={(e) =>
                  setPasswords({ ...passwords, password: e.target.value })
                }
                onBlur={validatePasswords}
                required
              />
              <TextField
                className={classes.textField}
                type="password"
                label="Confirm Password"
                value={passwords.confirmPassword}
                error={!!passwordsError}
                helperText={passwordsError}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirmPassword: e.target.value,
                  })
                }
                onBlur={validatePasswords}
                required
              />
              <Button
                className={classes.submitButton}
                variant="contained"
                color="primary"
                type="submit"
                disabled={
                  !email ||
                  !passwords.password ||
                  !!emailError ||
                  !!passwordsError
                }
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
