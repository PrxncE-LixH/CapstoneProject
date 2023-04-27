import axios from "axios";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userInfo = {
    email: email.value,
    password: password.value,
  };

  try {
    const user = await axios.post("http://localhost:3000/signup", {
      ...userInfo,
    });
    if(user.status === 201){
        window.location.href = '/success.html';
    }
       
    
  } catch (error) {
    console.log(error);
  }


        //input validation for secure authentication..
  // - password len
  var lowerCase = /[a-z]/g;
  var upperCase = /[A-Z]/g;
  var numbers = /0-9/g;

  userPassword = password.value;

  if(userPassword.length() < 8 || !userPassword.match(lowerCase) || !userPassword.match(upperCase) || !userPassword.match(numbers))
    password.innerHTML = "password can't be less than 8 characters."; 
    
});
