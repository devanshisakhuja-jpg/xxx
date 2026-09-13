import {useState ,useEffect} from "react";
import {Link,useNavigate} from "react-router-dom";



export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
   const navigate = useNavigate();
   
      
  useEffect(() => {
    const savedUsername = localStorage.getItem("rememberedUsername");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
   }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (username === "user" && password === "password") {
      if (rememberMe) {
        localStorage.setItem("rememberedUsername", username);
      } else {
        localStorage.removeItem("rememberedUsername");
      }
      navigate("/"); 
    } else {
      setError("Invalid username or password");
    }
}
  
return (
    <div className = "loginpage">
    <>
    
    <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}> 
            <div className="divider1">
            <h4>Welcome back! Please enter your credentials to log in.</h4>
            </div>   
            <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" placeholder="Enter your username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        
           <label htmlFor="password">Password:</label>
            <input type="password" placeholder="Enter your password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="checkbox-container">
            <div className="remember-me">
            <input type="checkbox" id="rememberMe" />
            
            <label htmlFor="rememberMe">Remember me</label>
            </div>
       
            <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <button type="submit">Login</button>
           <h5>Don't have an account? <Link to="/signup">SignUp</Link></h5>
          <div className="divider">
          <h6>Create an account to save titles, rate shows, and build your profile.</h6>
          </div>
          </form>
         </div>
         
         </>
         </div>
          );
 
}