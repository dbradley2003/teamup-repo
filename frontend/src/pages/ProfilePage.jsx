import React, { useState, useEffect } from 'react';
import api from "../api";
import { useNavigate } from 'react-router-dom';
import "../styles/ProfilePage.css"
import { Grid2 } from '@mui/material'
import { getProfile, getMyProfile } from "../components/services"
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { useParams } from 'react-router-dom';
import { InteractionStatus, InteractionType, InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "../authconfig";
import { ErrorComponent } from "../utils/ErrorComponent";
import { Loading } from "../utils/Loading";
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export function ProfilePage() {
  const { instance, inProgress } = useMsal();
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [skills, setSkills] = useState('');
  const [projects, setProjects] = useState('');
  const [picture, setPicture] = useState('');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();

  const authRequest = {
    ...loginRequest
};

  const { profileId: profileId } = useParams();

  const isOwnProfile = !profileId
  console.log(profileId)

  const categoryLabels = {
    STEM: 'Technology',
    FM: 'Film & Media'
  };

  useEffect(() => {
    if (profileId){
      getUserProfile()
    }else{
      myProfile()
    }
    }, [picture,profileId]);

    async function getUserProfile(){
      const data = await getProfile(profileId)
      setUsername(data.user.username)
      setBio(data.bio)
      setSkills(data.skills)
      setResumeUrl(data.resume_url)
      setProjects(data.projects)
      setPicture(data.picture_url)
      setMajor(data.major)
      setYear(data.student_year)
    }

    async function myProfile(){
      const data = await getMyProfile()
      setUsername(data.user.username)
      setBio(data.bio)
      setSkills(data.skills)
      setResumeUrl(data.resume_url)
      setProjects(data.projects)
      setPicture(data.picture_url)
      setMajor(data.major)
      setYear(data.student_year)
    }


    // const handleBioChange = (event) => {
    //   setBio(event.target.value);
    // };

    const handleNavigate = () => {
        navigate('/editprofile'); // Navigate to /another path
      };

    const handleSubmit = async (e) => {

      e.preventDefault();
      //setLoading(true);  // Assuming you uncomment and define a setLoading function

    
        try {
          console.log(bio)
          const response = await api.put(`/api/user/profile/${profileId}/`, username, bio, picture, major);  // Assuming title and desc are defined in the component's state
          console.log('Successfully created post', response.data);
          handleNavigate()

          //navigate("/");  // Assuming useNavigate has been defined and imported correctly
      } catch (error) {
          console.error('Error creating post:', error); // Properly log the error to the console
          alert('Failed to create post: ' + (error.response?.data?.message || error.message));  // More detailed error alert
      } finally {
          //setLoading(false);  // Ensure loading state is reset whether the request succeeds or fails
      }
  };
          

return (
  <MsalAuthenticationTemplate
  interactionType={InteractionType.Popup} 
  authenticationRequest={authRequest} 
  errorComponent={ErrorComponent} 
  loadingComponent={Loading}
  >
        
   
       
        <Grid2 container spacing={4} sx={{ padding: 4 }}>


        <Grid2
          item
          xs={12}
          md={4}
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
        >
        
        
        <Card
          sx={{
            padding: 3,
            maxWidth: { xs: '400px', md: '500px', lg: '600px', xl: '700px' },
            minHeight: { xs: '375px', md: '500px', lg: '600px' },
            overflow: 'hidden',
            flex: 1,
          }}
         
        >
       
        <CardContent sx={{ textAlign: 'left'}}>
        <Typography variant="subtitle2" color="text.secondary">
          {categoryLabels[major]}
          </Typography>
          </CardContent>
          {/* </div> */}
        
          <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {username}
        </Typography>
        </CardContent>


        <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
       {year}
        </Typography>
        </CardContent>

        <CardContent sx={{ textAlign: 'center' }}>
         <Typography variant="body1" color="text.secondary">
        <i class="fas fa-quote-left pe-2"></i>
          {bio}
          {/* </p> */}
          </Typography>
        </CardContent>
  
        {isOwnProfile && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button  
          variant="contained"
          color="primary"
          onClick={handleNavigate}
          sx={{ width: '80%' }}
          >
              Edit 
              </Button>
              </Box>
            
               )}
               </Card>

  </Grid2>

 
  <Grid2 
  item
  xs={12}
  md={8}
  display="flex"
  justifyContent="center"
  alignItems="flex-start"

  >

  {/* <div class="details-section p-4 d-flex flex-column justify-content-start align-items-center">  */}
  <Card
          sx={{
           
            maxWidth: { xs: '400px', md: '500px', lg: '600px', xl: '700px' },
            minHeight: { xs: '500px', md: '500px', lg: '600px' },
            padding: 3,
            flex: 1,
          }}
        >
 {/* <h3 class='mt-4'>Expertise Area </h3> */}
      <CardContent>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
               Expertise Area
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
                {skills}
              </Typography>
      </CardContent>
         

          {/* <p style={{ whiteSpace: 'pre-wrap' }}>{skills}</p>  */}
          
            
          <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 4 }}>
                Projects
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
                {projects}
              </Typography>
            </CardContent>
          
          {/* Resume */}
          <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 4 }}>
                Resume
              </Typography>
              {resumeUrl ? (
                <Typography variant="body1">
                  <a
                    href={resumeUrl}
                    className="custom-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View {username}'s resume
                  </a>
                </Typography>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  No resume uploaded
                </Typography>
              )}
            </CardContent>
          
          </Card>
  
      </Grid2>
      </Grid2> 
      </MsalAuthenticationTemplate> 
)};

