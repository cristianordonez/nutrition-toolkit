import {
   Divider,
   FormControl,
   Paper,
   Stack,
   TextField,
   Typography,
} from '@mui/material';
import React, { ChangeEventHandler } from 'react';
import { FoodNutrition } from '../../../../types/types';
import { getNutrientFormattedName } from '../../utils/getNutrientUnitInfoArray';
interface Props {
   nutritionData: FoodNutrition;
   handleNutritionInput: ChangeEventHandler<
      HTMLInputElement | HTMLTextAreaElement
   >;
}
export const NutritionDataForm = ({
   nutritionData,
   handleNutritionInput,
}: Props) => {
   // const formatString = (string: string) => {
   //    let updatedString = string.replace('_', ' ');
   //    let words = updatedString.split(' ');
   //    for (let i = 0; i < words.length; i++) {
   //       words[i] =
   //          words[i][0].toUpperCase() + words[i].slice(1, words[i].length);
   //    }
   //    if (string === 'calories') {
   //       return words.join(' ');
   //    } else {
   //       return words.join(' ') + ` (${getNutrientUnitName(string)})`;
   //    }
   // };

   return (
      <>
         <Paper elevation={5} sx={{ width: '100%' }}>
            <Typography variant='h6' sx={{ p: '1rem' }}>
               Nutrition Facts
            </Typography>
            {Object.keys(nutritionData).map((nutrient, index) => (
               <React.Fragment key={index}>
                  <Divider />
                  <Stack
                     flexGrow={1}
                     alignItems='center'
                     justifyContent='space-between'
                     direction={'row'}
                     sx={{ p: '1rem' }}
                  >
                     {nutrient === 'calories' ||
                     nutrient === 'total_carbohydrates' ||
                     nutrient === 'protein' ||
                     nutrient === 'total_fat' ? (
                        <>
                           <Typography sx={{ fontWeight: 'bold' }}>
                              {getNutrientFormattedName(nutrient)}
                           </Typography>
                           <FormControl sx={{ maxWidth: '40%' }}>
                              <TextField
                                 value={
                                    nutritionData[
                                       `${nutrient}` as keyof FoodNutrition
                                    ]
                                 }
                                 required
                                 id={nutrient}
                                 label={'Required'}
                                 type='number'
                                 variant='outlined'
                                 inputProps={{ step: '0.1', lang: 'en-US' }}
                                 onChange={handleNutritionInput}
                                 fullWidth
                              />
                           </FormControl>
                        </>
                     ) : (
                        <>
                           <Typography variant='body2'>
                              {getNutrientFormattedName(nutrient)}
                           </Typography>
                           <FormControl sx={{ maxWidth: '40%' }}>
                              <TextField
                                 value={
                                    nutritionData[
                                       nutrient as keyof FoodNutrition
                                    ]
                                 }
                                 id={nutrient}
                                 label={'Optional'}
                                 type='number'
                                 variant='outlined'
                                 inputProps={{ step: '0.1', lang: 'en-US' }}
                                 onChange={handleNutritionInput}
                                 fullWidth
                              />
                           </FormControl>
                        </>
                     )}
                  </Stack>
               </React.Fragment>
            ))}
         </Paper>
      </>
   );
};
