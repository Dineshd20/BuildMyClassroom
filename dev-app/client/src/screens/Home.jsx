import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import{useNavigate} from 'react-router-dom'
import Navbar from './Navbar';
import defaultImage from ".././img/buildmyclassroom.svg";
import Navbarnologin from './Navbarnologin';
const Home = () => {


   

    
  
  return (

 


    <div className='min-h-screen bg gray-100 text-gray-900 flex justify-center mt-14 bg-gradient-to-r from-indigo-500 ...'>
        
        <ToastContainer/>
        {isAuth()?<Navbar/>:<Navbarnologin/>}
        <div className="  m-10 justify-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-10  p-2 mt-10 text-center" >
        
        
        <h1 className='self-center text-3xl  font-serif  text-center   text-black-500'>HELP STUDENTS WITH THEIR NEEDS TO SUCCEED IN LIFE</h1>        
         <p>Quo repellendus aperiam ut velit quis sit consequatur laborum a iusto doloribus qui magni eius et voluptas amet a aspernatur dolorem. Quo repellendus aperiam ut velit quis sit consequatur laborum a iusto doloribus qui magni eius et voluptas amet a aspernatur dolorem. </p>

        </div>


        







               
       
        
    </div>
  )
}

export default Home;