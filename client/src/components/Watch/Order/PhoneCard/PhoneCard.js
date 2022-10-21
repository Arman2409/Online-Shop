import React, {useEffect, useRef} from 'react';
import {Card, CardMedia, CardContent, Typography} from '@mui/material';
import mainTheme from '../../../../styles/theme';
import {useNavigate} from 'react-router-dom';

function PhoneCard({phone}){
    const navigate = useNavigate()

    function showPhone(){
        navigate(`/watch${phone.id}`)
    }
    return(
        <Card
        sx={{height:"120px", width:"300px",display:"inline-flex",boxShadow:3,mr:"75px",cursor:"pointer"}}
        onClick={showPhone}
         >
            <CardMedia
            component="img"
            image={`${phone.image}`}
            sx={{height:"120px",width:"100px"}}
             />
            <CardContent>
                <Typography
                sx={{display:"flex"}}
                color={mainTheme.palette.text.main}
                variant="h5">
                  Model:<Typography
                         sx={{display:"inline-block"}}
                         color={mainTheme.palette.text.dark}>
                          {phone.model}
                         </Typography>
                </Typography>
                <Typography
                 sx={{marginTop:"10px"}}
                 color={mainTheme.palette.text.main}>
                    {phone.price}
                </Typography>
            </CardContent>
        </Card> 
    )
}

export default PhoneCard