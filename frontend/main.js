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
    const user = await axios.post("http://localhost:3000/login", {
      ...userInfo,
    });
    if(user.status === 200){
      console.log('logded in')

      console.log(user)
    }
    
    console.log(user)
  } catch (error) {
    console.log(error);
  }
});
