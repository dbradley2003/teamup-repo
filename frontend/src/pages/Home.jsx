
import PostsParent from "../components/PostsParent";
import "../styles/Post.css"
import { useNavigate } from 'react-router-dom';
import { useIsAuthenticated } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Typography from "@mui/material/Typography";
import { Button, Box, Container } from "@mui/material";
import {Grid} from '@mui/material'
import { loginRequest } from "../authconfig";
import { useState } from "react";
export function Home(){


  const { instance } = useMsal();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLogin = (loginType) => {
    setAnchorEl(null);

    if (loginType === "popup") {
    /**
     * When using popup and silent APIs, we recommend setting the redirectUri to a blank page or a page 
     * that does not implement MSAL. Keep in mind that all redirect routes must be registered with the application
     * For more information, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/login-user.md#redirecturi-considerations 
     */
        instance.loginPopup({
            ...loginRequest,
            redirectUri: '/', // e.g. /redirect
        });
    } else if (loginType === "redirect") {
        instance.loginRedirect(loginRequest);
    }
}



    const navigate = useNavigate();
    return (
     
     <>
      <AuthenticatedTemplate>
        {/* <div className="subheader-container mt-5">
        <h2 className="subheader-title">Connect with fellow students to collaborate on projects!</h2>
        <p className="subheader-title-caption"> Build your resume, and gain hands-on experience. Post your ideas, find teammates, and create something amazing together.</p>
     
      <div className="post-icon-container">
      <a className="circle-icon" onClick={() => navigate('/apply')}>
        <i className=" fa-solid fa-plus fa-2x"></i>
          </a>
          <div className="plus-text">
          Post Your Project 
          </div>
     </div>
     </div> */}
        <PostsParent />
            
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
        <Container maxWidth="xl" sx={{ paddingTop: { xs: '40px', md: '50px', lg:'60px' } }}>
          <Grid  container spacing={2} >
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
      src="/src/assets/landing.gif"
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
            md={6}
            
            paddingLeft= {{ md: '40px' }}
            display='flex'
            flexDirection='column'
            
            marginTop={8}
            padding={1}
            alignItems={{ xs: 'center', md: 'flex-start' }}
            // justifyContent= {{ xs: 'center', md: 'center' }}
            textAlign= { {xs: 'center', md: 'left'} }
            gap={{ xs: 2, md: 4 }}
            >

         

              <Typography variant="h4" sx={
                { fontWeight: 'bold',
                  marginBottom: { xs: 2, md: 4 },
                  fontSize: { xs: '1.75rem', md: '2.5rem' }
                 }}>
                Welcome to TeamUp!
              </Typography>
              <Typography variant="body1"  
              sx={{
                marginBottom: { xs: 2, md: 4 },
                fontSize: { xs: '18px', md: '22px' },
              }}>
                Connect with fellow students to collaborate on projects, build your resume, and gain hands-on experience.
                Post your ideas, find teammates, and create something amazing together.
              </Typography>
              <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 } }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => handleLogin("popup")} key="loginPopup"
                sx={{ padding: { xs: '8px 16px', md: '12px 24px' } }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                sx={{ padding: { xs: '8px 16px', md: '12px 24px' } }}
               
                >
                   Learn More
              </Button>
              </Box>
             
            </Grid>
            
          </Grid>
        </Container>
      </UnauthenticatedTemplate>
    </>
  );
}
