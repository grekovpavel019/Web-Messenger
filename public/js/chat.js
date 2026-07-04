// const user = localStorage.getItem("user");

// if (!user) {
//     window.location.href = "/login.html";
// }

const chatUsers = document.querySelectorAll(".user__item");

const chatMessages = document.querySelector(".chat__messages");

const chatForm = document.querySelector(".chat__form");
const chatInput = document.querySelector(".chat__input");

chatUsers.forEach((user) => {
    user.addEventListener("click", (event) => {
        chatUsers.forEach(user => user.classList.remove("active"));
        user.classList.add("active");
    })
});

chatForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!chatInput.value.trim()) {
        return;
    }

    createMessage("Я", chatInput.value);
    chatInput.value = "";
})

function createMessage(author, value) {
    const message = document.createElement("div");
    message.classList.add("message");

    const authorBlock = document.createElement("p");
    authorBlock.textContent = author + ":";
    authorBlock.classList.add("message__author");

    const text = document.createElement("p");
    text.textContent = value;
    text.classList.add("message__text");

    message.appendChild(authorBlock);
    message.appendChild(text); 

    chatMessages.append(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

