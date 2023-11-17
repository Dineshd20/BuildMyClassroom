import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import{ useNavigate} from 'react-router-dom'
import Logo from '../img/buildmyclassroom.svg'
import Navbar from './Navbar';
const Private = () => {
  

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    pass1: "",
    textChange:"Update",
    
  })
  const navigate = useNavigate();
  useEffect(()=>{
    loadProfile()
  },[])
  const loadProfile = () =>{
    const token = getCookie('token')
  
    if(!getCookie('token')){
      navigate('/login')
    }else{
      axios.get(`http://localhost:8000/api/user/${isAuth()._id}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).then(res=>{
        const { name, email} = res.data
        setFormData({...formData,  name, email})
      }).catch(err=>{
        toast.error(`Error to your Information ${err.response.statusText}`)
        if(err.response.status === 401){
          signout(()=>{
            navigate('/login')
          })
        }
      })
    }
  }
  const {name, email, pass1, textChange } = formData
  const handleChange = text=>e=>{
    setFormData({ ...formData, [text]: e.target.value });
  }
  const handleSubmit =e=>{
    const token = getCookie('token')
    e.preventDefault()
    if(name && pass1){
      setFormData({ ...formData, textChange:'Updated' });
      axios.put(`http://localhost:8000/api/user/update`, {name, password: pass1},{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).then(res=>{
        updateUser(res, ()=>{
          toast.success('Profile Successfully Updated')
          setFormData({ ...formData, pass1:"", textChange:'Update' });
        })
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
                <div className='mt-2 flex flex-col items-center'>
                    <img className= "h-48 w-48 " src={Logo} alt="logo"/>
                </div>
                <form className='w-full flex-1 mt-8 text-indigo-500' onSubmit={handleSubmit}>
                    <div className="mx-auto max-w-xs relative">
                    <label>Email:</label>
                        <input disabled placeholder='Email'
                        value={email}
                        className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-5'
                         />
                         <label>Name:</label>
                        <input type="text" placeholder='Name' disabled onChange= {handleChange('name')}
                        value={name}
                        className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-5'
                         />      
                        <div className='my-12 border-b text-center'>
                            <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                                Change Password
                            </div>
                        </div>
                                        
                        <input type="password" placeholder='Change Password' onChange= {handleChange('pass1')}
                        value={pass1}
                        className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                         />
                <button
                  type='submit'
                  className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                  <span className='ml-3'>{textChange}</span>
                </button>
                    </div>
                    
                </form> 
                
            </div>
        </div>
    </div>
  )
}

export default Private