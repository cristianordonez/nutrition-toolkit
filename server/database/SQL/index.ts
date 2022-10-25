import { QueryFile } from 'pg-promise';
// const { QueryFile } = require('pg-promise');
// const { join: joinPath } = require('path');
import * as path from 'path';

function sql(file: string) {
   const fullPath = path.join(__dirname, file); // generating full path;
   return new QueryFile(fullPath, { minify: true });
}

//when importing query from another file, only need to use db.query(db.users);
module.exports = {
   schemas: {
      users: sql('./users.schema.sql'),
      user_daily_goals: sql('./user_daily_goals.schema.sql'),
      session: sql('./session.schema.sql'),
      user_hash: sql('./user_hash.sql'),
      user_meal: sql('./user_meal.sql'),
      user_meal_nutrition: sql('./user_meal_nutrition.sql'),
      sample_user_meal: sql('./sample_user_meal.sql'),
      sample_user_meal_nutrition: sql('./sample_user_meal_nutrition.sql'),
   },
};
