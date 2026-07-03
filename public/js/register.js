import { isEmpty, minLength, passwordsMatch } from "./auth/validation.js";

const registerForm = document.querySelector("form");

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const loginField = document.querySelector("#reg-login");
    const passwordField = document.querySelector("#reg-password");
    const passwordConfirmField = document.querySelector("#reg-password-confirm");
    const privPol = document.querySelector("#reg-priv-pol");

    if (isEmpty(loginField.value) || isEmpty(passwordField.value) || isEmpty(passwordConfirmField.value)) {
        alert("Все поля должны быть заполнены");
        return;
    }

    if (!minLength(passwordField.value, 5)) {
        alert("Пароль должен быть не менее 5 символов");
        return;
    }

    if (!passwordsMatch(passwordField.value, passwordConfirmField.value)) {
        alert("Пароли не совпадают");
        return;
    }

    if (!privPol.checked) {
        alert("Согласитесь с политикой конфиденсальности");
        return;
    }
});