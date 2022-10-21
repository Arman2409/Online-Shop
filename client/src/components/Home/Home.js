import React from 'react';
import Menu from './Menu/Menu';
import Products from './Products/Products';
import Contacts from'./Contacts/Contacts';
import Footer from '../Footer/Footer'

function Home(){
    return(
        <>
         <Menu />
         <Products />
         <Contacts />
         <Footer />
        </>
    )
}

export default Home