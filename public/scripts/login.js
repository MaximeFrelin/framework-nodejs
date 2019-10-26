import axios from "axios";

export function login() {
  const login = document.getElementById("login").value;
  const password = document.getElementById("password").value;

  const data = {
    login,
    password
  };

  axios.post("localhost:3000/login", data);
}
