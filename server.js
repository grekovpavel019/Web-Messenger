const express = require("express"); // импортируем библиотеку express
const app = express(); // создаем объект

app.use(express.static("public")); //короче все что в public - то можно в браузере запустить

app.use(express.json()); // чтоб парсить json из запроса

app.post("/login", (req, res) => { // тут мы ловим запрос на /login, req - запрос, res - ответ, после кнопки "Войти"

    console.log(req.body);ы

    res.send("Получил данные!"); // и ответ чтобы браузер не втыкал

});

// ЗАПУСК СЕРВЕРА
app.listen(3000, () => {  // порт 3000, выводим сообщение админу (НЕ ПОЛЬЗОВАТЕЛЮ)
    console.log("Сервер 3к сапПОРТИК");
});