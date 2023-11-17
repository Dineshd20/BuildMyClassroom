import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import App from './App';
import Register from './screens/Register';
import Login from './screens/Login';
import Forget from './screens/Forget';
import Activate from './screens/Activate';
import ResetPassword from './screens/ResetPassword';
import Private from './screens/Private';
import Post from './screens/Post';
import Products from './screens/Products';
import MyPosts from './screens/MyPosts'
import 'react-toastify/dist/ReactToastify.css'
import Home from './screens/Home';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
    <Route path ='/' exact element={<Home/>}/>
      <Route path ='/profile' exact element={<Private/>}/>
      <Route path ='/register' exact element={<Register/>}/>
      <Route path ='/login' exact element={<Login/>}/>
      <Route path ='/users/password/forget' exact element={<Forget/>}/>
      <Route path ='/users/activate/:token' exact element={<Activate/>}/>
      <Route path ='/users/password/reset/:token' exact element={<ResetPassword/>}/>
      <Route path ='/post' exact element={<Post/>}/>
      <Route path ='/findallrequest' exact element={<Products/>}/>
      <Route path ='/myrequests' exact element={<MyPosts/>}/>
    </Routes>
  </Router>
);

