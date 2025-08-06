CREATE DATABASE todolist_db;
USE todolist_db;


--> Tabela de usuarios (users)
CREATE TABLE users (
id_user INT PRIMARY KEY AUTO_INCREMENT, --> id do usuario
name_user VARCHAR(200) NOT NULL, --> nome do usuario
email VARCHAR(250) NOT NULL UNIQUE, --> email do usuario
password_hash VARCHAR(255) NOT NULL --> hash da senha do usuario
);


--> Tabela de tarefas (tasks)
CREATE TABLE tasks (
id_task INT PRIMARY KEY AUTO_INCREMENT, --> id da tarefa
id_user INT NOT NULL, --> referencia ao usuario
title VARCHAR(255) NOT NULL, --> titulo da tarefa
description_task TEXT, --> descrição da tarefa
is_done BOOLEAN DEFAULT FALSE, --> status da tarefa
due_date DATE, --> data de vencimento
created_at DATETIME DEFAULT CURRENT_TIMESTAMP, --> data de criação
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, --> data de atualização

FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE --> chave estrangeira referenciando a tabela de usuarios
);

select * from users;