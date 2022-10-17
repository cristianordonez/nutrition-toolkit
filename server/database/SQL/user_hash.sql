CREATE TABLE user_hash (
    id bigserial,
    user_id bigint REFERENCES users(user_id),
    hash character varying(350)   
)