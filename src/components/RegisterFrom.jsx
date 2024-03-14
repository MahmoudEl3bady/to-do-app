import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const RegisterForm = () => {
  const [username,setUsername] =useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userData, setUserData } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        body:formData,
      });

      const data = await response.json();

      if (data.registerSuccess) {
        alert(data.username);
        setUserData(data);
        navigate("/");
      } else {
        console.error("Registration failed: " , data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-5">
          <h2 className="text-center">Sign Up</h2>
          <p className="text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <form onSubmit={handleSubmit} method="POST">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
