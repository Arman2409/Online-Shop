import React from 'react';
import {Typography, Link} from '@mui/material'


function Copyright(props) {

    return (
      <Typography variant="body2" color="text.secondary" align="center"sx={{margin:0}} {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/">
           SmartTouch
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

export default Copyright