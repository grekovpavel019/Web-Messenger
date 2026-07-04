import express from "express";
import path from "path";

import session from "express-session";

import { Pool } from "pg";

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

    console.log(users);
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

app.get("/chat.html", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login.html");
    }

    res.sendFile(path.join(publicPath, "chat.html"));
})

app.listen(3000, () => {
    console.log("Сервер работает");
})