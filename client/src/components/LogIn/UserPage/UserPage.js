import React , {useEffect, useState, useRef} from "react";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import { CircularProgress } from "@mui/material";
import mainTheme from "../../../styles/theme";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Footer from '../../Footer/Footer';
import AnOrder from './AnOrder/AnOrder';
import { useDispatch } from "react-redux";

function UserPage(){
    const navigate = useNavigate()
    const [loaded,setLoaded] = useState()
    const userData = useRef({})
    const dispatch = useDispatch();

    function signOut(){
      axios.get("/signOut").then((resp) => {
        dispatch({type:"signOut"});
        navigate("/");
      })
    }
    
    useEffect(() => {
      axios.get("/authenticated").then((resp) => {
        console.log(resp.data);
        if(typeof(resp.data) === "object"){
           userData.current = resp.data
           console.log(userData.current.orders);
           axios.get("/userOrders").then((resp) => {
            console.log(resp.data);
          })
           setLoaded(true)
        }
        else{
           navigate("/signIn")
        }
      })
     
    }, [])
    
   return(
     <Box
        sx={{width:"100%",height:"100%",backgroundColor:mainTheme.palette.info.main}}
        >
          {(loaded) ? 
          <Box padding="5">
           <Card
           sx={{display:{md:"flex"},width:"60%",height:"190px",backgroundColor:mainTheme.palette.info.main,margin:"0 auto",justifyContent:"center",border:`2px solid ${mainTheme.palette.success.main}`}}
           >
             <CardMedia
             sx={{width:"20%",display:"flex",alignItems:"center"}}>
               <PersonIcon 
                sx={{width:{xs:"50px",md:"100px"}, height:{xs:"50px",md:"100px"},color:mainTheme.palette.primary.dark}}
                />
             </CardMedia>
             <CardContent
              sx={{width:"50%",display:"flex",flexDirection:"column",justifyContent:"center", padding: "8px"}}>
               <Typography
                color={mainTheme.palette.text.main}
                sx={{fontSize:{xs:"15px",md:"25px"}}}>
                  {userData.current.firstName + " " + userData.current.lastName}
               </Typography>
               <Typography
               color={mainTheme.palette.text.dark}>
                 {userData.current.email}
               </Typography>
             </CardContent>
             <CardActions
             sx={{width:{xs: "75%",md:"20%"},display:"flex",alignItems:"center"}}
             >
               <Button
                variant="outlined"
                onClick={signOut}>
                  Sign out
               </Button>
             </CardActions>
           </Card>
           <Box 
           sx={{width:"100%",height:"400px",backgroundColor:mainTheme.palette.action.main}}>
            <Typography
             variant="h3"
             color={mainTheme.palette.info.main}
             sx={{textAlign:"center"}}
             >
               Orders
             </Typography>
             <Box 
              sx={{width:"100%",height:"340px",overflowX:"auto",padding:"10px",border:`1px solid ${mainTheme.palette.text.dark}`,backgroundColor:mainTheme.palette.info.main}}>
                {userData.current.orders.map((order, index) => (
                  <AnOrder key={index} order={order}/>   
                ))}
             </Box>
           </Box>
          </Box>
          : <CircularProgress sx={{margin:"100px"}}/> 
          }
        <Footer />
     </Box>
   )
}

export default UserPage