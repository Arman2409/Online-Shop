import React, {useEffect,useState, useRef, useMediaQuery} from 'react';
import mainTheme from '../../../styles/theme';
import { Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ListIcon from '@mui/icons-material/List';
import anime from 'animejs';


function Menu(){
    const animeRef = useRef(null)
    const intervalRef = useRef()
    const iconRef = useRef()
    const [colorState,setColorState] = useState()
    const [menuState,setMenuState] = useState("closed") 
    
    function animate(){
      if(menuState === "closed"){
        iconRef.current.style.transform = "rotate(90deg)"
        if( window.innerWidth > 700) {
        animeRef.current = anime({
          targets: '.function-based-values-demo .el',
          translateX: function(el) {
            return el.getAttribute('data-x');
          },
          translateY: function(el, i) {
            return 250 + (-50 * i);
          },
          scale: function(el, i, l) {
            return (l - i) + 2;
          },
          rotate: function() { return anime.random(-60,60); },
          borderRadius: function() { return ['50%', anime.random(10, 35) + '%']; },
          opacity:1,
          duration: function() { return anime.random(1200, 1800); },
          delay: function() { return anime.random(0, 400); },
        })
        } else {
          animeRef.current = anime({
            targets: '.function-based-values-demo .el',
            translateX: function(el, i) {
              return -100 + i;
            },
            translateY: function(el, i) {
              return 200 + (-150 * i);
            },
            scale: function(el, i, l) {
              return (l - i);
            },
            rotate: function() { return anime.random(-60,60); },
            borderRadius: function() { return ['50%', anime.random(10, 35) + '%']; },
            opacity:1,
            duration: function() { return anime.random(1200, 1800); },
            delay: function() { return anime.random(0, 400); },
          })
        }
        setMenuState("opened")
      }
      else if(menuState === "opened"){
        iconRef.current.style.transform = "rotate(0deg)"
        animeRef.current = anime({
          targets: '.function-based-values-demo .el',
          translateX: 0,
          translateY:0,
          scale: 0,
          rotate: function() { return anime.random(-50,50); },
          borderRadius: function() { return ['50%', anime.random(10, 35) + '%']; },
          opacity:0,
          duration: function() { return anime.random(1200, 1800); },
          delay: function() { return anime.random(0, 400); },
        })
        setMenuState("closed")
      }
    }

    useEffect(() => {
      setColorState("")
      setColorState(mainTheme.palette.secondary.main)
      setTimeout(() => {
        setColorState(mainTheme.palette.text.dark)
      },1000)
      intervalRef.current = setInterval(() => {
        setColorState(mainTheme.palette.secondary.main)
        setTimeout(() => {
           setColorState(mainTheme.palette.text.dark)
        },1000)
        setTimeout(() => {
          setColorState(mainTheme.palette.text.main)
        }, 2000)
      }, 3000)
    }, [])

    return(
        <Box
          component="section"
          height="120px"
          padding="20px"
          position="relative"
          sx={{display:"flex",backgroundColor:mainTheme.palette.action.main,alignItems:"center",border:`10px solid ${mainTheme.palette.primary.dark}`}}
        >
           <Typography
            variant="h3"
            sx={{transition:"1.5s", fontSize: {xs: "20px", md: "30px", lg:"35px"}, width: {}}}
            color={colorState}>
             Welcome to SmartTouch!
           </Typography>
           <Typography
            variant="h6"
            position="absolute"
            sx={{bottom:"0px", fontSize: {xs: "0px", sm: "22px"},left:{xs: "0",sm:"50px"},backgroundColor:mainTheme.palette.text.main, color:mainTheme.palette.text.dark}}
            >
              Meet top rating smartphones here
            </Typography>
            <Box 
             width="0px"
             height="0px"
             className="function-based-values-demo"
             sx={{marginLeft:"50%",zIndex:3}}
             >
              <Box
               component="div"
               sx={{width:"50px",height:"50px",backgroundColor:mainTheme.palette.primary.main,position:"absolute",opacity:0,display:"flex",justifyContent:"center",alignItems:"center",overflow:"hidden",zIndex:2}}
               data-x="-550"
               className="el"
               >
                <Link
                to="/signUp"
                padding="100px"
                underline="hover"
                sx={{fontSize:"12px",wordBreak:"keep-all"}}
                >
                  Sign Up
                </Link>
              </Box>
              <Box
               sx={{width:"50px",height:"50px",backgroundColor:mainTheme.palette.primary.main,position:"absolute",opacity:0,display:"flex",justifyContent:"center",alignItems:"center",overflow:"hidden",zIndex:2,fontSize: "11px",}}
               data-x="-350"
               className="el"
              >
                <a
                href="https://www.gsmarena.com/"
                target="_blank"
                style={{underline:"hover", padding: "20px"}}
                >
                  Compare
                </a>
              </Box>
            </Box>
            <Button 
            onClick={animate}
            variant="contained"
            className="function-based-values-demo"
            sx={{width: {xs: "30px" ,md:"50px"},padding:{xs: "0px", md: "15px"}, marginLeft: 'auto', height:{xs: "30px" ,md:"50px"},backgroundColor:mainTheme.palette.secondary.main}}
            >
              <ListIcon
               ref={iconRef}
               sx={{transition:"0.5s"}} />
            </Button>
        </Box>
    )
}

export default Menu