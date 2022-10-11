import { db } from '../database/db';

const findOne = async function (userId: string) {
   let currentQuery = `SELECT token FROM tokens WHERE user_id=$1`;
   let dbResponse = await db.oneOrNone(currentQuery, userId);
   return dbResponse;
};

const deleteOne = async function (token: string) {
   let currentQuery = `DELETE FROM tokens WHERE token=$1`;
   let dbResponse = await db.none(currentQuery, token);
   return dbResponse;
};

type TokensType = {
   userId: string;
   token: string;
   createdAt: string;
};

const addToken = async function ({ userId, token, createdAt }: TokensType) {
   let currentQuery = `INSERT INTO tokens (user_id, token, createdAt) VALUES($1, $2, $3)`;
   let dbResponse = await db.none(currentQuery, [userId, token, createdAt]);
   return dbResponse;
};

export { findOne, deleteOne, addToken };
