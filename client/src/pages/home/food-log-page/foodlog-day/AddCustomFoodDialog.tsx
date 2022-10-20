import {
   Box,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Divider,
   SelectChangeEvent,
   Stack,
   Typography,
} from '@mui/material';
import React, {
   Dispatch,
   FormEventHandler,
   MouseEventHandler,
   SetStateAction,
   useEffect,
   useState,
} from 'react';
import { CustomFoodInput } from '../../../../../../types/types';
import { CreateFoodTextInput } from '../../../../components/form-input-components/CreateFoodTextInput';
import { FormNumberInput } from '../../../../components/form-input-components/FormNumberInput';
import { NutritionDataForm } from '../../../../components/form-input-components/NutritionDataForm';
import { ServingSizeUnitInput } from '../../../../components/form-input-components/ServingSizeUnitInput';
interface Props {
   openDialog: boolean;
   handleOpeningDialog: MouseEventHandler<HTMLButtonElement>;
   showNutrientDataForm: boolean;
   setShowNutrientDataForm: Dispatch<SetStateAction<boolean>>;
   createFoodData: CustomFoodInput;
   setCreateFoodData: Dispatch<SetStateAction<CustomFoodInput>>;
   handleSubmit: FormEventHandler;
}

export const AddCustomFoodDialog = ({
   openDialog,
   handleOpeningDialog,
   showNutrientDataForm,
   createFoodData,
   setCreateFoodData,
   handleSubmit,
   setShowNutrientDataForm,
}: Props) => {
   const [textFieldError, setTextFieldError] = useState<boolean>(false);
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

   const handleNutritionInput = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setCreateFoodData((createFoodData) => ({
         ...createFoodData,
         nutrition: {
            ...createFoodData.nutrition,
            // [event.target.id]: parseFloat(event.target.value),
            [event.target.id]: event.target.value,
         },
      }));
   };

   const handleShowingNutrientDataForm = (e: React.FormEvent) => {
      e.preventDefault();
      if (createFoodData.description === '') {
         setTextFieldError(true);
      } else {
         setShowNutrientDataForm(!showNutrientDataForm);
      }
   };

   useEffect(() => {
      setTextFieldError(false);
   }, [openDialog]);

   return (
      <>
         <Dialog open={openDialog} fullWidth>
            <DialogTitle>Create Custom Food</DialogTitle>
            <form onSubmit={handleSubmit}>
               <DialogContent sx={{ p: 0, width: '100%' }}>
                  {showNutrientDataForm ? (
                     <NutritionDataForm
                        handleNutritionInput={handleNutritionInput}
                        nutritionData={createFoodData.nutrition}
                     />
                  ) : (
                     <Box display='flex' flexDirection='column' gap='10px'>
                        <CreateFoodTextInput
                           inputValue={createFoodData.brand_owner}
                           title='Brand owner'
                           id={'brand_owner'}
                           textFieldError={false}
                           handleInputChange={handleInputChange}
                        />
                        <CreateFoodTextInput
                           inputValue={createFoodData.description}
                           title='Description'
                           textFieldError={textFieldError}
                           id={'description'}
                           handleInputChange={handleInputChange}
                        />
                        <Divider />
                        <Stack
                           spacing={2}
                           direction={'row'}
                           alignItems='center'
                           justifyContent={'center'}
                           sx={{ pl: '1rem', pr: '1rem' }}
                        >
                           <Typography
                              sx={{ minWidth: '25%' }}
                              variant='body2'
                              align='left'
                           >
                              Serving Size
                           </Typography>
                           <FormNumberInput
                              inputValue={createFoodData.serving_size}
                              handleNumberChange={handleInputChange}
                              label={'Amount per serving'}
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
