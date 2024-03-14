import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { userData, setUserData } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.loginSuccess) {
        setUserData(data);
        navigate("/"); // Redirect to the main app page if login is successful
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    if (userData) {
      // setUserData([userData]); // Log userData when it changes
      console.log("userData:", userData);
    }
  }, [userData]); // Include userData in the dependency array

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <form
        method="POST"
        className="form bg-light text-dark register-form p-4" // Added padding for spacing inside the form
        onSubmit={handleSubmit}
      >
        <h1 className="text-center mb-4">Log in</h1>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            placeholder="example@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            placeholder="Enter strong password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          name="submit"
          className="btn btn-primary btn-block"
        >
          Log in
        </button>
        <p className="text-center mt-3">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      <h1>{userData && userData.username}</h1>
      </form>
    </div>
  );
};

export default LoginForm;
