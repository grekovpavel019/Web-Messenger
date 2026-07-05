import { isEmpty, checkEmail } from "./handlers/validation.js";

const contactForm = document.querySelector("form");

contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nameField = document.querySelector("#contact-name");
    const emailField = document.querySelector("#contact-email");
    const subjectField = document.querySelector("#contact-subject");
    const messageField = document.querySelector("#contact-message");

    if (
        isEmpty(nameField.value) ||
        isEmpty(emailField.value) ||
        isEmpty(subjectField.value) ||
        isEmpty(messageField.value)
    ) {
        alert("Все поля должны быть заполнены");
        return;
    }

    if (!checkEmail(emailField.value)) {
        alert("Email введен неправильно");
        return;
    }

    const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: nameField.value,
            email: emailField.value,
            subject: subjectField.value,
            message: messageField.value
        })
    });

    const data = await response.json();

    if (response.ok) {
        alert(data.message);

        contactForm.reset();

    } else {
        alert(data.message);
    }
});