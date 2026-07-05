import { isEmpty, passwordsMatch, minLength } from "./handlers/validation.js";

const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const loginField = document.querySelector("#log-login");
    const passwordField = document.querySelector("#log-password");

    if (isEmpty(loginField.value) || isEmpty(passwordField.value)) {
        alert("Все поля должны быть заполнены");
        return;
    }

    const response = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login: loginField.value,
            password: passwordField.value
        })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));

        window.location.href = "/chat"
    } else {
        alert(data.message);
    }

});


