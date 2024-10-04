import Form from "../components/form"
import { useState } from 'react';
import '../styles/Login.css';
import {useNavigate} from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useMsal } from '@azure/msal-react';
import api from "../api";
import  {callMsGraph}  from '../graph.js';



function Login(){
  const {instance} = useMsal();
  const [graphData, setGraphData] = useState(null);

  // const msalInstance = new PublicClientApplication(msalConfig)

  const navigate = useNavigate();

  const handleNewUser = () =>{
    navigate('/register')
  }

  const handleLogin = async () => {
    const loginRequest = {
      scopes: [
          "profile",  // Your custom API scope
          "openid",  // For authentication and ID tokens
          "offline_access",
          "User.Read", // To enable refresh tokens
          "email",
          
      ],
      prompt: "select_account",
  };


    try{
      const loginResponse = await instance.loginPopup(loginRequest)
    const  account = loginResponse.account
    console.log(loginResponse)
    console.log(loginResponse.idToken)
    instance.setActiveAccount(account)
    //Get User Info from MsGraph
    const data = await callMsGraph(loginResponse.accessToken);
    console.log('Graph Data:', data);

    //Verify token 
    const  response = await fetch("http://127.0.0.1:8000/api/verifytoken/",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginResponse.idToken}`
      },
      body: JSON.stringify({
        "email": data.mail,
      })
      
    });

    if (response.ok) {
      // Parse the JSON response to get the tokens
      const tokenData = await response.json();

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
   <div className="background-image">
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
     <div className="login-box row">
      <div className="col-md-6 left-side p-0">
      <div id="carousel" className="carousel slide h-100" data-bs-ride="carousel">
      <ol className="carousel-indicators">
                <li data-bs-target="#carousel" data-bs-slide-to="0" className="active"></li>
                <li data-bs-target="#carousel" data-bs-slide-to="1"></li>
                <li data-bs-target="#carousel" data-bs-slide-to="2"></li>
              </ol>
        <div className="carousel-inner h-100">
          <div className="carousel-item active"> </div>
          <div className="carousel-item"></div>
          <div className="carousel-item"></div>
            
    </div> 
      </div>
      </div>
      <div className= "col-md-6 d-flex justify-content-center align-items-center right-side">
      <h2>Welcome!</h2>
      <p>Login with any Google or Microsoft Account </p>
      <div>
            <button className="social-login-button" onClick={handleLogin}>Login </button>
        </div>
        <div className="form-container">
         {/* <Form route="/api/token/" method="login" /> */}
         </div>
         {/* <p className="new-user-link" onClick={handleNewUser}>Register a new user?</p> */}
         
      </div>
     
     </div>
    
    </div>
      
    </div>
    ) 
  }

export default Login