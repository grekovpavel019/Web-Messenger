import createMessage from "./handlers/chatHandlers.js";

const chatMessages = document.querySelector(".chat__messages");
const chatForm = document.querySelector(".chat__form");
const chatInput = document.querySelector(".chat__input");
const logoutBtn = document.querySelector("#logout");

console.log(logoutBtn);

let currentUser;
let ws;

async function init() {
    await initMe();
    await initMessages();

    connectWS();
    initEvents();
}

init();

function connectWS() {
    ws = new WebSocket(`ws://${location.host}`); 
    
    ws.onopen = () => {
        ws.send(JSON.stringify({
            type: "auth",
            login: currentUser.login
        }));
    };

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);

        createMessage(
            message.from,
            message.text,
            chatMessages
        );
    };
}

function initEvents() {
    chatForm.addEventListener("submit", sendMessage);
    logoutBtn.addEventListener("click", logout);
}

function sendMessage(event) {
    event.preventDefault();

    const text = chatInput.value.trim();

    if (!text) return;

    if (ws.readyState !== WebSocket.OPEN) {
        return;
    }

    ws.send(JSON.stringify({
        text
    }));

    chatInput.value = "";
}

async function logout() {
    const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include"
    });

    if (!response.ok) {
        console.log("Бурмалда")
        return;
    }

    window.location.href = "/login";

}

async function initMe() {
    const response = await fetch("/api/me");

    if (!response.ok) {
        window.location.href = "/login";
        return;
    }

    currentUser = await response.json();
}

async function initMessages() {
    const response = await fetch("/api/messages");

    if (!response.ok) return;

    const messages = await response.json();

    messages.forEach((message) => {
        createMessage(
            message.login,
            message.text,
            chatMessages
        );
    });
}