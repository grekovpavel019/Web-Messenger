export default function createMessage(author, value, chatMessages) {
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