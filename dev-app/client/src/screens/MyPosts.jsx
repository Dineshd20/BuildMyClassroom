import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';

import{useNavigate} from 'react-router-dom'

import defaultImage from ".././img/buildmyclassroom.svg";
import moment from "moment";
import Navbar from './Navbar';

const Products = () => {
  const navigate = useNavigate();
  useEffect(()=>{
      loadProfile()
    },[])

  const loadProfile = () =>{
      const token = getCookie('token')
    
      if(!getCookie('token')){
        navigate('/login')}
  }



    const [userReqeusts, setUserReqeusts] = useState([]);
    const getAllRequest = async () => {
        const userId= isAuth()._id;
     
        axios.post(`http://localhost:8000/api/finduserrequest`,{userId}
        ).then((res) => {
            setUserReqeusts(res.data);
         
          })
          .catch((err) => {});
      };

      

    const deleteEvent = (_id) => {
     
        if (_id) {
            axios.post(`http://localhost:8000/api/deleterequest`,{
                _id}).then((res) => {
              toast.success("Successfully deleted Events");
              getAllRequest();
            })
            .catch((err) => {});
        } else {
          toast.error("Please try again");
        }
      };

      const dateFormat=(date)=>{
        return moment(date).format("MMM Do YY")
      }

      useEffect(() => {
        getAllRequest();
      }, []);
    
  
  return (
    <div className='min-h-screen bg gray-100 text-gray-900 flex justify-center mt-14'>
        
        <ToastContainer/>
        <Navbar/>
        
      <div className='mt-10'>
      <h1 className='self-center text-3xl  font-serif  tex-center  text-black-500'>My Requests</h1>        
          <div className='text-right float-right '>
            <a href="/Post" className="flex items-center ">
              <button  type="button" 
                  className="text-right text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  New Request
                </button>
            </a>
         </div>
     
            <div style={{ height: "130px",}} className="  justify-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10  p-2 mt-10 " >
              
              {userReqeusts.length != 0 ? (
                userReqeusts?.map((request) => (
                  <div style={{ width: "300px",}} className=" justify-center rounded-lg shadow-lg  rounded-lg shadow-lg "   key={request._id}>
               
                    <div className="">
                      {request.image != null ? (
                        <img
                          className="rounded-t-lg object-cover img w-full hover:scale-125"
                          src={`${request.file}`}
                          alt=""
                        />
                      ) : (
                        <img
                          className="rounded-t-lg img"
                          src={defaultImage}
                          alt=""
                        />
                      )}
                      <div className="p-6 ">
                        <h5 className="text-black text-xl font-medium mb-2 underline ">
                          {request.itemname}
                        </h5>
                        
            
                        <p className="text-base mb-2">
                          <strong className="text-indigo-500">
                          Quantity
                          </strong>{" "}<br></br>
                          <i>{request.quantity}</i>
                        </p>
                        <p className="text-base mb-2">
                          <strong className="text-indigo-500">
                            Posted On: 
                          </strong>{" "}<br></br>
                          <i>{dateFormat(request.date)}</i>
                        </p>
                        <div className="mt-2 ml-2 ">
                       
                        <button 
                         className=' cursor-pointer mt-5 tracking-wide font-semibold bg-red-500 text-white w-full py-4 rounded-lg hover:bg-red-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none px-2'
                         onClick={() => deleteEvent(request._id)}
                         > <i className="fas fa-trash-alt   text-white px-2" />
                          Delete </button>
                        </div>
                      </div>
                    </div>
                  </div>
                
                ))
                
              )   : (
                <div className="col-span-2 row-span-1 text-center text-lg text-indigo-500">
                  <h1>No Posts Avaliable</h1>
                </div>
              )}
             
            </div>
      </div>
        








               
       
        
    </div>
  )
}

export default Products