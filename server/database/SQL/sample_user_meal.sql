CREATE TABLE sample_user_meal (
    meal_id bigserial UNIQUE NOT NULL,
    slot integer,
    data_type character varying,
    servings integer,
    serving_size integer,
    serving_size_unit character varying,
    fdc_id bigint,
    description character varying,
    brand_owner character varying
)