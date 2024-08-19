import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import ProtectedRoute from "./components/ProtectedRoute"
import MessagesParent from "./components/MessageParent"
import ChatParent from './components/ChatParent'
import EditPost from './components/EditPost'
import { SocketProvider } from './components/SocketContext'
import CreatePostForm from './components/CreatePostForm'
import 'bootstrap/dist/css/bootstrap.min.css';


function Logout(){
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register />
}


function App() {
  return (
    
     <BrowserRouter>
      <Routes>
        <Route
          path= "/"
          element={
            <ProtectedRoute>
              <Home />
              
            </ProtectedRoute>
          }
        />
      
       
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
      
        <Route
        path= "*"
        element={
          <SocketProvider>
          <Routes>
        <Route path= "/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
        <Route path="/apply" element={<CreatePostForm />} />
        <Route path="/messages/:chatId" element={<MessagesParent />}/>
        <Route path="/chats" element={<ChatParent />} />
        <Route path="/create-post" element={<CreatePostForm />} />
        <Route path="/edit-post/:postId" element={<EditPost />} />
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
        </Routes> 
        </SocketProvider>
        }
        />
       
        </Routes>
        
      
     </BrowserRouter> 
    
  )
}

export default App
