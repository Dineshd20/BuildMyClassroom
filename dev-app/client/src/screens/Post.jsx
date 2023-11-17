import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {  isAuth, getCookie, signout } from '../helpers/auth';

import{useNavigate} from 'react-router-dom'
import moment from "moment";
import Navbar from './Navbar';


const Post = () => {

    const navigate = useNavigate();
    useEffect(()=>{
        loadProfile()
      },[])

    const loadProfile = () =>{
        const token = getCookie('token')
      
        if(!getCookie('token')){
          navigate('/login')}
    }
    const [formData, setFormData] = useState({
        itemname:"",
        description:"",
        quantity:"",
        preferredDate:"",
        delivery:"",
        location:"",
        contact:"",
        file: ""
        
      
    })
    
    function dateblock() {
        const date = new Date();
        return moment(date).format("YYYY-MM-DD");
       
      }
    const {itemname,description,quantity,preferredDate,delivery,location,contact, file} = formData
    //Handle inputs
    const handleChange = text=>e=>{
        setFormData({...formData, [text]:e.target.value})
       
    }
    //send data to backend
    const handleSubmit =e=>{
        e.preventDefault()
       const author =isAuth()._id;
        const date= new Date();
        if(itemname,description,quantity,preferredDate,delivery,location,contact ){
                    axios.post(`http://localhost:8000/api/post`,{
                        itemname,description,quantity,preferredDate,delivery,location,contact, author, date, file
                    }).then(res=>{
                        setFormData({...formData,
                            itemname:"",
                            description:"",
                            quantity:"",
                            preferredDate:"",
                            delivery:"",
                            location:"",
                            contact:"",
                            file: ""

                           
           
                        })
                        

                        toast.success(res.data.message)
                    }).catch(err=>{
                        toast.error(err.response.data.error)

                    })
               
        }else{
            toast.error("Please fill all fields")
        }
    }

  
  return (
    <div className='min-h-screen bg gray-100 text-gray-900 flex justify-center'>
        
        <ToastContainer/>
        <Navbar/>
        
        <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
            <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                <h1 className='self-center text-3xl  font-serif  mt-10 tex-center  text-black-500'>New Request</h1>        


                <form className='w-full flex-1 mt-8 text-indigo-500' onSubmit={handleSubmit}>
                    <div className="mx-auto max-w-xs relative">
                        {/* <text className='text-sm px-2 '>Item Name</text> */}
                        <label >Item Name:</label>
                        <input type="text" placeholder='Item Name' onChange= {handleChange('itemname')}
                        value={itemname}
                        className=' mb-3 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                         />
                         <label >Description:</label>
                        <input type="text" placeholder='Description' onChange= {handleChange('description')}
                        value={description}
                        className='mb-3 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                         />
                         <label>Item Quantity:</label>
                        <input type="text" placeholder='Quantity' onChange= {handleChange('quantity')}
                        value={quantity}
                        className=' mb-3 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                         />

                         <label>Preferred Date:</label>
                        <input min={dateblock()} type="date" placeholder='Preferred Date' onChange= {handleChange('preferredDate')}
                        value={preferredDate}
                        className='mb-3 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                         />
                         <label>Delivery Type:</label>
                         <input type="text" placeholder='delivery Type' onChange= {handleChange('delivery')}
                        value={delivery}
                        className='mb-3 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                         />
                         <label>Preferred Location:</label>
                         <input type="text" placeholder='location' onChange= {handleChange('location')}
                        value={location}
                        className='mb-3 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                         />
                         <label>Contact:</label>
                           <input type="text" placeholder='contact' onChange= {handleChange('contact')}
                        value={contact}
                        className=' mb-3 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                         />
                        {/* <input 
                            type="file" 
                            accept=".png, .jpg, .jpeg"
                            name="photo"
                            onChange={handleChange('file')}
                        /> */}
                            
                         <button type="submit"
                         className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                         > Request </button>
                    </div>
                   
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default Post