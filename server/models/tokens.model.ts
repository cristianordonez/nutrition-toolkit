import { db } from '../database/db';

const findOne = async function (userId: number) {
   const currentQuery = `SELECT token FROM tokens WHERE user_id=$1`;
   const dbResponse = await db.oneOrNone(currentQuery, userId);
   return dbResponse;
};

const deleteOne = async function (token: string) {
   const currentQuery = `DELETE FROM tokens WHERE token=$1`;
   const dbResponse = await db.none(currentQuery, token);
   return dbResponse;
};

type TokensType = {
   userId: number;
   token: string;
   createdAt: string;
};

const addToken = async function ({ userId, token, createdAt }: TokensType) {
   const currentQuery = `INSERT INTO tokens (user_id, token, createdAt) VALUES($1, $2, $3)`;
   const dbResponse = await db.none(currentQuery, [userId, token, createdAt]);
   return dbResponse;
};

export { findOne, deleteOne, addToken };
