import React, {useRef, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import mainTheme from '../../styles/theme';
import { createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Footer from '../Footer/Footer';

const theme = createTheme();

export default function SignIn() {
  
  const [loginStatus, setLoginStatus] = useState("")
  const emailRef = useRef()
  const passwordRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var email = data.get('email');
    var password =  data.get('password');
    if(email !== null && email.length > 1 && password !== null && password.length > 1){
      axios.post("/signIn", {
        email,
        password
      }).then((resp) => {
        if(typeof(resp.data) === "string"){
          setLoginStatus(resp.data)
        }
        else if(typeof(resp.data) === "object"){
           navigate("/")
           dispatch({
             type:"authencticate",
             payload:true
           })
        }
      })
    }
    else{
      setLoginStatus("invalid email/password")
    }
  };

  return (
    <Box  sx={{backgroundColor:mainTheme.palette.info.main,width:"100%",height:"auto",}}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5"  color={mainTheme.palette.text.main}>
            Sign in
          </Typography>
          <Typography
            variant="p"
            sx={{height:"20px"}}
            >
           {loginStatus}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              ref={emailRef}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              ref={passwordRef}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 4, backgroundColor: mainTheme.palette.secondary.main }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid 
              item
              sx={{mb:2}}>
                <Link 
                 to="/signUp" 
                 >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
         </Box>
       </Container>
      <Footer />
    </Box>
  );
}
