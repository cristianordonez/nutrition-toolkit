import { AlertColor, Stack } from '@mui/material';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
   CustomFoodInput,
   FoodLogItem,
   NutritionSummaryFoodLog,
} from '../../../../../../types/types';
import { AddCustomFoodDialog } from './AddCustomFoodDialog';
import { FoodLogSlot } from './FoodLogSlot';
interface Props {
   foodLogItems: FoodLogItem[];
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setFoodLogItems: Dispatch<SetStateAction<FoodLogItem[]>>;
   currentDay: string;
   setNutritionSummary: Dispatch<SetStateAction<NutritionSummaryFoodLog>>;
}

export const FoodLogDay = ({
   foodLogItems,
   setFoodLogItems,
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

   let breakfastItems: FoodLogItem[] = [];
   let lunchItems: FoodLogItem[] = [];
   let dinnerItems: FoodLogItem[] = [];
   let snackItems: FoodLogItem[] = [];

   if (foodLogItems.length) {
      foodLogItems.forEach((item) => {
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
         setAlertMessage('Custom food has been added to your food log!');
         const updatedItems = await axios.post(
            '/api/foodLog/custom',
            createFoodData
         );
         setFoodLogItems(
            updatedItems.data.updatedFoodLogItems as unknown as FoodLogItem[]
         );
         setOpenAlert(true);
         console.log('updatedItems in hadnelsubmit : ', updatedItems);
         setNutritionSummary(updatedItems.data.updatedNutritionSummary);
         setCreateFoodData(initialFoodData);
         handleOpeningDialog();
      } catch (err) {
         setAlertSeverity('error');
         setAlertMessage('Unable to add custom food to your food log');
         setOpenAlert(true);
         handleOpeningDialog();
         console.log(err);
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
               <FoodLogSlot
                  key={index}
                  slotName={mealSlotTitles[index]}
                  meals={meals}
                  setOpenAlert={setOpenAlert}
                  setAlertSeverity={setAlertSeverity}
                  setAlertMessage={setAlertMessage}
                  setFoodLogItems={setFoodLogItems}
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
