CREATE TABLE food (
    fdc_id bigint NOT NULL,
    data_type character varying(50),
    description character varying,
    food_category_id bigint,
    nutrition_label_serving_size integer,
    nutrition_label_serving_size_unit character varying(100)
)