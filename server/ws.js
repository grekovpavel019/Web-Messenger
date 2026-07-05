import { WebSocketServer } from "ws";

const users = new Map();

export function setupWS(server, pool) {
    const wss = new WebSocketServer({ server });

    wss.on("connection", (socket, req) => {

        socket.user = null;

        socket.on("message",async (data) => {
            const message = JSON.parse(data.toString());

            if (message.type === "auth") {
                socket.user = message.login;
                return;
            }

            const login = socket.user;
            if (!login) return;

            await pool.query(
                "INSERT INTO messages (login, text) VALUES ($1, $2)",
                [login, message.text]
            );

            wss.clients.forEach(client => {
                if (client.readyState === 1) {
                    client.send(JSON.stringify({
                        text: message.text,
                        from: login
                    }));
                }
            });

        });
    });
}