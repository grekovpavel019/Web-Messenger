import express from "express";
import path from "path";
import transporter from "./smtp.js";
import session from "express-session";

import { Pool } from "pg";

import { setupWS } from "./ws.js";

const app = express();

const publicPath = path.resolve("../public");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "messenger",
    password: "admin",
    port: 5432
});

const result = await pool.query("SELECT * FROM users");
console.log(result.rows);

app.use(session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}));
app.use(express.static(publicPath));
app.use(express.json());

app.post("/api/register", async (req, res) => {
    if (req.session.user) {
        return res.status(403).json({
            message: "Ты уже вошел"
        })
    }
    const { login, email, password } = req.body;

    const existingUser = await pool.query(
        "SELECT * FROM users WHERE login = $1", [login]
    );
    
    if (existingUser.rows.length > 0) {
        return res.status(409).json({
            message: "Такой пользователь уже есть"
        })
    }

    const user = {
        login,
        email,
        password
    }

    await pool.query(
        `
        INSERT INTO users (login, email, password)
        VALUES ($1, $2, $3)
        `,
        [login, email, password]
    );

    res.status(201).json({
        message: "Пользователь создан",
        user: {
            login: user.login
        }
    });

});

app.post("/api/login", async (req, res) => {
    const { login, password } = req.body;

    const result = await pool.query(
        'SELECT * FROM users WHERE login = $1',
        [login]
    );

    if (result.rows.length === 0) {
        return res.status(401).json({
            message: "Такого пользователя не существует"
        });
    }

    const user = result.rows[0];

    if (password !== user.password) {
        return res.status(403).json({
            message: "Неправильный пароль"
        });
    }

    req.session.user = {
        login: user.login
    }

    res.status(200).json({
        message: "Вход выполнен успешно",
        user: {
            login: user.login
        }
    });
});



app.get("/api/me", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            message: "Не авторизован"
        });
    }

    res.json(req.session.user);
});

app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                message: "Ошибка выхода"
            });
        }

        res.json({
            message: "Выход успешно"
        });
    })
});

app.get("/login", (req, res) => {
    if (req.session.user) {
        return res.redirect("/chat");
    }

    res.sendFile(path.join(publicPath, "login.html"));
});

app.get("/register", (req, res) => {
    if (req.session.user) {
        return res.redirect("/chat");
    }

    res.sendFile(path.join(publicPath, "register.html"))
}); 

app.get("/chat", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    res.sendFile(path.join(publicPath, "chat.html"));
});

app.get("/api/messages", async (req, res) => {
    const result = await pool.query(
        "SELECT login, text FROM messages ORDER BY id ASC LIMIT 100"
    )

    res.json(result.rows);
});

const server = app.listen(3000, () => {
    console.log("Сервер работает");
});

setupWS(server, pool);

app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        await transporter.sendMail({
            from: "greklomabgtu@mail.ru",
            to: "greklomabgtu@mail.ru",
            replyTo: email,
            subject: subject,
            text: `Новое обращение

Имя: ${name}
Email: ${email}

Сообщение:
${message}`
        });

        res.status(200).json({
            message: "Сообщение успешно отправлено!"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Ошибка при отправке сообщения."
        });
    }
});

// await transporter.sendMail({
//     from: "greklomabgtu@mail.ru",
//     to: "greklomabgtu@mail.ru",
//     subject: `фвыфывфыв`,
//     text: `фывфывфвы`
//  });

// console.log(`Письмо отправлено`);

