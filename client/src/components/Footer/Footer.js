import React from "react";
import {Box, Grid, Link, Typography} from '@mui/material';
import mainTheme from "../../styles/theme";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Copyright from "./Copyright/Copyright";

function Footer() {
  return(
      <Box
       height="150px"
       sx={{backgroundColor:mainTheme.palette.primary.main,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}
       >
         <Box
          height="50px"
          width="300px"
          sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}
          >
            <Typography
             variant="h5"
             color={mainTheme.palette.text.main}
             >
                 SmartClick
            </Typography>
            <Grid 
            container
            height="50px"
            width="150px"
            >
                 <Grid
                 item
                 sx={{width:'50px',display:"flex",alignItems:"center",justifyContent:"center"}}
                 >
                   <Link
                    href="https://www.facebook.com/"
                    target="_blank"
                    >
                      <FacebookIcon
                       sx={{fontSize:"35px",color:mainTheme.palette.info.main}} 
                       />
                    </Link>
                 </Grid>
                 <Grid
                 item
                 sx={{width:'50px',display:"flex",alignItems:"center",justifyContent:"center"}}
                 >
                    <Link
                    href="https://www.linkedin.com/"
                    target="_blank"
                    >
                      <LinkedInIcon
                      sx={{fontSize:"35px",color:mainTheme.palette.info.main}}  
                      />
                    </Link>
                 </Grid>
                 <Grid
                 item
                 sx={{width:'50px',display:"flex",alignItems:"center",justifyContent:"center"}}
                 >
                   <Link
                    href="https://www.instagram.com/"
                    target="_blank"
                    >
                      <InstagramIcon 
                      sx={{fontSize:"35px",color:mainTheme.palette.info.main}}
                       />
                    </Link>
                 </Grid>
           </Grid>
          </Box>
          <Box
           height="15px"
           width="300px"
           >
            <Copyright />
           </Box>
           <Typography 
           sx={{margin:0,fontSize:"12pxcdcd"}} 
           color={mainTheme.palette.text.dark}>
             Made with Material UI by Ghazaryan Arman.
           </Typography>
        </Box>
   )
}

export default Footer