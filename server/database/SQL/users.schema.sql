CREATE TABLE users (
	username varchar(25) NOT NULL,
	email varchar(45) NOT NULL,
	spoonacular_username varchar(45) NOT NULL,
	spoonacular_password varchar(45) NOT NULL,
	spoonacular_hash varchar(100) NOT NULL,
	hash varchar(100) NOT NULL,
	id serial4 NOT NULL,
	intolerances _text NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
);