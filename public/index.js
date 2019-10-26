import { login } from "./scripts/login";

var app = undefined;

window.onload = function() {
  app = new App();

  app.initLogin();
};

class App {
  initLogin() {
    document.getElementById("login-button").addEventListener("click", () => {
      login();
    });
  }
}
