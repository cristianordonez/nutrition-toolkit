import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import './index.scss';
import { Typography, CircularProgress, Button } from '@mui/material';
import { GoalCardItemLinearProgress } from './GoalCardItemLinearProgress';
import { GoalCardItemCard } from './goal-card-item-card/GoalCardItemCard';
import { GoalsType } from '../../../../types/types';
import { BsEggFried } from 'react-icons/bs';
import { GiAvocado } from 'react-icons/gi';
import { FaBreadSlice } from 'react-icons/fa';

type nutrientType = {
   name: string;
   amount: number;
   percentOfDailyNeeds: number;
   unit: string;
};

export interface Props {
   goals: GoalsType;
   nutritionSummary?: nutrientType[];
   page?: string;
   setGoals?: Dispatch<SetStateAction<GoalsType>>;
   handleSubmitUpdatedGoals?: (event: React.FormEvent) => Promise<void>;
}

export const DailyGoals = ({
   goals,
   nutritionSummary,
   page,
   setGoals,
   handleSubmitUpdatedGoals,
}: Props) => {
   let nutrients = ['Carbohydrates', 'Protein', 'Fat'];

   //! conditional renders return a '0' on page when falsy, need to declare null to be rendered

   const getNutrientPercentage = (
      nutrientEaten: number,
      nutrientGoal: number
   ) => {
      return Math.floor((nutrientEaten / nutrientGoal) * 100);
   };

   //IF DATA IS DERIVED FROM PROPS, DECLARE LOCALLY BECAUSE OTHERWISE IT WOULD RENDER TWICE,
   //ONCE ON PROP CHANGE AND THEN ON STATE CHANGE
   let calories;
   if (nutritionSummary !== undefined && nutritionSummary.length) {
      calories = getNutrientPercentage(
         nutritionSummary[5].amount,
         goals.total_calories
      );
   }
   return (
      <>
         <div className='daily-goals'>
            {/* DIFFERENT TITLES FOR SEARCH AND MEALPLAN */}
            {page === 'mealplan' ? (
               <Typography variant='h6'>
                  Today's Macronutrient Totals
               </Typography>
            ) : (
               <Typography variant='h6'>
                  Your Daily Macronutrient Goals
               </Typography>
            )}
            {/* RENDER THE MEALPLAN SIDEBAR HERE */}
            {page === 'mealplan' &&
            nutritionSummary !== undefined &&
            nutritionSummary.length ? (
               <>
                  <div className='daily-goals-kcal'>
                     <CircularProgress
                        variant='determinate'
                        size={200}
                        value={calories}
                        thickness={1}
                     />
                     <div className='daily-goals-kcal-title'>
                        <Typography variant='body1' align='center'>
                           Calories
                        </Typography>
                        <Typography variant='h6'>
                           {Math.floor(nutritionSummary[5].amount)} /{' '}
                           {goals.total_calories}
                        </Typography>
                     </div>
                  </div>
                  <div
                     className='daily-goals-items'
                     data-testid='mealplan-goal-items'
                  >
                     <GoalCardItemLinearProgress
                        type={'Carbohydrates'}
                        nutrientsInMealPlan={nutritionSummary[7].amount}
                        nutrientsTotal={goals.total_carbohydrates}
                     />
                     <GoalCardItemLinearProgress
                        nutrientsTotal={goals.total_protein}
                        type={'Protein'}
                        nutrientsInMealPlan={nutritionSummary[28].amount}
                     />
                     <GoalCardItemLinearProgress
                        nutrientsTotal={goals.total_fat}
                        type={'Fat'}
                        nutrientsInMealPlan={nutritionSummary[11].amount}
                     />
                  </div>
               </>
            ) : null}
            {/* RENDER THE SEARCH SIDEBAR OR USER PROFILE PAGE HERE */}
            {page === 'search' ||
            page === 'user-profile' ||
            (page === 'mealplan' && goals !== undefined) ? (
               <>
                  <div className='daily-goals-kcal'>
                     <CircularProgress
                        variant='determinate'
                        size={200}
                        value={100}
                        thickness={1}
                     />
                     <div className='daily-goals-kcal-title'>
                        <Typography align='center' variant='body1'>
                           Total Calories
                        </Typography>
                        <Typography align='center' variant='h6'>
                           {goals.total_calories}
                        </Typography>
                     </div>
                  </div>
                  <form
                     onSubmit={handleSubmitUpdatedGoals}
                     className='daily-goals-items'
                  >
                     <GoalCardItemCard
                        type={'Carbohydrates'}
                        IconSvg={FaBreadSlice}
                        nutrientsTotal={goals.total_carbohydrates}
                        page={page}
                        setGoals={setGoals}
                        goals={goals}
                     />
                     <GoalCardItemCard
                        nutrientsTotal={goals.total_protein}
                        IconSvg={BsEggFried}
                        type={'Protein'}
                        page={page}
                        setGoals={setGoals}
                        goals={goals}
                     />
                     <GoalCardItemCard
                        nutrientsTotal={goals.total_fat}
                        IconSvg={GiAvocado}
                        type={'Fat'}
                        page={page}
                        setGoals={setGoals}
                        goals={goals}
                     />
                     {page === 'user-profile' ? (
                        <Button variant='contained' fullWidth type='submit'>
                           Update Goals
                        </Button>
                     ) : null}
                  </form>
               </>
            ) : null}
         </div>
      </>
   );
};
