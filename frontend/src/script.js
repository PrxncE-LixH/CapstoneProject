import * as yup from 'yup'

// password Regex
const validatePass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

//validation user input before account creation
export const formValidation = yup.object().shape({
    email: yup.string().email("Enter a valid email").required("Email is required"),
    password: yup.string().min(8).matches(validatePass, {message: "Choose a stronger Password"}).required("required")
});


