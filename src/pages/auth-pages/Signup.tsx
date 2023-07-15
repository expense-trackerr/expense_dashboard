import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useField } from '../../utils/custom-hooks';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 400,
    margin: '0 auto',
    marginTop: 24,
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 16,
  },
  box: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    maxWidth: 'xs',
  },
  paper: {
    padding: 16,
  },
}));

export function Signup() {
  const classes = useStyles();
  const { signup } = useAuth();

  const emailValidator = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const passwordValidator = (password: string) => password.length >= 8;

  const passwordConfirmValidator = (password: string) => password === passwordValue;

  const {
    value: emailValue,
    error: emailError,
    handleChange: handleEmailChange,
    validate: validateEmail,
  } = useField('', emailValidator, 'Please enter a valid email address');

  const {
    value: passwordValue,
    error: passwordError,
    handleChange: handlePasswordChange,
    validate: validatePassword,
  } = useField('', passwordValidator, 'Password must be at least 8 characters');

  const {
    value: passwordConfirm,
    error: passwordConfirmError,
    handleChange: handlePasswordConfirmChange,
    validate: validatePasswordConfirm,
  } = useField('', passwordConfirmValidator, 'Passwords must match');

  const isSignUpDisabled =
    !emailValue || !passwordValue || !passwordConfirm || !!emailError || !!passwordError || !!passwordConfirmError;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateEmail() && validatePassword() && validatePasswordConfirm()) {
      signup(emailValue, passwordValue)
        .then()
        .catch((error) => {
          console.log(error);
        });
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
                value={emailValue}
                error={!!emailError}
                helperText={emailError}
                onChange={handleEmailChange}
                onBlur={validateEmail}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                className={classes.textField}
                type="password"
                label="Password"
                value={passwordValue}
                error={!!passwordError}
                helperText={passwordError}
                onChange={handlePasswordChange}
                onBlur={validatePassword}
                fullWidth
                margin="normal"
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
                fullWidth
                margin="normal"
                required
              />
              <Button
                className={classes.submitButton}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
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
