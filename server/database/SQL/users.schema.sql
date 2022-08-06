CREATE TABLE users (
	id varchar(100) NOT NULL,
	username varchar(25) NOT NULL,
	email varchar(45) NOT NULL,
	spoonacular_username varchar(200) NOT NULL,
	spoonacular_password varchar(200) NOT NULL,
	spoonacular_hash varchar(200) NOT NULL,
	hash varchar(200) NOT NULL,
	intolerances _text NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
);