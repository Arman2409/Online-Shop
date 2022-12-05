import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import mainTheme from '../../../styles/theme'
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Footer from '../../Footer/Footer';
import axios from 'axios';


export default function SignUp() {

  const [signUpStatus,setSignUpStatus] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var firstName = data.get('firstName');
    var lastName = data.get('lastName');
    var email = data.get("email");
    var password = data.get("password");
    if(firstName !== null && firstName.length > 1 && lastName !== null && lastName.length > 1 && email !== null && email.length > 4 && password !== null && password.length > 1){
      axios.post("https://smarttouch.onrender.com/signUpUser",{
        firstName,
        lastName,
        email,
        password
      }).then(resp => {
        setSignUpStatus(resp.data)
      })
    }
    else{
      setSignUpStatus("Invalid name/mail or password")
    }
  };

  return (
    <Box  sx={{backgroundColor:mainTheme.palette.info.main,width:"100%",height:"auto",}}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color={mainTheme.palette.text.main}>
            Sign up
          </Typography>
          <Typography
            variant="p"
            sx={{height:"20px"}}
            >
           {signUpStatus}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,backgroundColor: mainTheme.palette.secondary.main }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signIn" >
                  Already have an account? Sign in
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