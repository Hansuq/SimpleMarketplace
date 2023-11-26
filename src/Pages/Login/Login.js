import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:'20vh'
  },
  paper: {
    padding: useTheme().spacing(3),
    maxWidth: 400,
    width: '100%',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: useTheme().spacing(2),
  },
}));

const LoginPage = () => {
  const navigate = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkLogin = () =>{
    let checkToken =  localStorage.getItem("token");
    if(checkToken){
      navigate.push('/customer');
    }
  }
  useEffect(() => {
    checkLogin()
  }, [])

  const handleLogin = () => {
    //Login using API
    //onLogin()
    localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZz9zaXplPTUweDUwJnNldD1zZXQxIiwiaWF0IjoxNjM1NzczOTYyLCJleHAiOjE2MzU3Nzc1NjJ9.n9PQX8w8ocKo0dMCw3g8bKhjB8Wo7f7IONFBDqfxKhs")
    navigate.push('/customer');
  };

  const onLogin = async () =>{
    await axios
    .post(`https://dummy.com/login`, { 
        email:email,
        password:password
    })
    .then((res) => {
        localStorage.setItem("token",res.token)
    });
  }

  return (
    <div className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form className={classes.form}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default LoginPage;