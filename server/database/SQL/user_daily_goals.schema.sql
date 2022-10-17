
CREATE TABLE user_daily_goals (
	id bigserial NOT NULL PRIMARY KEY,
    user_id bigint unique REFERENCES users(user_id),
    total_carbohydrates integer,
    total_protein integer,
    total_fat integer,
    total_calories integer
);

