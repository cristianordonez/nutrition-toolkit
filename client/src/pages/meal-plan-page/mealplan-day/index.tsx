import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { MealplanItem } from './MealplanItem';
import { AlertColor, Typography, Grid, Stack } from '@mui/material';

export type MealplanItemType = {
   id: number;
   position: number;
   slot: number;
   type: string;
   value: {
      id: number;
      imageType: string;
      servings: number;
      title: string;
   };
};

interface Props {
   mealplanItems: MealplanItemType[];
   setOpenSnackbar: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setMealPlanItems: Dispatch<SetStateAction<[]>>;
   currentDay: string;
}

//gets list of meal plan items, then renders one mealplanitem component per item
export const MealplanDay = ({
   mealplanItems,
   setMealPlanItems,
   setOpenSnackbar,
   setAlertSeverity,
   setAlertMessage,
   currentDay,
}: Props) => {
   if (mealplanItems.length) {
      let breakfastItems: MealplanItemType[] = [];
      let lunchItems: MealplanItemType[] = [];
      let dinnerItems: MealplanItemType[] = [];

      mealplanItems.forEach((item) => {
         if (item.slot === 1) {
            breakfastItems.push(item);
         } else if (item.slot === 2) {
            lunchItems.push(item);
         } else {
            dinnerItems.push(item);
         }
      });
      return (
         <>
            <Stack direction='column'>
               <Typography variant='h3'>Morning</Typography>
               <Grid container spacing={1}>
                  {breakfastItems.map((item: MealplanItemType) => (
                     <React.Fragment key={item.id}>
                        <MealplanItem
                           position={item.position}
                           type={item.type}
                           id={item.value.id}
                           shoppingListId={item.id}
                           servings={item.value.servings}
                           title={item.value.title}
                           setOpenSnackbar={setOpenSnackbar}
                           setAlertSeverity={setAlertSeverity}
                           setAlertMessage={setAlertMessage}
                           setMealPlanItems={setMealPlanItems}
                           currentDay={currentDay}
                        />
                     </React.Fragment>
                  ))}
               </Grid>
            </Stack>
            <Stack direction='column'>
               <Typography variant='h3'>Afternoon</Typography>
               <Grid container spacing={1}>
                  {lunchItems.map((item) => (
                     <React.Fragment key={item.id}>
                        <MealplanItem
                           position={item.position}
                           type={item.type}
                           id={item.value.id}
                           shoppingListId={item.id}
                           servings={item.value.servings}
                           title={item.value.title}
                           setOpenSnackbar={setOpenSnackbar}
                           setAlertSeverity={setAlertSeverity}
                           setAlertMessage={setAlertMessage}
                           setMealPlanItems={setMealPlanItems}
                           currentDay={currentDay}
                        />
                     </React.Fragment>
                  ))}
               </Grid>
            </Stack>
            <Stack direction='column'>
               <Typography variant='h3'>Evening</Typography>
               <Grid container spacing={1}>
                  {dinnerItems.map((item) => (
                     <React.Fragment key={item.id}>
                        <MealplanItem
                           position={item.position}
                           type={item.type}
                           id={item.value.id}
                           shoppingListId={item.id}
                           servings={item.value.servings}
                           title={item.value.title}
                           setOpenSnackbar={setOpenSnackbar}
                           setAlertSeverity={setAlertSeverity}
                           setAlertMessage={setAlertMessage}
                           setMealPlanItems={setMealPlanItems}
                           currentDay={currentDay}
                        />
                     </React.Fragment>
                  ))}
               </Grid>
            </Stack>
         </>
      );
   } else {
      //todo render a sample mealplan here
      return (
         <>
            <Typography variant='h3'>Morning</Typography>
            <Typography variant='h3'>Afternoon</Typography>
            <Typography variant='h3'>Evening</Typography>
         </>
      );
   }
};
