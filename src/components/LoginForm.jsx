import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useFormik} from "formik";
import { loginSchema } from "../schemas";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { userData, setUserData } = useAuth();
  // The user token
  const token = sessionStorage.getItem("token");

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
     
        console.log("the Data is : ", data);
        alert(data.message);
        sessionStorage.setItem("token", data.access_token);
        navigate("/"); // Redirect to the main app page if login is successful
      } else {
        alert(data.message);
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const {values , errors,touched , isSubmitting,handleBlur,handleChange} = useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema:loginSchema,
  })
  
  return (
    <div className="container d-flex justify-content-center login-form">
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
            id="email"
            placeholder="example@gmail.com"
            className={`form-control  ${
              errors.email && touched.email ? "input-error" : ""
            }`}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter strong password"
            className={`form-control  ${
              errors.password && touched.password ? "input-error" : ""
            }`}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <p className="error">{errors.password}</p>
          )}
        </div>
        <button
          disabled={isSubmitting || Object.keys(errors).length > 0}
          type="submit"
          name="submit"
          className="btn btn-primary btn-block"
        >
          Log in
        </button>
        <p className="text-center mt-3">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
