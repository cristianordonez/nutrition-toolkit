import { db } from '../database/db';
import { Query } from '../../types/types';

// type Query = {
//    query: string;
//    type: string;
//    intolerance?: string | undefined;
//    minCalories: number | string;
//    maxCalories: number | string;
//    minCarbs: number | string;
//    maxCarbs: number | string;
//    minProtein: number | string;
//    maxProtein: number | string;
//    minFat: number | string;
//    maxFat: number | string;
//    number: number; //number of items to return
//    offset: number; //number of results to skip, useful for lazy loading
// };

const findOne = async function (userId: string) {
   let currentQuery = `SELECT token FROM tokens WHERE user_id='${userId}'`;
   let dbResponse = await db.query(currentQuery);
   return dbResponse;
};

export {};
