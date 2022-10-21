import React from 'react';
import mainTheme from '../../../styles/theme';
import { Box, Avatar, Typography, Container, Grid, Link} from "@mui/material";

function Contacts(){
    return(
     <Box
        component="section"
        width="100%"
        sx={{backgroundColor:mainTheme.palette.info.main,margin:"0", padding: {xs: "0 7px", md:"0 70px"}, height: {xs: "775px", md: "600px"}}}>
         <Box
          container
          sx={{margin:"0",border:`5px solid ${mainTheme.palette.secondary.main}`,backgroundColor:mainTheme.palette.primary.main,width:"100%",display:"flex",flexDirection:{xs:"column", md: "row"} ,height:{xs: "360px",md:"225px"},paddingLeft:"0px",paddingRight:"0px"}}
          >
            <Box 
             sx={{marginLeft:"15px", width: {xs:"100%", md: "50%"}}}
             >
              <Typography
               variant="h3"
               color={mainTheme.palette.text.main}
                
               >
                 Our address 
             </Typography>
             <Typography
              variant="h5"
              color={mainTheme.palette.text.dark}
              sx={{marginTop:"8px"}}
              >
                 137 Macquarie St,Sydney,Australia
              </Typography>
            </Box>
            <Link
           target="_blank"
           href="https://www.google.com/maps/place/137+Macquarie+St,+Sydney+NSW+2000,+Australia/@-33.8643151,151.2102144,17z/data=!3m1!4b1!4m5!3m4!1s0x6b12ae6988a8204d:0x5b8a44811e77d133!8m2!3d-33.8643151!4d151.2124085"
           >
            <Avatar
               variant="square"
               src="assests/contacts/map.png"
               sx={{width:"300px",height:"215px"}}
             >
            </Avatar>
          </Link>
         </Box>
        <Grid
           container
           width="100%"
           sx={{backgroundColor:mainTheme.palette.primary.main, flexDirection: {xs: "column",md:"row"},height:{xs: "350px",md:"225px"}}}>
              <Grid 
               item
               sx={{backgroundColor:mainTheme.palette.primary.main,border:`5px solid ${mainTheme.palette.secondary.main}`,width: {xs: "100%",md: "50%"},height:{xs: "50%",md:"100%"}}}
               >
                  <Typography
                   variant="h4"
                   color={mainTheme.palette.text.main}
                   sx={{textAlign:"center"}}
                   >
                   Phones
                  </Typography>
                  <Typography
                   variant="p"
                   color={mainTheme.palette.text.dark}
                   sx={{display:"block", margin:"4px"}}
                   >
                      05 8596 2562
                   </Typography>
                   <Typography
                   variant="p"
                   color={mainTheme.palette.text.dark}
                   sx={{display:"block", margin:"4px"}}
                   >
                      04 8596 2562
                   </Typography>
                   <Typography
                   variant="p"
                   color={mainTheme.palette.text.dark}
                   sx={{display:"block", margin:"4px"}}
                   >
                      04 8596 2752
                   </Typography>
               </Grid>
               <Grid 
               item
               height="100%"
               sx={{backgroundColor:mainTheme.palette.primary.main,border:`5px solid ${mainTheme.palette.secondary.main}`, height:{xs: "50%",md:"100%"},borderRight: "0px", width: {xs: "100%",md: "50%"}}}
               >
                  <Typography
                   variant="h4"
                   color={mainTheme.palette.text.main}
                   sx={{textAlign:"center"}}
                   >
                   Mails
                  </Typography>
                  <Typography
                   variant="p"
                   color={mainTheme.palette.text.dark}
                   sx={{display:"block", margin:"4px"}}
                   >
                     smartClickInfo@gmail.com
                  </Typography>
                  <Typography
                   variant="p"
                   color={mainTheme.palette.text.dark}
                   sx={{display:"block", margin:"4px"}}
                   >
                     questionssmartClcik@gmail.com
                  </Typography>
               </Grid>
        </Grid>
      </Box>
    )
}

export default Contacts