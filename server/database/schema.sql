CREATE TABLE users (
	username varchar(50) NOT NULL,
	email varchar(45) NOT NULL,
	spoonacular_username varchar(45) NOT NULL,
	spoonacular_password varchar(45) NOT NULL,
	spoonacular_hash varchar(45) NOT NULL,
	hash varchar(100) NOT NULL,
	id serial4 NOT NULL,
	intolerances _text NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
);


-- public.daily_goals definition

-- Drop table

-- DROP TABLE public.daily_goals;

CREATE TABLE public.daily_goals (
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
	user_id int4 NOT NULL,
	id serial4 NOT NULL,
	CONSTRAINT daily_goals_pk PRIMARY KEY (id),
	CONSTRAINT daily_goals_unique UNIQUE (user_id)
);


-- public.daily_goals foreign keys

ALTER TABLE public.daily_goals ADD CONSTRAINT daily_goals_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


-- public.user_intolerances definition

-- Drop table

-- DROP TABLE public.user_intolerances;

CREATE TABLE public.user_intolerances (
	user_id int4 NOT NULL,
	id serial4 NOT NULL,
	intolerances _text NULL,
	CONSTRAINT user_intolerances_pk PRIMARY KEY (id)
);


-- public.user_intolerances foreign keys

ALTER TABLE public.user_intolerances ADD CONSTRAINT user_intolerances_fk FOREIGN KEY (user_id) REFERENCES public.users(id);

-- public."session" definition

-- Drop table

-- DROP TABLE public."session";

CREATE TABLE public."session" (
	sid varchar NOT NULL,
	sess json NOT NULL,
	expire timestamp(6) NOT NULL,
	CONSTRAINT session_pkey PRIMARY KEY (sid)
);
CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);