import express from "express";
import path from "path";

const app = express();

const publicPath = path.resolve("../public");

app.use(express.static(publicPath));
app.use(express.json());

const users = new Map();
console.log(users);

app.post("/api/register", (req, res) => {
    const { login, email, password } = req.body;
    
    if (users.has(login)) {
        return res.status(409).json({
            message: "Такой пользователь уже есть"
        })
    }

    const user = {
        login,
        email,
        password
    }

    users.set(user.login, user);

    res.status(200).json({
        message: "Пользователь создан",
        user: {
            login: user.login
        }
    });

    console.log(users);
});

app.post("/api/login", (req, res) => {
    const { login, password } = req.body;

    if (!users.has(login)) {
        return res.status(401).json({
            message: "Такого пользователя не существует"
        });
    }

    const user = users.get(login);

    if (!(password === user.password)) {
        return res.status(403).json({
            message: "Неправильный пароль"
        });
    }

    res.status(200).json({
        message: "Вход выполнен успешно",
        user: {
            login: user.login
        }
    });

    console.log(users);
});

app.listen(3000, () => {
    console.log("Сервер работает");
})