import React, { useRef , useEffect, useState} from "react";
import {Box, Grid, Button, TextField, Typography, CardContent, CircularProgress} from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Order.scss';
import Footer from "../../Footer/Footer";
import Guarantee from "../Guarantee/Guarantee";
import mainTheme from "../../../styles/theme";
import SubmitWindow from "./SubmitWindow/SubmitWindow";
import PhoneCard from './PhoneCard/PhoneCard';


function Order( {phone} ){

    const navigate = useNavigate()
    const phoneData = useRef()
    const cardData = useRef()
    const address = useRef()
    const phoneNumber = useRef()
    const [infoStatus,setInfoStatus] = useState("Enter your address/card info")
    const [ifLoaded,setIfLoaded] = useState(false)
    const [windowStatus,setWindowStatus] = useState(false)

    const submitOrder = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        var cardNumber = data.get('cardNumber');
        var expireDate =  data.get('expireDate');
        var owner = data.get('owner')
        cardData.current = {
            cardNumber,
            expireDate,
            owner,
        }
        address.current = data.get('address')
        phoneNumber.current = data.get('phone')
        setWindowStatus(true)
    }
    
    useEffect(() => {
        axios.get("/authenticated").then((resp) => {
            console.log(resp.data);
            if(typeof(resp.data) === "object"){
              const index = window.location.pathname.slice(6,7);
              navigate(`/order${index}`)
            }
            else{
              navigate("/signIn")
            }
        })
        phoneData.current = phone
        setIfLoaded(true)
    }, [])

    return(
       <>
       {(ifLoaded) ?
       <Box 
       width="100%"
       sx={{backgroundColor:mainTheme.palette.info.main, height: {md:"400px", xs: "800px"}}}>
           {(windowStatus) ? 
          <SubmitWindow phoneNumberData={phoneNumber.current} phoneData={phoneData.current} cardData={cardData.current} addressData={address.current} />
           : null
           }
          <PhoneCard phone={phoneData.current} />
         <Guarantee />
        <Box
         component="form"
         onSubmit={submitOrder}
         sx={{ padding:"5px",width:"100%",border:`1px solid ${mainTheme.palette.success.main}`,mt:"50px"}}
         > 
          <Typography
          variant="h5"
          color={mainTheme.palette.text.main}
          >
            {infoStatus}
          </Typography>
          <Grid
           container
           sx={{flexDirection: {md:"row", xs:"column"}}}
            >
             <Grid 
              item
              sx={{
                width: {md:"25%", xs: "80%"}
              }}
              >
               <TextField
               required
               name="cardNumber"
               helperText="card number"
               type="number"
               id="card-number-input"
               >
               </TextField>
              </Grid>
              <Grid 
              item
              sx={{
                width: {md:"25%", xs: "80%"}
              }}
              >
               <TextField
               required
               type="month"
               name="expireDate"
               helperText="expire date"
               >
               </TextField>
              </Grid>
              <Grid 
              item
              sx={{
                width: {md:"25%", xs: "80%"}
              }}
              >
               <TextField
               required
               name="owner"
               helperText="owner"
               type="text"
               >
               </TextField>
              </Grid>
              <Grid 
              item
              sx={{display:"flex",justifyContent:"center", width: {md:"25%", xs: "80%"}}}
              >
               <Button
                type="submit"
                variant="outlined"
                sx={{margin:"10px 0",height:"40px"}}>
                  Submit
               </Button>
              </Grid>
          </Grid>
          <Grid 
           container
          sx={{flexDirection: {xs: "column", md:"row"}}}>
               <Grid
                item
                sx={{width: {md:"40%", xs: "80%"}}}
                >
                 <TextField
                 helperText="enter your address"
                 type="text"
                 name="address"
                 required   
                >  
                 </TextField>
                </Grid>
                <Grid
                 sx={{width: {md:"40%", xs: "80%"}}}
                item>
                  <TextField
                   helperText="enter your phone number"
                   type="text"
                   name="phone"
                   required  
                   id="phone-number-input" 
                  >  
                 </TextField>
                </Grid>
          </Grid>
       </Box>
       </Box>   
        : 
        <CircularProgress 
        sx={{margin:"250px"}}
        />
        } 
        <Footer />
        </>
    )
}

export default Order