import { AlertColor, Stack } from '@mui/material';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
   CustomFoodInput,
   MealplanItem,
   NutritionSummaryMealplan,
} from '../../../../../../types/types';
import { AddCustomFoodDialog } from './AddCustomFoodDialog';
import { MealplanSlot } from './MealplanSlot';
interface Props {
   mealplanItems: MealplanItem[];
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setMealPlanItems: Dispatch<SetStateAction<MealplanItem[]>>;
   currentDay: string;
   setNutritionSummary: Dispatch<SetStateAction<NutritionSummaryMealplan>>;
}

//gets list of meal plan items, then renders one mealplanitem component per item
export const MealplanDay = ({
   mealplanItems,
   setMealPlanItems,
   setOpenAlert,
   setAlertSeverity,
   setAlertMessage,
   currentDay,
   setNutritionSummary,
}: Props) => {
   const [openDialog, setOpenDialog] = useState(false);
   const [showNutrientDataForm, setShowNutrientDataForm] =
      useState<boolean>(false); //controls showing second part of create new food dialog
   //showNutrientDataForm state was moved here because when canceling before submitting it was still showing second part of form
   const initialFoodData = {
      date: currentDay,
      slot: 1 as 1 | 2 | 3 | 4,
      data_type: 'custom',
      servings: 1,
      brand_owner: '',
      description: '',
      serving_size: 100,
      serving_size_unit: 'g',
      nutrition: {
         calories: '',
         total_fat: '',
         saturated_fat: '',
         polyunsaturated_fat: '',
         monounsaturated_fat: '',
         trans_fat: '',
         cholesterol: '',
         sodium: '',
         potassium: '',
         total_carbohydrates: '',
         dietary_fiber: '',
         sugar: '',
         protein: '',
         vitamin_a: '',
         vitamin_c: '',
         calcium: '',
         iron: '',
         vitamin_d: '',
      },
   };

   const [createFoodData, setCreateFoodData] =
      useState<CustomFoodInput>(initialFoodData);

   let breakfastItems: MealplanItem[] = [];
   let lunchItems: MealplanItem[] = [];
   let dinnerItems: MealplanItem[] = [];
   let snackItems: MealplanItem[] = [];

   if (mealplanItems.length) {
      mealplanItems.forEach((item) => {
         if (item.slot === 1) {
            breakfastItems.push(item);
         } else if (item.slot === 2) {
            lunchItems.push(item);
         } else if (item.slot === 3) {
            dinnerItems.push(item);
         } else {
            snackItems.push(item);
         }
      });
   }

   const handleSubmit = async (event: React.FormEvent) => {
      try {
         event.preventDefault();
         setAlertSeverity('success');
         setAlertMessage('Custom food has been added to your mealplan');
         setOpenAlert(true);
         const updatedItems = await axios.post(
            '/api/mealplan/custom',
            createFoodData
         );
         setMealPlanItems(
            updatedItems.data.updatedMealItems as unknown as MealplanItem[]
         );
         setNutritionSummary(updatedItems.data.updatedNutritionSummary[0]);
         setCreateFoodData(initialFoodData);
         handleOpeningDialog();
      } catch (err) {
         setAlertSeverity('error');
         setAlertMessage('Unable to add custom food to your mealplan');
         setOpenAlert(true);
         console.log(err);
         handleOpeningDialog();
      }
   };

   const handleOpeningDialog = () => {
      setOpenDialog(!openDialog);
      setTimeout(() => {
         setShowNutrientDataForm(false);
      }, 1000);
   };

   const mealSlotTitles = ['Morning', 'Afternoon', 'Evening', 'Snack'];
   const slotNumbers = [1, 2, 3, 4];
   const mealItems = [breakfastItems, lunchItems, dinnerItems, snackItems];

   return (
      <>
         <Stack direction='column' spacing={4} sx={{ width: '100%' }}>
            {mealItems.map((meals, index) => (
               <MealplanSlot
                  key={index}
                  slotName={mealSlotTitles[index]}
                  meals={meals}
                  setOpenAlert={setOpenAlert}
                  setAlertSeverity={setAlertSeverity}
                  setAlertMessage={setAlertMessage}
                  setMealPlanItems={setMealPlanItems}
                  currentDay={currentDay}
                  setNutritionSummary={setNutritionSummary}
                  handleOpeningDialog={handleOpeningDialog}
                  setCreateFoodData={setCreateFoodData}
                  createFoodData={createFoodData}
                  slot={slotNumbers[index] as 1 | 2 | 3 | 4}
               />
            ))}
            <AddCustomFoodDialog
               openDialog={openDialog}
               showNutrientDataForm={showNutrientDataForm}
               setShowNutrientDataForm={setShowNutrientDataForm}
               handleOpeningDialog={handleOpeningDialog}
               setCreateFoodData={setCreateFoodData}
               createFoodData={createFoodData}
               handleSubmit={handleSubmit}
            />
         </Stack>
      </>
   );
};
