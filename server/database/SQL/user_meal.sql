CREATE TABLE user_meal (
    meal_id bigserial UNIQUE NOT NULL,
    slot integer,
    data_type character varying(50),
    servings integer,
    serving_size integer NOT NULL,
    serving_size_unit character varying(50) NOT NULL,
    date timestamp without time zone NOT NULL,
    user_id bigint REFERENCES users(user_id),
    fdc_id bigint,
    created_at timestamp with time zone DEFAULT now(),
    description character varying,
    brand_owner character varying
)
