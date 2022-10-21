import React, { useEffect, useRef, useState } from 'react';
import {Box, Card, CardActions, CardContent,Button, CardMedia, Typography,CircularProgress } from"@mui/material";
import { useLocation , useNavigate} from 'react-router-dom';
import Guarantee from './Guarantee/Guarantee';
import mainTheme from '../../styles/theme';
import Footer from '../Footer/Footer';

function Property( {property,value} ){
    const location = useLocation()
    const phoneData = useRef()
   

    return(
        <Typography
          variant="h6"
          color={mainTheme.palette.text.dark}
          sx={{margin:"5px 0"}}
        >
         {property} : 
           <Typography color={mainTheme.palette.info.main} style={{marginLeft:"10px",display:"inline-block"}}>
            {value}
           </Typography>
        </Typography>
    )
}


function Watch( {phone} ){
  const location = useLocation()
    const phoneData = useRef()
    const navigate = useNavigate();
    const [ifLoaded,setIfLoaded] = useState(false)

    useEffect(() => {
      phoneData.current = phone
      console.log(phoneData.current);
      setIfLoaded(true)
    }, [])

    function orderProduct(){
      console.log(phoneData.current)
      console.log(window.location.pathname)
      const index = window.location.pathname.slice(6,7);
          navigate(`/order${index}`)
    }

    return(
      <Box
        width="100%"
       height="auto"
      >
        {(ifLoaded) ? 
           <Card 
             sx={{display:"flex",flexWrap:"wrap",padding:"20px"}}
            >
             <CardMedia
               component="img"
               sx={{height:"300px",width:"270px"}}
               image={`${phoneData.current.image}`}
             />
              <CardContent
               sx={{padding:"25px",width:{xs: "85%", md:"35%"}}}
              >
                <Typography 
                  variant="h3"
                  color={mainTheme.palette.text.main}
                >
                  {phoneData.current.model}
                  </Typography>
                
                  <Property property="Screen" value={phoneData.current.screen} />
                  <Property property="RAM" value={phoneData.current.ram} />
                  <Property property="Internal Memory" value={phoneData.current.screen} />
                 <Property property="Camera" value={phoneData.current.screen} />
                   
                 <Typography
                   variant="h5"
                   margin="30px 40px"
                   sx={{color:mainTheme.palette.text.dark}}
                  >
                    Price:
                    <Typography
                     variant="h5"
                     sx={{color:mainTheme.palette.text.main,display:"inline-block",marginLeft:"10px"}}
                    >
                     {phoneData.current.price}
                    </Typography>
                 </Typography>
              </CardContent>
              {/* {window.innerWidth > 700 ? */}
              <CardContent
               sx={{padding:{sm: "50px 0px", md: "95px 50px"},width:"30%"}}
               >
               <Guarantee />
             </CardContent>
             {/* : null } */}
             <CardActions
                sx={{width:"100%",display:"flex",justifyContent:"center"}}>
                 <Button 
                   onClick={orderProduct}
                   variant="outlined">
                     Order
                  </Button>
             </CardActions>
           </Card>
          : 
          <CircularProgress 
            sx={{margin:"250px"}}
          />
        }
        <Footer />
     </Box>
    )
}

export default Watch