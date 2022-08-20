import { db } from '../database/db';

export const findOne = async function (userId: string) {
   let currentQuery = `SELECT token FROM tokens WHERE user_id='${userId}'`;
   let dbResponse = await db.query(currentQuery);
   return dbResponse;
};

export const deleteOne = async function (token: string) {
   let currentQuery = `DELETE FROM tokens WHERE token='${token}'`;
   let dbResponse = await db.query(currentQuery);
   return dbResponse;
};

type TokensType = {
   userId: string;
   token: string;
   createdAt: string;
};

export const addToken = async function ({
   userId,
   token,
   createdAt,
}: TokensType) {
   let currentQuery = `INSERT INTO tokens (user_id, token, createdAt) VALUES('${userId}', '${token}', '${createdAt}')`;
   let dbResponse = await db.query(currentQuery);
   return dbResponse;
};
