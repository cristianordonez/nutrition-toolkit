const { QueryFile } = require('pg-promise');
const { join: joinPath } = require('path');


function sql(file: any) {
   const fullPath = joinPath(__dirname, file); // generating full path;
   return new QueryFile(fullPath, { minify: true });
}

//when importing query from another file, only need to use db.query(db.users);
module.exports = {
   schemas: {
      users: sql('./users.schema.sql'),
      daily_goals: sql('./daily_goals.schema.sql'),
      session: sql('./session.schema.sql'),
   },
};
