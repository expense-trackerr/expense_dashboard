import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  Divider,
} from "@material-ui/core";
import { Icon } from "@iconify/react";
import googleIcon from "@iconify-icons/fa-brands/google";
import appleIcon from "@iconify-icons/fa-brands/apple";
import { loginWithFirebase } from "./firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    margin: "0 auto",
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
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
    padding: theme.spacing(2),
  },
  divider: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    "&::before, &::after": {
      content: "''",
      flex: 1,
      borderBottom: "1px solid #ccc",
    },
    "&::before": {
      marginRight: "0.5em",
    },
    "&::after": {
      marginLeft: "0.5em",
    },
  },
}));

export default function Signup() {
  const classes = useStyles();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Box className={classes.box}>
      <Container className={classes.container}>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} variant="h4">
              Log In
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
              <Button
                className={classes.submitButton}
                variant="contained"
                color="primary"
                type="submit"
              >
                Log in
              </Button>
              <br></br>
              <Box mt={2} mb={2} className={classes.divider}>
                <Divider />
                <Typography variant="subtitle1" color="textSecondary">
                  Or
                </Typography>
                <Divider />
              </Box>
              {/* <Button
                className={classes.submitButton}
                variant="contained"
                type="submit"
                onClick={loginWithFirebaseO}
                startIcon={<Icon icon={appleIcon} />}
              >
                Log in with Apple
              </Button> */}
              <Button
                className={classes.submitButton}
                variant="contained"
                onClick={loginWithFirebase}
                startIcon={<Icon icon={googleIcon} />}
              >
                Log in with Google
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
