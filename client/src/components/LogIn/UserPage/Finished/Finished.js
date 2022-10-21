import React from 'react';
import {Box, Typography} from '@mui/material';
import mainTheme from '../../../../styles/theme';
import Footer from '../../../Footer/Footer';

function Finished(){
    return(
        <>
           <Box
           width="100%"
           height="600px"
           sx={{backgroundColor:mainTheme.palette.info.main,display:"flex",alignItems:"center",justifyContent:"center"}}>
               <Typography
               variant="h2">
                   Your order was succesfully finished!
               </Typography>
           </Box>
           <Footer />
        </>
    )
}

export default Finished