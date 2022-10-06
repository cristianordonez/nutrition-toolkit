import {
   AlertColor,
   Box,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   SelectChangeEvent,
   Stack,
} from '@mui/material';
import axios from 'axios';
import React, {
   Dispatch,
   MouseEventHandler,
   SetStateAction,
   useState,
} from 'react';
import { MealplanItem } from '../../../../../../types/types';
import { CreateFoodTextInput } from '../../../../components/form-input-components/CreateFoodTextInput';
import { FormNumberInput } from '../../../../components/form-input-components/FormNumberInput';
import { NutritionDataForm } from '../../../../components/form-input-components/NutritionDataForm';
import { ServingSizeUnitInput } from '../../../../components/form-input-components/ServingSizeUnitInput';
interface Props {
   openDialog: boolean;
   handleOpeningDialog: MouseEventHandler<HTMLButtonElement>;
   currentSlot: number;
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setOpenDialog: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   currentDay: string;
   setMealPlanItems: Dispatch<SetStateAction<MealplanItem[]>>;
   showNutrientDataForm: boolean;
   setShowNutrientDataForm: Dispatch<SetStateAction<boolean>>;
}

export const AddCustomFoodDialog = ({
   openDialog,
   handleOpeningDialog,
   currentSlot,
   currentDay,
   setAlertSeverity,
   setAlertMessage,
   setOpenDialog,
   setOpenAlert,
   setMealPlanItems,
   showNutrientDataForm,
   setShowNutrientDataForm,
}: Props) => {
   const initialFoodData = {
      date: currentDay,
      slot: currentSlot,
      data_type: 'custom',
      servings: 1,
      brand_name: '',
      description: '',
      serving_size: 1,
      serving_size_unit: '',
      nutrition: {
         calories: 0,
         calcium: 0,
         cholesterol: 0,
         dietary_fiber: 0,
         iron: 0,
         potassium: 0,
         protein: 0,
         saturated_fat: 0,
         monounsaturated_fat: 0,
         polyunsaturated_fat: 0,
         sodium: 0,
         sugar: 0,
         total_carbohydrates: 0,
         total_fat: 0,
         trans_fat: 0,
         vitamin_a: 0,
         vitamin_c: 0,
         vitamin_d: 0,
      },
   };

   const [createFoodData, setCreateFoodData] = useState(initialFoodData);

   const handleSubmit = async (event: React.FormEvent) => {
      try {
         event.preventDefault();
         setAlertSeverity('success');
         setAlertMessage('Food item has been added to your mealplan.');
         setOpenAlert(true);
         const updatedItems = await axios.post(
            '/api/mealplan/custom',
            createFoodData
         );
         setMealPlanItems(updatedItems.data as unknown as MealplanItem[]);
         setCreateFoodData(initialFoodData);
         setOpenDialog(false);
         setShowNutrientDataForm(false);
      } catch (err) {
         setAlertSeverity('error');
         setAlertMessage('Unable to add item to your mealplan.');
         setOpenAlert(true);
         setOpenDialog(false);
         console.log(err);
      }
   };

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCreateFoodData({
         ...createFoodData,
         [event.target.id]: event.target.value,
      });
   };

   const handleSelectChange = (event: SelectChangeEvent) => {
      setCreateFoodData({
         ...createFoodData,
         serving_size_unit: event.target.value,
      });
   };

   //  const handleSelectServings = (
   //     event: React.ChangeEvent<HTMLInputElement>
   //  ) => {
   //     setData((data: AddToMealPlanType) => {
   //        return {
   //           ...data,
   //           servings: event.target.value,
   //        };
   //     });
   //  };
   const handleShowingNutrientDataForm = (e: React.FormEvent) => {
      e.preventDefault();
      setShowNutrientDataForm(!showNutrientDataForm);
   };

   return (
      <>
         <Dialog open={openDialog} fullWidth>
            <DialogTitle>Create Custom Food</DialogTitle>
            <form onSubmit={handleSubmit}>
               <DialogContent>
                  {showNutrientDataForm ? (
                     <NutritionDataForm
                        nutritionData={createFoodData.nutrition}
                     />
                  ) : (
                     <Box display='flex' flexDirection='column' gap='10px'>
                        <CreateFoodTextInput
                           inputValue={createFoodData.brand_name}
                           title='Brand name'
                           id={'brand_name'}
                           handleInputChange={handleInputChange}
                        />
                        <CreateFoodTextInput
                           inputValue={createFoodData.description}
                           title='Description'
                           id={'description'}
                           handleInputChange={handleInputChange}
                        />
                        <Stack direction={'row'} spacing={1}>
                           <FormNumberInput
                              inputValue={createFoodData.serving_size}
                              handleNumberChange={handleInputChange}
                              helperText='Amount per serving'
                              label={'Serving size'}
                              id={'serving_size'}
                           />
                           <ServingSizeUnitInput
                              servingSizeUnit={createFoodData.serving_size_unit}
                              handleSelectChange={handleSelectChange}
                           />
                        </Stack>
                     </Box>
                  )}
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleOpeningDialog} color='error'>
                     Cancel
                  </Button>
                  {showNutrientDataForm ? (
                     <Button
                        data-testid='create-food-btn'
                        aria-label='submit form to create a new food'
                        type='submit'
                        color='success'
                     >
                        Submit
                     </Button>
                  ) : (
                     <Button
                        data-testid='create-food-btn'
                        aria-label='submit form to create a new food'
                        onClick={handleShowingNutrientDataForm}
                        color='info'
                     >
                        Almost done
                     </Button>
                  )}
               </DialogActions>
            </form>
         </Dialog>
      </>
   );
};
