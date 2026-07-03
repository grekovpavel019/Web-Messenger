const { Pool } = require("pg"); // подключаем крч

const pool = new Pool({ //пул соединений создаем
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "ТВОЙ_ПАРОЛЬ",
    database: "messenger"
});

module.exports = pool;