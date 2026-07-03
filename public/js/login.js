// import { showError } from "./auth/auth-form";
import { isEmpty, passwordsMatch, minLength } from "./auth/validation.js";

const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const loginField = document.querySelector("#log-login");
    const passwordField = document.querySelector("#log-password");

    if (isEmpty(loginField.value) || isEmpty(passwordField.value)) {
        alert("Все поля должны быть заполнены");
        return;
    } 

});


