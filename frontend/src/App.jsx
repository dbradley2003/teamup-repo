import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import ProtectedRoute from "./components/ProtectedRoute"
import MessagesParent from "./components/MessageParent"
import ChatParent from './components/ChatParent'
import EditPost from './components/EditPost'
import FullPostView from './components/FullPostView'
import { SocketProvider } from './components/SocketContext'
import CreatePostForm from './components/CreatePostForm'
import Layout from './components/Layout';
import {handleLogout} from "/src/components/services.js"
import ProfilePage from './pages/ProfilePage'
import EditPage from './components/EditProfile'


import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants"


import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


function Logout(){


  localStorage.removeItem('REFRESH_TOKEN');
  localStorage.removeItem('ACCESS_TOKEN');

  const refresh_token = localStorage.getItem(REFRESH_TOKEN);
  const access_token = localStorage.getItem(ACCESS_TOKEN);

  handleLogout(refresh_token,access_token);
  
  return <Navigate to="/login" />
}


function App() {
  return (
    <div style={{ backgroundColor: '#F0F0FF', minHeight: '100vh', margin: '0', padding: '0' }}>
    
     <BrowserRouter>
     
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />

        </Routes>
       
       
       
        
        
        
      <SocketProvider>
      
        <Routes> 
        

        <Route element={
          <ProtectedRoute>
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
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}


        </Route>
        
        </Routes> 
        </SocketProvider>
        
        
       
        
        
      
       
     </BrowserRouter> 
     </div>
     
    
  )
}

export default App
