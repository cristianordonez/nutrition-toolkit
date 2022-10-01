import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Card, CardContent, Input, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { CurrentGoals } from '../../../../../types/types';
import { useLocalStorageState } from '../../../hooks/useLocalStorage';
import './GoalCardItemCard.scss';

interface Props {
   type: 'Carbohydrates' | 'Protein' | 'Fat';
   nutrientsTotal: number;
   page: 'search' | 'user-profile' | 'mealplan';
   setGoals?: Dispatch<SetStateAction<CurrentGoals>>;
   goals: CurrentGoals;
}

export const GoalCardItemCard = ({
   nutrientsTotal,
   type,
   page,
   setGoals,
   goals,
}: Props): ReactJSXElement => {
   const [colorMode, setColorMode] = useLocalStorageState('mode', 'dark');

   //takes in total macronutrient amount entered and also changes associated min and max amounts
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (setGoals !== undefined) {
         if (event.target.id === 'Carbohydrates') {
            let totalCarbs = parseInt(event.target.value);
            //declare min value here in case it will calculate to negative number
            let minCarbsPerMeal = totalCarbs <= 15 ? 0 : totalCarbs / 3 - 5;
            setGoals({
               ...goals,
               total_carbohydrates: totalCarbs,
            });
         } else if (event.target.id == 'Protein') {
            let totalProtein = parseInt(event.target.value);
            //declare min value here in case it will calculate to negative number
            let minProteinPerMeal =
               totalProtein <= 30 ? 0 : totalProtein / 3 - 10;
            setGoals({
               ...goals,
               total_protein: totalProtein,
            });
         } else if (event.target.id === 'Fat') {
            let totalFat = parseInt(event.target.value);
            //declare min value here in case it will calculate to negative number
            let minFatPerMeal = totalFat <= 30 ? 0 : totalFat / 3 - 10;
            setGoals({
               ...goals,
               total_fat: totalFat,
            });
         }
      }
   };

   return (
      <>
         <Card sx={{ borderRadius: '15%' }} elevation={5}>
            <CardContent
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '10rem',
                  width: '10rem',
                  aligItems: 'center',
                  gap: '1rem',
                  justifyContent: 'center',
               }}
            >
               <Typography
                  className='nutrient-type-text'
                  align='center'
                  variant='body1'
                  component='div'
               >
                  {type}
               </Typography>
               {page === 'user-profile' ? (
                  <Input
                     value={`${nutrientsTotal}`}
                     type='number'
                     endAdornment={'g'}
                     fullWidth
                     onInput={handleChange}
                     id={type}
                     required
                     inputProps={{ style: { textAlign: 'center' } }}
                  />
               ) : (
                  <Typography align='center' variant='h6'>
                     {nutrientsTotal} g
                  </Typography>
               )}
               {/* {type === 'Carbohydrates' && (
                  <Typography
                     align='center'
                     className='range-text'
                     variant='subtitle2'
                  >
                     Per meal: {goals.min_carbohydrates_per_meal} -{' '}
                     {goals.max_carbohydrates_per_meal}g
                  </Typography>
               )}
               {type === 'Protein' && (
                  <Typography
                     align='center'
                     className='range-text'
                     variant='subtitle2'
                  >
                     Per meal: {goals.min_protein_per_meal} -{' '}
                     {goals.max_protein_per_meal}g
                  </Typography>
               )}
               {type === 'Fat' && (
                  <Typography
                     align='center'
                     className='range-text'
                     variant='subtitle2'
                  >
                     Per meal: {goals.min_fat_per_meal} -{' '}
                     {goals.max_fat_per_meal}g
                  </Typography>
               )} */}
            </CardContent>
         </Card>
      </>
   );
};
