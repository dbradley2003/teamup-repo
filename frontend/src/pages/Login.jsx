import Form from "../components/form"
import '../styles/Login.css';


function Login(){

    return(
   <div className="background-image">
    <div className="container d-flex justify-content-center align-items-center vh-100">
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
      <div className="col-md-6 d-flex justify-content-center align-items-center right-side">
      <h2>Welcome Back!</h2>
      <p>Please login to your account.</p>
        <div className="form-container">
         
         <Form route="/api/token/" method="login" />
         </div>
      </div>
     </div>
    </div>
    </div>
    ) 
}

export default Login