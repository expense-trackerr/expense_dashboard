import React, { useRef } from "react";
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

//import { useAuth } from "../contexts/AuthContext.js"

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 400,
    margin: "0 auto",
    marginTop: "32px",
    padding: "16px",
  },
  title: {
    textAlign: "center",
    marginBottom: "16px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    marginBottom: "16px",
  },
  submitButton: {
    marginTop: "16px",
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
    padding: "16px",
  },
}));

export function Signup() {
  const classes = useStyles();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle form submission logic
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
                label="Email"
                inputRef={emailRef}
                required
              />
              <TextField
                className={classes.textField}
                type="password"
                label="Password"
                inputRef={passwordRef}
                required
              />
              <TextField
                className={classes.textField}
                type="password"
                label="Confirm Password"
                inputRef={passwordConfirmRef}
                required
              />
              <Button
                className={classes.submitButton}
                variant="contained"
                color="primary"
                type="submit"
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
