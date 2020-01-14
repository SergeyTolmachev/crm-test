-- Table Definition ----------------------------------------------

CREATE DATABASE mydb;

\c mydb;

CREATE TABLE task (
    id SERIAL PRIMARY KEY,
    title character varying(255),
    priority smallint
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX untitled_table_pkey ON task(id int4_ops);

INSERT INTO task (title, priority) VALUES('важная задача', 1);
INSERT INTO task (title, priority) VALUES('более важная задача', 6);
INSERT INTO task (title, priority) VALUES('максимально важная задача', 100);
INSERT INTO task (title, priority) VALUES('промежуточно-важная задача', 30);
INSERT INTO task (title, priority) VALUES('добавленная задача', 20);
INSERT INTO task (title, priority) VALUES('добавленная задача', 20);
INSERT INTO task (title, priority) VALUES('добавленная задача', 20);
INSERT INTO task (title, priority) VALUES('добавленная задача', 20);
INSERT INTO task (title, priority) VALUES('добавленная задача', 20);
