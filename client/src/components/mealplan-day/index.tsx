import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { MealplanItem } from './MealplanItem';
import { AlertColor, Typography } from '@mui/material';

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
   setAlertSeverity: Dispatch<SetStateAction<AlertColor | undefined>>;
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
      console.log('mealplanItems: ', mealplanItems);

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
            <Typography variant='h3'>Breakfast</Typography>
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
            <Typography variant='h3'>Lunch</Typography>
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
            <Typography variant='h3'>Dinner</Typography>
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
         </>
      );
   } else {
      //todo render a sample mealplan here
      return (
         <>
            <Typography variant='h3'>Breakfast</Typography>
            <Typography variant='h3'>Lunch</Typography>
            <Typography variant='h3'>Dinner</Typography>
         </>
      );
   }
};
