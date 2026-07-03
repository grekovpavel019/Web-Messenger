import express from "express";
import path from "path";

const app = express();

const publicPath = path.resolve("../public");

app.use(express.static(publicPath));

app.use(express.json());

const users = [];

app.post("/api/register", (req, res) => {

});

app.listen(3000, () => {
    console.log("Сервер работает");
})