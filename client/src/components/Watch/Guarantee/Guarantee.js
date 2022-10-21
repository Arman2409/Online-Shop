import React from 'react';
import mainTheme from '../../../styles/theme';
import {Box,Typography} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function Guarantee(){
    return(
        <Box
        sx={{border:`1px solid ${mainTheme.palette.action.main}`,backgroundColor:mainTheme.palette.primary.main,width:"300px",display:"inline-block"}}
       >
         <Typography
          variant="p"
          color={mainTheme.palette.text.dark}
           sx={{fontSize:"15px"}}>
            <CheckCircleOutlineIcon 
               sx={{fontSize:"15px",color:mainTheme.palette.text.main,marginRight:"5px"}}/>
             Our clients are protected for 30 days of guaranteed delivery time.If 60 days pass from the
             ordering day and the order wasn't delivered yet you will be paid back.
        </Typography>
       </Box>
    )
}

export default Guarantee