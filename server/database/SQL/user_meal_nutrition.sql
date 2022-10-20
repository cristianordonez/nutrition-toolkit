CREATE TABLE user_meal_nutrition (
    id bigserial NOT NULL,
    meal_id bigint REFERENCES user_meal(meal_id),
    calories integer,
    total_fat integer,
    saturated_fat integer,
    trans_fat integer,
    cholesterol integer,
    sodium integer,
    total_carbohydrates integer,
    dietary_fiber integer,
    total_sugars integer,
    protein integer,
    vitamin_d integer,
    calcium integer,
    iron integer,
    potassium integer
)