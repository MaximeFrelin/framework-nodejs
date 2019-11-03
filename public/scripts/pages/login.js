import axios from "axios";
//Il faut charger le css dans le js pour créer le lien
import "../../styles/pages/login.css";

window.onload = function() {
  const connecteLabel = document.getElementById("connecte");
  const connectionForm = document.getElementById("connection-form");

  var cookie = getCookie("SESSION_ID");
  if (cookie) {
    connecteLabel.style.display = "inline";
    connectionForm.style.display = "none";
  }
};

export function login() {
  const login = document.getElementById("login").value;
  const password = document.getElementById("password").value;
  const connecteLabel = document.getElementById("connecte");
  const erreurLabel = document.getElementById("erreur");
  const connectionForm = document.getElementById("connection-form");

  const data = {
    Login: login,
    Password: password
  };

  axios.post("http://localhost:3000/login", data).then(response => {
    if (response.data.status) {
      connectionForm.style.display = "none";
      connecteLabel.style.display = "inline";
      erreurLabel.style.display = "none";
    } else {
      connecteLabel.style.display = "none";
      erreurLabel.style.display = "inline";
    }
  });
}

function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else {
    begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
  }
  return decodeURI(dc.substring(begin + prefix.length, end));
}
