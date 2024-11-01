import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import ProtectedRoute from "./components/ProtectedRoute"
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






import { MsalProvider} from '@azure/msal-react';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';



function App({instance}) {


  
  return (
    <div style={{ backgroundColor: '#F0F0FF', minHeight: '100vh', margin: '0', padding: '0' }}>
    <MsalProvider instance={instance}>  
     <BrowserRouter>
 

      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/review" element={<ReviewPosts/>} />
        <Route path="/review/:postId" element={<ReviewFullView />} />
        </Routes>     
        
      <SocketProvider>
      
        <Routes> 
        
       
        <Route element={
          <ProtectedRoute >
          <Layout />
          </ProtectedRoute>
            }
          >
            
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
       
        </SocketProvider>
   
     </BrowserRouter> 
     </MsalProvider>
     </div>
    
  )
          }
    

export default App
