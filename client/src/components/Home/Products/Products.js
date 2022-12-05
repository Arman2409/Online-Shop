import React, { useEffect, useState, useRef } from 'react';
import {Box, Card, Typography, CardActions, CardMedia, Button, CardContent, CircularProgress, useMediaQuery} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Masonry from "@mui/lab/Masonry";
import mainTheme from '../../../styles/theme';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';


const heights = [670, 610, 650, 700, 675, 665, 690, 725, 680, 580, 600, 575, 765, 735, 690, 595, 645, 675, 700]


function Products(){
  const dispatch = useDispatch()
  
  const [loadStatus,setLoadStatus] = useState(false)
  const phonesArray = useRef([])
  const heightsArray = useRef([])
  const navigate = useNavigate()
  const theme = useTheme();
  const mdOnly = useMediaQuery(theme.breakpoints.down("md"));
  const smOnly = useMediaQuery(theme.breakpoints.down("sm"));


  function watchProduct(index){
    console.log(index);
    navigate(`/watch${index + 1}` , { state:phonesArray.current[index], replace:false})
  }

   useEffect(() => {
    axios.get("https://smarttouch.onrender.com/smartphonesData").then(function(resp){
      console.log(resp.data);
      phonesArray.current = resp.data
      heightsArray.current = heights.slice(0, phonesArray.current.length)
      setLoadStatus(true)
      dispatch({
        type:"setSmartphones",
        payload:phonesArray.current
      })
    })
   }, [])
 

    return(
        <Box 
         component="section"
         height={smOnly ? "7000px" : mdOnly ?  "4000px" : "2500px"}
         display="flex"
         backgroundColor={mainTheme.palette.info.main}
         sx={{justifyContent:"center",alignItems:smOnly ? "flex-start" : "center", paddingTop: smOnly ? "20px" : "0px"}}
         >
          {(loadStatus) ? 
          <Masonry 
           columns={smOnly ? "1" : mdOnly ? "2" : "3" }
           spacing="2"
           sx={{width:"90%",height:"90%"}}
            >
              {heightsArray.current.map((heightItem,index) => (
               <Card 
                key={index} 
                sx={{height:heightItem,boxShadow:3,position:"relative","&:hover":{border:`15px solid ${mainTheme.palette.primary.main}`,transition:"0.5s"}}}
                variant="outlined">
                 <CardMedia
                  component="img"
                  height="350px"
                  image={phonesArray.current[index].image}
                  />
                  <CardContent >
                    <Typography
                     variant="h4"
                     sx={{color:mainTheme.palette.text.main,textAlign:"center",marginBottom:"20px"}}>
                     {phonesArray.current[index].model}
                    </Typography>
                    <Typography
                     variant="p"
                     color={mainTheme.palette.text.dark}
                     sx={{fontSize:"18px"}}
                     >
                      Screen: <span style={{color:mainTheme.palette.action.main}}>{phonesArray.current[index].screen}</span>
                    </Typography>
                    <br></br>
                    <Typography
                     variant="p"
                     color={mainTheme.palette.text.dark}
                     sx={{fontSize:"18px"}}
                     >
                      RAM: <span style={{color:mainTheme.palette.action.main}}>{phonesArray.current[index].ram}</span>
                    </Typography>
                 </CardContent>
                 <CardActions
                 sx={{position:"absolute",bottom:"20px"}}>
                   <Button 
                    size="small" 
                    variant="outlined"
                    onClick={() => watchProduct(index)}
                    >
                      Watch
                   </Button>
                 </CardActions>
               </Card>
                         )) 
              }
          </Masonry> 
          : <CircularProgress sx={{alignSelf: "flex-start", marginTop: "125px"}}/>}
         </Box>
    )
}

export default Products