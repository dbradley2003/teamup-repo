import React from 'react'
import {Routes, Route} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import ProtectedRoute from "./components/AuthRoute"
import MessagesParent from "./components/MessageParent"
import ChatParent from './components/ChatParent'
import EditPost from './components/EditPost'
import FullPostView from './components/FullPostView'
import ReviewFullView from './components/ReviewFullView'
import { SocketProvider } from './components/SocketContext'
import CreatePostForm from './components/CreatePostForm'
import Layout from './components/Layout';
import ProfilePage from './pages/ProfilePage'
import ReviewPosts from './pages/Review';
import EditPage from './components/EditProfile'


import {useEffect } from "react";


import { useMsal } from '@azure/msal-react';
import { MsalProvider} from '@azure/msal-react';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';



function App({instance}) {
  const {accounts} = useMsal();

  useEffect(() => {
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
    }
  }, [accounts, instance]);

  
  return (
    // <div style={{ backgroundColor: '#F0F0FF'}}>


    <MsalProvider instance={instance}>  
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/review" element={<ReviewPosts/>} />
        <Route path="/review/:postId" element={<ReviewFullView />} />
      </Routes>     
        
  <SocketProvider>
    <ProtectedRoute >
    <Routes> 
      <Route element=
        {
          <Layout />
        }>        

        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<CreatePostForm />} />
        <Route path="/messages/:chatId" element={<MessagesParent />}/>
        <Route path="/chats" element={<ChatParent />} />
        <Route path="/create-post" element={<CreatePostForm />} />
        <Route path="/edit-post/:postId" element={<EditPost />} />
        <Route path="/post/:postId" element={<FullPostView />} />
        <Route path="/profile/:profileId" element={<ProfilePage />}/>
        <Route path="/editprofile" element={<EditPage />} />
        <Route path="/profile" element={<ProfilePage />} />

      </Route>
       
    </Routes> 
  </ProtectedRoute>
</SocketProvider>
   
  </MsalProvider>
    
  // </div>   
  )     
}
    
export default App
