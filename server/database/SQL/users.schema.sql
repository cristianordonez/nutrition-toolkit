CREATE TABLE users (
    user_id bigserial NOT NULL PRIMARY KEY,
    username character varying(250),
    email character varying(250)
);
