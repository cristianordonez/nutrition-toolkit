CREATE TABLE branded_food (
    fdc_id bigint NOT NULL,
    brand_owner character varying(150) NOT NULL,
    brand_name character varying(100),
    subbrand_name character varying,
    gtin_upc character varying,
    ingredients character varying,
    serving_size double precision NOT NULL,
    serving_size_unit character varying(10) NOT NULL,
    branded_food_category character varying(200),
    data_source character varying,
    package_weight character varying,
    market_country character varying(25)
)