import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "../schemas";

const RegisterForm = () => {

  // const { userData, setUserData } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.registerSuccess) {
        alert(data.message);
        navigate("/login");
      } else {
        alert(data.message);
        console.error("Registration failed: ", data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const { values, errors, touched, isSubmitting, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
      },
      validationSchema: registerSchema,
    });
  console.log(errors);

  return (
    <div className={`container  form-con  text-dark bg-light `}>
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-5">
          <h2 className="text-center">Sign Up</h2>
          <p className="text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <form onSubmit={handleSubmit} method="POST" autoComplete="off">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className={`form-control  ${
                  errors.username && touched.username ? "input-error" : ""
                }`}
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.username && touched.username && (
              <p className="error">{errors.username}</p>
            )}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control  ${
                  errors.email && touched.email ? "input-error" : ""
                }`}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.email && touched.email && (
              <p className="error">{errors.email}</p>
            )}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control  ${
                  errors.password && touched.password ? "input-error" : ""
                }`}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.password && touched.password && (
              <p className="error">{errors.password}</p>
            )}
            <button
              disabled={isSubmitting || Object.keys(errors).length > 0}
              type="submit"
              className="btn btn-primary btn-block"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
