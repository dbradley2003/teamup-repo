import React from 'react'
import {Routes, Route, useNavigate} from "react-router-dom"
import {Login} from "./pages/Login"
import {Logout} from "./pages/Logout"
import Register from "./pages/Register"
import {Home} from "./pages/Home"
import ProtectedRoute from "./components/AuthRoute"
import MessagesParent from "./components/MessageParent"
import {ChatParent} from './components/ChatParent'
import EditPost from './components/EditPost'
import FullPostView from './components/FullPostView'
import ReviewFullView from './components/ReviewFullView'
import { SocketProvider } from './components/SocketContext'
import { CreatePostForm } from './components/CreatePostForm'
import { Layout } from './components/Layout';
import { ProfilePage } from './pages/ProfilePage'
import { ReviewPosts } from './pages/Review';
import { EditPage } from './components/EditProfile'

// MSAL imports
import { MsalProvider } from "@azure/msal-react";
import { CustomNavigationClient } from "./utils/NavigationClient";
import { useMsal } from '@azure/msal-react';


import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Grid} from '@mui/material'
// import { Grid2 } from '@mui/material'


function App({pca}) {
  const {accounts} = useMsal();
  const navigate = useNavigate()
  const navigationClient = new CustomNavigationClient(navigate)
  pca.setNavigationClient(navigationClient);

  return (



    <MsalProvider instance={pca}>
     
     
   
    <Layout>
        <Grid container justifyContent="center">
            <Pages />          
        </Grid>
    </Layout>
   
</MsalProvider>

  )
}

 function Pages(){
  return (
    
    // <SocketProvider>


   
   
    
 
      <Routes>

<Route path="/login" element={<Login />} />
    
    <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
        {/* <Route path="/review" element={<ReviewPosts/>} />
        <Route path="/review/:postId" element={<ReviewFullView />} /> */}


        <Route path="/apply" element={<CreatePostForm />} />
        <Route path="/messages/:chatId" element={<MessagesParent />}/>
        <Route path="/chats" element={<ChatParent />} />
        <Route path="/create-post" element={<CreatePostForm />} />
        <Route path="/edit-post/:postId" element={<EditPost />} />
        <Route path="/post/:postId" element={<FullPostView />} />
        <Route path="/profile/:profileId" element={<ProfilePage />}/>
        <Route path="/editprofile" element={<EditPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/logout" element={<Logout />} />
    </Routes> 
   

  
   


    
   
  );   
}
    
export default App;