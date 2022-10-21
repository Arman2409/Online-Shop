import React from 'react';
import mainTheme from '../../../../styles/theme';
import {Box, Typography, Link} from '@mui/material';
import Footer from '../../../Footer/Footer';

function Ordered(){
    return(
     <>
        <Box 
         width="100%"
         height="400px"
         sx={{backgroundColor:mainTheme.palette.action.main,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}
         >
             <Typography
              variant="h3"
              color={mainTheme.palette.success.main}>
                 Ordered succesfully!
             </Typography>
             <Link
             href="/"
             >
                 Back to Home page
             </Link>
         </Box>
         <Footer />
      </>
    )
}

export default Ordered