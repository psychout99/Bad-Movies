DROP DATABASE movies;
CREATE DATABASE movies;

USE movies;
DROP TABLE favorites;
CREATE TABLE favorites (
  id int,
  username varchar(12),
  roomname varchar(12),
  message varchar(255)
);