import Form from "../components/form"
import '../styles/Register.css';


function Register(){

return(
   <div className="register-background-image">
    <div className="register-container d-flex justify-content-center align-items-center vh-100">
     <div className="register-box row">
      <div className="col-md-6 register-left-side p-0">
      <div id="register-carousel" className="carousel slide h-100" data-bs-ride="register-carousel">
      <ol className="carousel-indicators">
                <li data-bs-target="#register-carousel" data-bs-slide-to="0" className="active"></li>
                <li data-bs-target="#register-carousel" data-bs-slide-to="1"></li>
                <li data-bs-target="#register-carousel" data-bs-slide-to="2"></li>
              </ol>
        <div className="carousel-inner h-100">
          <div className="carousel-item active"> </div>
          <div className="carousel-item"></div>
          <div className="carousel-item"></div>
            
    </div> 
      </div>
      </div>
      <div className="col-md-6 d-flex justify-content-center align-items-center register-right-side">
      <h2>Sign Up</h2>
      <p>Please fill out the fields below.</p>
        <div className="register-form-container">
         
        <Form route="/api/user/register/"  method="register" />
         </div>
      </div>
     </div>
    </div>
    </div>
    ) 
}

export default Register

