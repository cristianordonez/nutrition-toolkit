

-- -----------------------------------------------------
-- Table users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS users` ;

CREATE TABLE IF NOT EXISTS users (
  username VARCHAR(50) NOT NULL,
  first_name VARCHAR(25) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  spoonacular_username VARCHAR(45) NOT NULL,
  spoonacular_password VARCHAR(45) NOT NULL,
  spoonacular_hash VARCHAR(45) NOT NULL,
  hash VARCHAR(100) NOT NULL,
  id_user VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_user),
  UNIQUE INDEX EMAIL_UNIQUE (email ASC) VISIBLE,
  UNIQUE INDEX USERNAME_UNIQUE (username ASC) VISIBLE,
  UNIQUE INDEX USER_ID_UNIQUE (id_user ASC) VISIBLE)



-- -----------------------------------------------------
-- Table diet_types`
-- -----------------------------------------------------
DROP TABLE IF EXISTS diet_types ;

CREATE TABLE IF NOT EXISTS diet_types (
  type VARCHAR(45) NOT NULL,
  id_type VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_type),
  UNIQUE INDEX TYPE (type ASC) VISIBLE,
  UNIQUE INDEX TYPE_ID_UNIQUE (id_type ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table diet_intolerances`
-- -----------------------------------------------------
DROP TABLE IF EXISTS diet_intolerances` ;

CREATE TABLE IF NOT EXISTS diet_intolerances (
  id_intolerance VARCHAR(45) NOT NULL,
  intolerance VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (id_intolerance),
  UNIQUE INDEX INTOLERANCE_ID_UNIQUE (id_intolerance ASC) VISIBLE)


-- -----------------------------------------------------
-- Table user_intolerances`
-- -----------------------------------------------------
DROP TABLE IF EXISTS user_intolerances` ;

CREATE TABLE IF NOT EXISTS user_intolerances (
  iduser_intolerances VARCHAR(45) NOT NULL,
  intolerance_id VARCHAR(45) NOT NULL,
  user_intolerance_id VARCHAR(45) NOT NULL,
  PRIMARY KEY (iduser_intolerances),
  CONSTRAINT intolerance_id
    FOREIGN KEY (intolerance_id)
    REFERENCES diet_intolerances (id_intolerance)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT user_intolerance_id
    FOREIGN KEY (user_intolerance_id)
    REFERENCES users (id_user)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)



-- -----------------------------------------------------
-- Table user_diettypes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS user_diettypes` ;

CREATE TABLE IF NOT EXISTS user_diettypes (
  iduser_diettypes VARCHAR(45) NOT NULL,
  user_diet_id VARCHAR(45) NOT NULL,
  type_id VARCHAR(45) NOT NULL,
  PRIMARY KEY (iduser_diettypes),
  CONSTRAINT user_diet_id
    FOREIGN KEY (user_diet_id)
    REFERENCES users (id_user)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT diet_types_id
    FOREIGN KEY (type_id)
    REFERENCES diet_types (id_type)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)



-- -----------------------------------------------------
-- Table daily_goals`
-- -----------------------------------------------------
DROP TABLE IF EXISTS daily_goals ;

CREATE TABLE IF NOT EXISTS daily_goals (
  id_daily_goals INT NOT NULL,
  total_carbohydrates INT NULL DEFAULT NULL,
  min_carbs_per_meal INT NULL DEFAULT NULL,
  max_carbs_per_meal INT NULL DEFAULT NULL,
  total_protein INT NULL DEFAULT NULL,
  min_protein_per_meal INT NULL DEFAULT NULL,
  max_protein_per_meal INT NULL DEFAULT NULL,
  total_fat INT NULL DEFAULT NULL,
  min_fat_per_meal INT NULL DEFAULT NULL,
  max_fat_per_meal INT NULL DEFAULT NULL,
  total_calories INT NULL DEFAULT NULL,
  min_calories_per_meal INT NULL DEFAULT NULL,
  max_calories_per_meal INT NULL DEFAULT NULL,
  user_id VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_daily_goals),
  CONSTRAINT userId
    FOREIGN KEY (user_id)
    REFERENCES users (id_user)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

