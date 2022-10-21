import React from 'react';
import './styles/main.scss';
import mainTheme from './styles/theme.js';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import {Container, CssBaseline } from '@mui/material';
import {StylesProvider} from "@mui/styles";
import axios from "axios";
import { useState, useEffect, useRef } from 'react';
import Watch from './components/Watch/Watch';
import { Provider } from 'react-redux';
import store from './store/store';
import Header from "./components/Header/Header";
import Home from './components/Home/Home';
import SignIn from './components/LogIn/SignIn';
import SignUp from './components/LogIn/SignUp/SignUp';
import Order from './components/Watch/Order/Order';
import UserPage from './components/LogIn/UserPage/UserPage';
import Ordered from './components/Watch/Order/Ordered/Ordered';
import Finished from './components/LogIn/UserPage/Finished/Finished';



function App() {
  const phonesArr = useRef()
  const [loaded,setLoaded] = useState(false)

  useEffect(() => {
    axios.get("/smartphonesData").then(function(resp){
      console.log(resp.data);
      phonesArr.current = resp.data
      setLoaded(true)
    })
  }, [])

  return (
    <Router>
       <Provider store={store}>
        <div style={{backgroundColor: mainTheme.palette.primary.main, height: '100vh'}}>
         <StylesProvider>
           <CssBaseline/>
           <Header />
           <Routes>
           <Route exact path="/" element={<Home />}>
           </Route>
           <Route path="/signIn" element={<SignIn />} />
           <Route path="/signUp" element={<SignUp />} />
           <Route path="/userPage" element={<UserPage /> } />
           <Route path="/ordered" element={<Ordered /> } />
           <Route path="/orderFinished" element={<Finished /> } />
           {(loaded) ? 
            phonesArr.current.map((phone, index) => (
              <Route key={index} path={`/watch${index + 1}`} element={<Watch phone={phonesArr.current[index]} />}>
              </Route>
            ))
           : null}
            {(loaded) ? 
            phonesArr.current.map((phone, index) => (
               <Route key={index} path={`/order${index + 1}`} element={<Order phone={phonesArr.current[index]} />}>
              </Route>
            ))
           : null}
           </Routes>
         </StylesProvider>
         </div>
       </Provider>  
    </Router>
  );
}

export default App;
