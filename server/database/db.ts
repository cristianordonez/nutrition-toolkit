import { createPool } from 'mysql2';

// create the connection to database
const pool = createPool({
   host: '127.0.0.1',
   user: 'root',
   database: 'meal-planner',
});

export { pool };
