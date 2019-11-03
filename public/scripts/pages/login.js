import axios from "axios";
//Il faut charger le css dans le js pour créer le lien
import "../../styles/pages/login.css";

window.onload = function() {
  const connectedSection = document.getElementById("connected-section");
  const connectionForm = document.getElementById("connection-form");

  var cookie = getCookie("SESSION_ID");
  if (cookie) {
    connectedSection.style.display = "inline";
    connectionForm.style.display = "none";
  }
};

export function login() {
  const login = document.getElementById("login").value;
  const password = document.getElementById("password").value;
  const connectedSection = document.getElementById("connected-section");
  const erreurLabel = document.getElementById("erreur");
  const connectionForm = document.getElementById("connection-form");

  const data = {
    Login: login,
    Password: password
  };

  axios.post("http://localhost:3000/login", data).then(response => {
    if (response.data.status) {
      connectionForm.style.display = "none";
      connectedSection.style.display = "inline";
      erreurLabel.style.display = "none";
    } else {
      connectedSection.style.display = "none";
      erreurLabel.style.display = "inline";
    }
  });
}

export function logOut() {
  const connectedSection = document.getElementById("connected-section");
  const erreurLabel = document.getElementById("erreur");
  const connectionForm = document.getElementById("connection-form");
  axios.get("http://localhost:3000/logout", {}).then(response => {
    connectedSection.style.display = "none";
    connectionForm.style.display = "inline";
    erreurLabel.style.display = "none";
    document.getElementById("login").value = "";
    document.getElementById("password").value = "";
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
