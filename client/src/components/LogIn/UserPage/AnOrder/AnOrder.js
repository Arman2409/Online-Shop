import React from "react";
import mainTheme from "../../../../styles/theme";
import {Grid, Typography, Button} from "@mui/material";
import PhoneCard from "../../../Watch/Order/PhoneCard/PhoneCard";
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

function AnOrder({order}){
    const navigate = useNavigate()

   function markReceived(){
       axios.post("https://smarttouch.onrender.com/markReceived", {order}).then((resp) => {
           navigate("/orderFinished")
       })
   }

    return(
        <Grid
         container
         sx={{width:"100%", flexDirection:  {xs: "column", md:"row"},position:"relative",height:{xs: "315px",sm: "200px", md:"150px"},backgroundColor:mainTheme.palette.primary.main,border:`2px solid ${mainTheme.palette.success.main}`,margin:"15px 0","&:hover":{border:`8px solid ${mainTheme.palette.success.main}`,transition:"0.2s"}}}>
         <Grid
         item
         width="300px"
         sx={{position: {xs: "absolute", md:"static"}, top: {xs:"initial",sm:"0px"}, right: {xs:"initial",sm:"0px"},bottom:{xs: "0px", sm:"initial"},left:{xs:"0px", sm:"initial"}}}
         >
            <PhoneCard phone={order.phone} />
         </Grid>
         <Grid
         item
         sx={{display:"flex", pl: {xs: "10px", md: 0},width: {xs: "70%", md: "25%"},alignItems:{xs:"flex-start",md:"center"},justifyContent:"center",flexDirection:"column"}}
         >
             <Typography
              variant="h6"
              color={mainTheme.palette.text.main}
              sx={{fontSize: {xs: "15px", md:"initial"}}}
             >
               Address: <Typography
                          variant="p">
                          {order.address}
                       </Typography>
             </Typography>
             <Typography
              variant="p"
              color={mainTheme.palette.text.main}
             >
               Ordered at:<br/> <Typography
                         color={mainTheme.palette.text.dark}
                          variant="p"
                          sx={{fontSize: {xs: "10px", md:"12px"}}}>
                          {order.date}
                       </Typography>
             </Typography>
         </Grid>
         <Grid
          item
          sx={{display:"flex", pl: {xs: "10px", md: 0}, width: {xs: "80%", md: "25%"},alignItems:{xs:"flex-start",md:"center"},justifyContent:"center",flexDirection:"column"}}
          >
              <Typography
               variant="p"
               color={mainTheme.palette.text.main}>
                  Paid with card:<Typography
                                    color={mainTheme.palette.text.dark}>
                                    {order.card.cardNumber}
                                    </Typography>
              </Typography>
          </Grid>
          <Grid
          item
          sx={{display:"flex",pl: {xs: "10px", md: 0}, width: {xs: "80%", md: "25%"},alignItems:{xs:"flex-start",md:"center"},justifyContent:"center",flexDirection:"column"}}
          >
              <Button
               variant="outlined"
               sx={{color:mainTheme.palette.success.main,border:`1px solid ${mainTheme.palette.text.main}`}}
               onClick={markReceived}>
                  Mark as received
              </Button>
          </Grid>
        </Grid>
    )
}

export default AnOrder