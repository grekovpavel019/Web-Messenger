import { checkEmail, isEmpty, minLength, passwordsMatch } from "./handlers/validation.js";

const registerForm = document.querySelector("form");

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const loginField = document.querySelector("#reg-login");
    const emailField = document.querySelector("#reg-email");
    const passwordField = document.querySelector("#reg-password");
    const passwordConfirmField = document.querySelector("#reg-password-confirm");
    const privPol = document.querySelector("#reg-priv-pol");

    if (
        isEmpty(loginField.value) || 
        isEmpty(passwordField.value) || 
        isEmpty(passwordConfirmField.value) || 
        isEmpty(emailField.value)
    ) {
        alert("Все поля должны быть заполнены");
        return;
    }

    if (!checkEmail(emailField.value)) {
        alert("Email неправильный")
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

    const response = await fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login: loginField.value,
            email: emailField.value,
            password: passwordField.value
        })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        
        window.location.href = "/login";
    } else {
        alert(data.message);
    }
});