import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import ProtectedRoute from "./components/ProtectedRoute"
import PostForm from "./components/PostForm"
import ProfilePage from "./pages/Profile"
import MessageParent from "./components/MessageParent"
import ChatParent from './components/ChatParent'

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
        <Route path="/apply" element={<PostForm />} />
        <Route path="/messages:chatId" element={<MessageParent />} />
        <Route path="/chats" element={<ChatParent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
     </BrowserRouter> 
     
  )
}

export default App
