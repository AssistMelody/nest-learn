CREATE DATABASE test;

USE test;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `name` varchar(30) DEFAULT NULL COMMENT 'user name',
  `age` int DEFAULT NULL COMMENT 'user age',
  `created_at` datetime DEFAULT NULL COMMENT 'created time',
  `updated_at` datetime DEFAULT NULL COMMENT 'updated time',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='user';

INSERT INTO users(id, name, age, created_at, updated_at)VALUES(1, 'John Doe', 25, '2023-10-26 08:02:44', '2023-10-26 08:02:44');
INSERT INTO users(id, name, age, created_at, updated_at)VALUES(2, 'Jane Smith', 30, '2023-10-26 08:02:44', '2023-10-26 08:02:44');
INSERT INTO users(id, name, age, created_at, updated_at)VALUES(3, 'Michael Johnson', 40, '2023-10-26 08:02:44', '2023-10-26 08:02:44');
INSERT INTO users(id, name, age, created_at, updated_at)VALUES(4, 'Emily Davis', 22, '2023-10-26 08:02:44', '2023-10-26 08:02:44');
INSERT INTO users(id, name, age, created_at, updated_at)VALUES(5, 'David Wilson', 35, '2023-10-26 08:02:44', '2023-10-26 08:02:44');
INSERT INTO users(id, name, age, created_at, updated_at)VALUES(6, 'Sarah Anderson', 28, '2023-10-26 08:02:44', '2023-10-26 08:02:44');
INSERT INTO users(id, name, age, created_at, updated_at)VALUES(7, 'Daniel Thompson', 32, '2023-10-26 08:02:44', '2023-10-26 08:02:44');
INSERT INTO users(id, name, age, created_at, updated_at)VALUES(8, 'Olivia Martin', 29, '2023-10-26 08:02:44', '2023-10-26 08:02:44');
INSERT INTO users(id, name, age, created_at, updated_at)VALUES(9, 'Matthew Roberts', 27, '2023-10-26 08:02:44', '2023-10-26 08:02:44');
INSERT INTO users(id, name, age, created_at, updated_at)VALUES(10, 'Isabella Clark', 33, '2023-10-26 08:02:44', '2023-10-26 08:02:44');
