import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import qs from 'qs'





function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Acosta LLC
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        margin: theme.spacing(3, 0, 2),

    }

}));


const emailRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
const usernameRegex = new RegExp(/^[A-Za-z][A-Za-z0-9._-]{5,32}$/);
export default function SignIn() {
    const [username, setUsername] = useState(localStorage.username);
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true)
    const [remoteAddress, setRemoteAddress] = useState("")
    const [status, setStatus] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const classes = useStyles();

    function validateForm() {
        return (emailRegex.test(username) || usernameRegex.test(username)) && password.length > 3;

    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (rememberMe === true) {
            saveUsername();
        }
        else {
            removeUsername();
        }

        var bodyFormData = new FormData();
        bodyFormData.append('username', username);
        bodyFormData.append('password', password);
        setStatus("");
        setLoading(true);
        axios.post("api/login",
            qs.stringify({ username: username, password: password }),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(res => {
                setRemoteAddress(res.data.ClientIP);
                setError(false);
                setStatus("Successful login!")
                localStorage.setItem("token", res.data.token)
                //redirect to dashboard
            }).catch(error => {
                setStatus(error.response?.data);
                setError(true);
                //display error
            }).finally(final => {
                setLoading(false)
            });
    };
    async function saveUsername() {
        localStorage.username = username;
    }
    async function removeUsername() {
        localStorage.removeItem("username");
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    {status && <Alert severity={error ? "error" : "success"}>{status}</Alert>}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username / Email Address"
                        name="username"
                        autoComplete="username"
                        value={username}
                        autoFocus
                        onChange={e => setUsername(e.target.value)}

                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}

                    />
                    <FormControlLabel
                        control={<Checkbox onChange={e => setRememberMe(e.target.checked)} defaultChecked={rememberMe} value={rememberMe} color="primary" />}
                        label="Remember Me"
                    />

                    {loading ? <div className={classes.loading}>
                        <CircularProgress />
                    </div> :
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!validateForm()}

                        >
                            Sign In
                    </Button>
                    }

                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

