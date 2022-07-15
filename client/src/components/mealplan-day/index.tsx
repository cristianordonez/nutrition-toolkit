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
   breakfastItems: MealplanItemType[];
   lunchItems: MealplanItemType[];
   dinnerItems: MealplanItemType[];
}

//gets list of meal plan items, then renders one mealplanitem component per item
export const MealplanDay = ({
   mealplanItems,
   setMealPlanItems,
   setOpenSnackbar,
   setAlertSeverity,
   setAlertMessage,
   currentDay,
   breakfastItems,
   lunchItems,
   dinnerItems,
}: Props) => {
   console.log('mealplanItems', mealplanItems);

   console.log('breakfastItems:', breakfastItems);
   // useEffect(() => {
   //     mealplanItems.forEach(item => {
   //         if (item.slot === 1) {
   //             let currentBreakfastItems = [...breakfastItems, item];
   //             setBreakfastItems(currentBreakfastItems);
   //         } else if (item.slot === 2) {
   //             let currentLunchItems = [...lunchItems, item];
   //             setLunchItems(currentLunchItems);
   //         } else {
   //             let currentDinnerItems = [...dinnerItems, item];
   //             setDinnerItems(currentDinnerItems);
   //         }
   //     })
   // }, [mealplanItems])

   if (mealplanItems.length) {
      return (
         <>
            {breakfastItems.map((item) => (
               <React.Fragment key={item.id}>
                  <Typography variant='h3'>Breakfast</Typography>
                  <MealplanItem
                     position={item.position}
                     slot={item.slot}
                     type={item.type}
                     id={item.value.id}
                     shoppingListId={item.id}
                     imageType={item.value.imageType}
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
            {lunchItems.map((item) => (
               <React.Fragment key={item.id}>
                  <Typography variant='h3'>Lunch</Typography>
                  <MealplanItem
                     position={item.position}
                     slot={item.slot}
                     type={item.type}
                     id={item.value.id}
                     shoppingListId={item.id}
                     imageType={item.value.imageType}
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
            {dinnerItems.map((item) => (
               <React.Fragment key={item.id}>
                  <Typography variant='h3'>Dinner</Typography>
                  <MealplanItem
                     position={item.position}
                     slot={item.slot}
                     type={item.type}
                     id={item.value.id}
                     shoppingListId={item.id}
                     imageType={item.value.imageType}
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
      return <></>;
   }
};
