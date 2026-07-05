CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    login TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)


CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    login TEXT NOT NULL,
    text TEXT NOT NULL
)
