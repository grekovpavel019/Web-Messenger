const express = require("express"); // импортируем библиотеку express
const app = express(); // создаем объект

app.use(express.static("public")); //короче все что в public - то можно в браузере запустить
// ЗАПУСК СЕРВЕРА
app.listen(3000, () => {  // порт 3000, выводим сообщение админу (НЕ ПОЛЬЗОВАТЕЛЮ)
    console.log("Сервер 3к сапПОРТИК");
});