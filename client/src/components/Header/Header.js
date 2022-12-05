import React, {useEffect, useState, useRef} from 'react';
import {AppBar, Box, Grid, Link, Typography} from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import mainTheme from '../../styles/theme';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useSelector } from 'react-redux';


function Header(){
  const navigate =  useNavigate()
  const userName = useRef()
  const userData = useRef(false)
  const [userStatus,setUserStatus] = useState("Loading...")
  const authState = useSelector(function(state){
    return state.authenticated
  })
  
  function logIn(){
    if(userData.current){
       navigate("/userPage")
    }
    else{
      navigate("signIn")
    }
  }

  useEffect(() => {
    axios.get("https://smarttouch.onrender.com/authenticated").then((resp) => {
      console.log(resp.data)
      if(typeof(resp.data) === "object"){
         userData.current = resp.data
         setUserStatus(userData.current.firstName + " " + userData.current.lastName)
      }
      else{
         setUserStatus("Log In")
      }
    })
  }, [authState])

  useEffect(() => {
      axios.get("https://smarttouch.onrender.com/authenticated").then((resp) => {
        console.log(resp.data);
        if(typeof(resp.data) == "object"){
           userData.current = resp.data
           setUserStatus(userData.current.firstName + " " + userData.current.lastName)
        }
        else{
           setUserStatus("Log In")
        }
      })
  }, [])

  return(
    <>
      <AppBar
       position = "fixed"
       sx={{backgroundColor:mainTheme.palette.primary.main, display: "flex",flexDirection: "row", height:"60px",boxSizing:"border-box", padding:"5px 50px",justifyContent:{xs: "initial",sm:"space-between"}}}
      >
        <Grid
         container
         height="50px"
         width="150px"
         sx={{justifyContent:"center",alignItems:"center"}}>
          <Link 
           href="/" 
           variant="body2"
           display="flex"
           underline="none">
            <SmartphoneIcon
            item
            sx={{fontSize:"25px",color:mainTheme.palette.text.main}}/>
            <Typography
             variant="h1"
             sx={{fontSize:"20px",color:mainTheme.palette.text.main}}
             >
               SmartTouch
            </Typography>
          </Link>
        </Grid>
        <Box
         onClick={logIn}
         sx={{alignItems:"center",ml: "25px", width: {xs: "75px", md: "150px"},justifyContent:"center",display:"flex",cursor:"pointer"}}
        >
         <AccountBoxIcon 
           sx={{fontSize:"25px",color:mainTheme.palette.text.dark}}
         />
           <Typography
             variant="p"
             sx={{fontSize:"15px",color:mainTheme.palette.text.dark}}>
             {userStatus}
           </Typography>
        </Box>
      </AppBar>
      <Box 
       height="60px"
       >

      </Box>
    </>
  )
}

export default Header