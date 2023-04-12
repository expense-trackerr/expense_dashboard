import googleIcon from "@iconify-icons/fa-brands/google";
import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

export function Login() {
  const classes = useStyles();
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isLoginDisabled =
    !email || !password || !!emailError || !!passwordError;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateEmail() && validatePassword()) {
      try {
        await login(email, password);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.log(error);
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

  return (
    <React.Fragment>
      <Box className={classes.box}>
        <Container className={classes.container}>
          <Card className={classes.root}>
            <CardContent>
              <Stack spacing={2} direction="column" alignItems="center">
                <Typography className={classes.title} variant="h4">
                  Log In
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Email"
                    type="email"
                    value={email}
                    error={!!emailError}
                    helperText={emailError}
                    onChange={handleEmailChange}
                    onBlur={validateEmail}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Password"
                    type="password"
                    value={password}
                    error={!!passwordError}
                    helperText={passwordError}
                    onChange={handlePasswordChange}
                    onBlur={validatePassword}
                    fullWidth
                    margin="normal"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submitButton}
                    fullWidth
                    disabled={isLoginDisabled}
                  >
                    Login
                  </Button>
                </form>
                <Button
                  className={classes.submitButton}
                  variant="contained"
                  onClick={handleLoginWithGoogle}
                  startIcon={<Icon icon={googleIcon} />}
                  fullWidth
                >
                  Log in with Google
                </Button>
                <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                  Forgot Password?
                </Link>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </React.Fragment>
  );
}
