import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"

function Form({method,route}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('');
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [grade, setGrade] = useState('');
    const [major, setMajor] = useState('');
    // const [loading, setLoading] = useState(false);
    const navigate = useNavigate()


    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        e.preventDefault()
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        // setLoading(true);

        if (!username || !password){
            setError('Please fill in both fields.')
            return;
        }
        
       
            
            if (method === "login"){
                try{
                    const res = await api.post(route, {username, password })
                    if (res.status === 200){
                        localStorage.setItem(ACCESS_TOKEN, res.data.access);
                        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                        navigate("/")
                        console.log('Login Successful')
                        
                    } else{
                        setError('Incorrect Username or Password')
                    }
                }catch(error){
                    console.log('Error Logging in', error)
                    setError('Incorrect Username or Password')
            }
        }
            else{
                try{
                    const res = await api.post(route, {username, password, email,grade})
                        if (res.status === 201){
                            localStorage.setItem(ACCESS_TOKEN, res.data.access);
                            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                            navigate("/login")
                        }else{
                            setError('Incorrect Input')
                        } 
                    }catch{
                    console.log('Error Registering New Account',error)
                }
                    
                    setError('Incorrect username or password.')
                
                }
           
               
    

    }
    return (
    <form onSubmit={handleSubmit} className={`form ${method === 'register' ? 'register-form' : 'login-form'}`}>  
    {error && (
         <div className="alert alert-danger alert-dismissible fade show">
         {error}
         <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
       </div>
    )}

    {method === 'register' && (
        <>

        <div className="input-group mb-4">
            
            <span className="input-group-text"><i className="fa-solid fa-envelope"></i></span>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your school email"
              />
              </div>
        <div className="input-group mb-4">
              {/* <label className="form-label">Select your grade</label> */}
              <span className="input-group-text"><i className="fa-solid fa-caret-up"></i></span>
              <select
                className="form-control"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                <option value="">Select your grade</option>
                <option value="1">Freshman</option>
                <option value="2">Sophomore</option>
                <option value="3">Junior</option>
                <option value="4">Senior</option>
              </select>
            </div>
         </>
    )}

    <div className="input-group mb-4">
    <span className="input-group-text"><i className="fa-solid fa-user"></i></span>
        <input 
        className= "form-control"
        // className="form-input"
        type="text"
        value= {username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        />
        </div>
        <div className="input-group mb-4">
        <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
        <input 
        className="form-control"
        // className="form-input"
        type="password"
        value= {password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        />
        </div>
        {method === 'register' && (
        <div className="input-group mb-4">
        <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
        <input 
        className="form-control"
        // className="form-input"
        type="password"
        value= {confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        />
        </div>
        )}
        

        <button className="btn btn-primary custom-button "  type="submit">
            {name}
        </button>
    
    </form>
)}
export default Form