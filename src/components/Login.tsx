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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

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
}));

export function Login({ loginWithGoogle }: { loginWithGoogle: () => void }) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateEmail() && validatePassword()) {
      // Handle form submission
      console.log("Submitted");
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

  return (
    <Box className={classes.box}>
      <Container className={classes.container}>
        <Card className={classes.root}>
          <CardContent>
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
                disabled={
                  !email || !password || !!emailError || !!passwordError
                }
              >
                Login
              </Button>
            </form>
            <Button
              className={classes.submitButton}
              variant="contained"
              onClick={loginWithGoogle}
              startIcon={<Icon icon={googleIcon} />}
              fullWidth
            >
              Log in with Google
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
