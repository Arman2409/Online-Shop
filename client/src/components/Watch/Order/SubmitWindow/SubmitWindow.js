import React, { useEffect, useRef } from 'react';
import mainTheme from '../../../../styles/theme';
import {Box, Typography, TextField, Button} from "@mui/material";
import axios from'axios';
import './SubmitWindow.scss';
import { useNavigate } from 'react-router-dom';

function SubmitWindow({phoneData, cardData, addressData, phoneNumberData}){
    console.log(cardData,phoneData,addressData);
    const phone = useRef()
    const card = useRef()
    const address = useRef()
    const phoneNumb = useRef()
    const today = useRef()
    const navigate = useNavigate()

    useEffect(() => {
       phone.current = phoneData
       card.current = cardData
       address.current = addressData
       phoneNumb.current = phoneNumberData
    }, [])

    function submitOrder(){
        var today = new Date()
        var dd = String(today.getDate()).padStart(2,"0")
        var mm = String(today.getMonth() + 1).padStart(2,"0")
        var yyyy = today.getFullYear()

        today.current = dd + "/" + mm + "/" + yyyy
        axios.post("https://smarttouch.onrender.com/order",{
            phone:phone.current,
            card:card.current,
            date:today,
            address:address.current,
            number:phoneNumb.current
        })
        navigate("/ordered")
    }
    return(
        <Box 
         width="100%"
         height="100%"
         position="absolute"
         sx={{zIndex:2,backgroundColor:mainTheme.palette.action.main,opacity:"0.95",display:"flex",justifyContent:"center",alignItems:"center"}}>
             <Box 
              width="200px"
              height="200px"
              sx={{border:`2px solid ${mainTheme.palette.success.main}`,display:"flex",flexDirection:"column",alignItmes:"center",padding:"5px",backgroundColor:mainTheme.palette.secondary.main}}>
                
                  <TextField
                   type="number"
                   id="code-input"
                   helperText="Enter any verification code"
                   sx={{marginTop:"20px"}}
                   required
                   >
                   </TextField>
                   <Button
                   variant="outlined"
                   sx={{marginTop:"10px"}}
                   onClick={submitOrder}
                   >
                     Submit Order
                   </Button>
             </Box>
        </Box>
    )
}

export default SubmitWindow