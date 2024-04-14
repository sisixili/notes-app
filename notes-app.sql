CREATE DATABASE notes_app;
USE notes_app;

CREATE TABLE notes (
	id integer PRIMARY KEY auto_increment,
    title varchar(255) NOT NULL,
    contents TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO notes (title, contents) 
VALUES
('First Note', 'This is the first note'),
('Second Note', 'This is the second note');