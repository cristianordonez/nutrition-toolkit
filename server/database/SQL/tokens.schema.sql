CREATE TABLE tokens (
    token character varying(200) NOT NULL primary key,
    createdat date NOT NULL,
    user_id bigint
);

alter table tokens add constraint unique_user_id UNIQUE (user_id);
