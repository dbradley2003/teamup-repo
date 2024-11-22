import Form from "../components/form"
import { useState } from 'react';
import '../styles/Login.css';
import {useNavigate} from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useMsal } from '@azure/msal-react';
import api from "../api";
// import  {callMsGraph}  from '../graph.js';
import Typography from "@mui/material/Typography";
import { Button, Box, Container } from "@mui/material";
import {Grid} from '@mui/material'
import landing from "../assets/landing.gif"

export function Login(){
  const {instance} = useMsal();
  const navigate = useNavigate();
 
  const handleNewUser = () =>{
    navigate('/register')
  }

  const handleLogin = async () => {
   
    const loginRequest = {
      scopes: [
          "openid",
          "offline_access",
          "email"
      ],
      prompt: "select_account",
  };


    try{
    const loginResponse = await instance.loginPopup({
     
        ...loginRequest,
        redirectUri: 'http://localhost:3000/' // e.g. /redirect
    })
    const  account = loginResponse.account
    const emailFromResponse = account?.username || account?.idTokenClaims?.email;
    console.log(loginResponse)
    instance.setActiveAccount(account)

    const tokenResponse = await instance.acquireTokenSilent({
      ...loginResponse,
      forceRefresh:true,
    });
    console.log("Forced Refresh Token Response:", tokenResponse);


    const idToken = tokenResponse.idToken

    //Get User Info from MsGraph
    // const data = await callMsGraph(loginResponse.accessToken);
    // console.log('Graph Data:', data);
    
    
    //Verify token 
    const  response = await fetch("http://127.0.0.1:8000/api/verifytoken/",{
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      body:JSON.stringify({
        "email": emailFromResponse,
      })
      
    });

    if (response.ok) {
      // Parse the JSON response to get the tokens
      const tokenData = await response.json();
      console.log(tokenData)
      // Access the access token and refresh token
      const accessToken = tokenData.access;
      const refreshToken = tokenData.refresh;
      
      // Log the tokens (or store them in local storage for future use)
      console.log('Access Token:', accessToken);
      console.log('Refresh Token:', refreshToken);

      // Store the tokens in local storage or session storage
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);

      // const newToken = await response.json();  // Get the new token
      console.log('New Access Token:', response);

      navigate('/')
    
    }}catch(error){
     console.log('error')
    }
  }
  
    return(
      <Container maxWidth="xl" sx={{ paddingTop: { xs: '40px', md: '50px', lg:'60px' } }}>
      <Grid  container spacing={1} >
        {/* Image on the Left */}
        <Grid item xs={12} md={6}>
        <Box
sx={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: { xs: '20px', md: '40px' },
  borderRadius: '12px',
 
}}
>
<img
  src= {landing}
  alt="Collaboration illustration"
  style={{
    width: '100%',
    maxWidth: '500px',
    height: 'auto',
    objectFit: 'cover', // Fills the container nicely
    borderRadius: '8px',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)',
  }}
/>
          </Box>
        </Grid>
       

        <Grid item 
      
        xs={12} 
        md={4}
        
        paddingLeft= {{ md: '40px' }}
        display='flex'
        flexDirection='column'
        
        marginTop={10}
        padding={1}
        alignItems={{ xs: 'center', md: 'flex-start' }}
        // justifyContent= {{ xs: 'center', md: 'center' }}
        textAlign= { {xs: 'center', md: 'left'} }
        gap={{ xs: 2, md: 3 }}
        >

     

          <Typography variant="h4" sx={
            { fontWeight: 'bold',
              marginBottom: { xs: 2, md: 3 },
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              color:'primary'
             }}
          >
            Welcome to TeamUp!
          </Typography>
          <Typography variant="body1"  
          sx={{
            marginBottom: { xs: 2, md: 3 },
            fontSize: { xs: '18px', md: '22px' },
            padding: 0,
            color:'primary'
          }}>
            Connect with fellow students to collaborate on projects, build your resume, and gain hands-on experience.
            Post your ideas, find teammates, and create something amazing together.
          </Typography>
          <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 } }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => handleLogin()} 
            sx={{ padding: { xs: '8px 16px', md: '12px 24px' } }}
          >
             <Typography variant="body1" fontWeight='bold'>
              Get Started
               </Typography>  
           
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{ padding: { xs: '8px 16px', md: '12px 24px' } }}
           
            >
               <Typography variant="body1" fontWeight='bold'>
               Learn More
               </Typography>  
          </Button>
          
          </Box>
         
        </Grid>
        
      </Grid>
    </Container>
    ) 
  }

export default Login