import googleIcon from '@iconify-icons/fa-brands/google';
import { Icon } from '@iconify/react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

export function Login() {
    const classes = useStyles();
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const emailValidator = (email: string) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    const passwordValidator = (password: string) => password.length >= 8;

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
    } = useField(
        '',
        passwordValidator,
        'Password must be at least 8 characters'
    );

    const isLoginDisabled =
        !emailValue || !passwordValue || !!emailError || !!passwordError;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateEmail() && validatePassword()) {
            login(emailValue, passwordValue)
                .then(() => {
                    navigate('/');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleLoginWithGoogle = () => {
        loginWithGoogle()
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <React.Fragment>
            <Box className={classes.box}>
                <Container className={classes.container}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Stack
                                spacing={2}
                                direction="column"
                                alignItems="center"
                            >
                                <Typography
                                    className={classes.title}
                                    variant="h4"
                                >
                                    Log In
                                </Typography>
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        label="Email"
                                        type="email"
                                        value={emailValue}
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
                                        value={passwordValue}
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
                                <Link
                                    to="/forgot-password"
                                    style={{ textDecoration: 'none' }}
                                >
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
