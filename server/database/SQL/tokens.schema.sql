CREATE TABLE tokens (
	token varchar(200) NOT NULL,
    user_id varchar(250) REFERENCES users (id),
	createdAt date NOT NULL,
	CONSTRAINT token_pkey PRIMARY KEY (token)
);

alter table tokens add constraint unique_user_id UNIQUE (user_id);
