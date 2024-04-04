import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const registerSchema = yup.object().shape({
  username: yup.string().required("Required"),
  email: yup.string().email("Enter an valid email!").required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: " Create a stronger password contains uppercase,lowercase letter ,number  and special char  " })
    .required("Required"),
});

export const loginSchema  = yup.object().shape({
  email:yup.string().email("Enter an valid Email!").required("Required"),
  password:yup.string().min(5).matches(passwordRules , {message:"Enter a valid password!"}).required("Required")
});