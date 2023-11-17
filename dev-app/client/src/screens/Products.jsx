import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';

import{useNavigate} from 'react-router-dom'
import Navbar from './Navbar';
import defaultImage from ".././img/buildmyclassroom.svg";
import Navbarnologin from './Navbarnologin';

const Products = () => {

    const [allRequest, setAllReguest] = useState([]);
    const getAllReguest = async () => {
        
        axios.get(`http://localhost:8000/api/findallrequest`
        ).then((res) => {
            setAllReguest(res.data);
           
          })
          .catch((err) => {});
      };


// refreshing theh page auto
      useEffect(() => {
         getAllReguest()
        const interval = setInterval(() => {
            getAllReguest();
        }, 5 * 1000);
        return () => clearInterval(interval);
      }, []);
      

    
  
  return (

  //   <div className='min-h-screen bg gray-100 text-gray-900 flex justify-center '>
        
  //       <ToastContainer/>
      
           
  //           <div style={{ height: "130px",}} className="  justify-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-10  p-2  " >
              
  //             {allRequest.length != 0 ? (
  //               allRequest?.map((request) => (
  //                 <div className=" justify-center rounded-lg shadow-lg  rounded-lg shadow-lg "   key={request._id}>
                  
  //                   <div className="">
  //                     {request.image != null ? (
  //                       <img
  //                         className="rounded-t-lg object-cover img w-full hover:scale-125"
  //                         src={`${request.image}`}
  //                         alt=""
  //                       />
  //                     ) : (
  //                       <img
  //                         className="rounded-t-lg img"
  //                         src={defaultImage}
  //                         alt=""
  //                       />
  //                     )}
  //                     <div className="p-6 ">
  //                       <h5 className="text-black text-xl font-medium mb-2 underline t">
  //                         {request.itemname}
  //                       </h5>
  //                       <div
  //                         className="container overflow-y-scroll rounded-lg p-2 max-w-sm"
  //                         style={{ height: "130px" }}
  //                       ><text className="text-indigo-500 t"> Description: </text>
  //                         <p className="text-black text-base mb-2 break-all ">
  //                           {request.description}
  //                         </p>
  //                       </div>
  //                       <text className="text-indigo-500 "> Quantity: </text>
  //                       <p>{request.quantity}</p>

  //                       <text className="text-indigo-500"> Preferred Date: </text>
  //                       <p>{request.preferredDate}</p>
  //                       <text className="text-indigo-500"> Delivery: </text>
  //                       <p>{request.delivery}</p>
  //                       <text className="text-indigo-500"> Location: </text>
  //                       <p>{request.location}</p>

  //                       <p className="text-base mb-2">
  //                         <strong className="text-indigo-500">
  //                           Contact:
  //                         </strong>{" "}<br></br>
  //                         <i>{request.contact}</i>
  //                       </p>
                    
  //                     </div>
  //                   </div>
  //                 </div>
                
  //               ))
                
  //             )   : (
  //               <div className="col-span-2 row-span-1 text-center text-lg text-indigo-500">
  //                 <h1>Sorry no Requests Avaliable!</h1>
  //               </div>
  //             )}
             
  //           </div>
        








               
       
        
  //   </div>




<div className='min-h-screen bg gray-100 text-gray-900 flex justify-center mt-14'>
          
        <ToastContainer/>
        {isAuth()?<Navbar/>:<Navbarnologin/>}
       
           
            <div style={{ height: "130px",}} className="  justify-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10  p-2 mt-10 " >
              
              {allRequest.length != 0 ? (
                allRequest?.map((request) => (
                  <div style={{ width: "300px",}} className=" justify-center rounded-lg shadow-lg  rounded-lg shadow-lg "   key={request._id}>
               
                    <div className="">
                      {request.image != null ? (
                        <img
                          className="rounded-t-lg object-cover img w-full "
                          src={`${request.image}`}
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
                        <div
                          className="container overflow-y-scroll rounded-lg p-2 max-w-sm"
                          style={{ height: "130px" }}
                        ><text className="text-indigo-500 t"> Description: </text>
                          <p className="text-black text-base mb-2 break-all ">
                            {request.description}
                          </p>
                        </div>
            
                        <p className="text-base mb-2">
                          <strong className="text-indigo-500">
                          Quantity
                          </strong>{" "}<br></br>
                          <i>{request.quantity}</i>
                        </p>
                        <text className="text-indigo-500"> Location: </text>
                       <p>{request.location}</p>
                        <div className="mt-2 ml-2 ">
                        <p className="text-base mb-2">
                        <strong className="text-indigo-500">
                            Contact:
                          </strong>{" "}<br></br>
                        
                         <a
                        className="underline text-blue-500"
                        href="mailto:housing.services@uregina.ca"
                      >
                        {" "}
                        {request.contact}
                      </a>



                      </p>
                        
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
  )
}

export default Products