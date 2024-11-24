import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import { useNavigate } from 'react-router-dom';






const api = axios.create({
  
  baseURL: 'https://backend.teamupnow.org',
  headers: {
    'Accept': 'application/json', 
    'Accept-Language': 'en-US,en',  
    'Content-Type': 'application/json', 
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token && config.url !=="/login" && config.url !=="/register") {
      config.headers.Authorization = `Bearer ${token}`;
      }
    return config;
  },
)

api.interceptors.response.use(
  response => response,
  async (error) => {
    const navigate = useNavigate();
      // Using 401 status code here, assuming it's the correct one for token issues
      if (error.response && error.response.status === 401 && !error.config.__isRetryRequest 
        && error.config.url != "/api/login/" && error.config.url != "/api/user/register/"
      ) {
          if (!localStorage.getItem(REFRESH_TOKEN)) {
              console.error('No refresh token available.');
              navigate('/logout')
              return Promise.reject(error);
          }

          // Mark this request as already retried
          error.config.__isRetryRequest = true;

          try {
              const res = await api.post('/api/token/refresh/', {
                  refresh: localStorage.getItem(REFRESH_TOKEN)
              });
              
              localStorage.setItem(ACCESS_TOKEN, res.data.access);
              api.defaults.headers.common.Authorization = `Bearer ${res.data.access}`;
              error.config.headers.Authorization = `Bearer ${res.data.access}`;

              // Retry the original request with the new token
              return api(error.config);
          } catch (refreshError) {
              console.error('Token refresh failed:', refreshError);
              // Handle token refresh failure (e.g., redirect to login)
              return Promise.reject(refreshError);
          }
      }

      // Return any other error without modification
      return Promise.reject(error);
  }
);

  
export default api;


  
  







