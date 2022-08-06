
CREATE TABLE daily_goals (
	total_carbohydrates int4 NULL,
	min_carbs_per_meal int4 NULL,
	max_carbs_per_meal int4 NULL,
	total_protein int4 NULL,
	min_protein_per_meal int4 NULL,
	max_protein_per_meal int4 NULL,
	total_fat int4 NULL,
	min_fat_per_meal int4 NULL,
	max_fat_per_meal int4 NULL,
	total_calories int4 NULL,
	min_calories_per_meal int4 NULL,
	max_calories_per_meal int4 NULL,
	user_id varchar(100) NOT NULL,
	id serial4 NOT NULL,
	CONSTRAINT daily_goals_pk PRIMARY KEY (id),
	CONSTRAINT daily_goals_unique UNIQUE (user_id)
);


-- public.daily_goals foreign keys

ALTER TABLE daily_goals ADD CONSTRAINT daily_goals_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;