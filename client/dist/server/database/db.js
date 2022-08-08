"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
require('dotenv').config();
var database = process.env.NODE_ENV === 'test' ? 'mealplans_test' : 'mealplans';
console.log('proccess.env.node_env in db.ts', process.env.NODE_ENV);
var pgp = require('pg-promise')();
var cn = {
    user: process.env.USER,
    host: process.env.HOST,
    database: database,
    password: process.env.PASSWORD,
    port: 5432,
};
exports.db = pgp(cn);
//# sourceMappingURL=db.js.map