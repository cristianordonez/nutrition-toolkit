import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton, TableCell } from '@mui/material';
import React, { useState } from 'react';
import { FoodSearchResult } from '../../../../../types/types';
import { getFoodTitle } from '../../../../../utils/getFoodTitle';
import { NutritionTable } from '../../nutrition-table/NutritionTable';
import { StyledTableRow } from '../../styled-table-components/StyledTableRow';
import './FoodListRow.scss';
interface Props extends FoodSearchResult {
   handleOpeningAddToFoodLogDialog: (
      id: number,
      dataType: string,
      servingSizes: number[],
      servingSizeUnit: string,
      description: string,
      brand: string,
      modifier: string | null
   ) => void;
   enableAddToFoodLogFeature: boolean;
}
export const FoodListRow = ({
   brand_owner,
   description,
   fdc_id,
   serving_size,
   serving_size_unit,
   data_type,
   nutrition,
   custom_food_brand_owner,
   custom_food_serving_size,
   custom_food_serving_size_unit,
   gram_weight,
   modifier,
   handleOpeningAddToFoodLogDialog,
   enableAddToFoodLogFeature,
}: Props) => {
   const [open, setOpen] = useState<boolean>(false);
   let brand: string = '';
   let current_serving_size_unit: string | null = '';
   let current_serving_size: number | null = 0;
   let servingSizesArr = [100];
   let finalModifier: string | null = '';
   if (data_type === 'custom' && custom_food_brand_owner !== null) {
      brand = custom_food_brand_owner;
      current_serving_size_unit = custom_food_serving_size_unit;
      current_serving_size = custom_food_serving_size;
      finalModifier = 'Custom input';
   } else if (data_type === 'branded_food' && brand_owner !== null) {
      brand = brand_owner;
      current_serving_size_unit = serving_size_unit;
      current_serving_size = serving_size;
      finalModifier = '1 serving as per nutrition label';
   } else if (brand_owner !== null) {
      brand = brand_owner;
      current_serving_size_unit = 'g';
      current_serving_size = gram_weight;
      finalModifier = modifier;
   }

   const handleOpeningRow = (e: React.MouseEvent) => {
      e.stopPropagation();
      setOpen(!open);
   };

   const handleOpeningModal = (e: React.MouseEvent) => {
      if (current_serving_size !== 100 && current_serving_size !== null) {
         servingSizesArr.push(current_serving_size);
      }
      if (current_serving_size_unit === null) {
         current_serving_size_unit = 'g';
      }
      handleOpeningAddToFoodLogDialog(
         parseInt(fdc_id),
         data_type,
         servingSizesArr,
         current_serving_size_unit,
         description,
         brand,
         finalModifier
      );
   };

   return (
      <>
         <StyledTableRow
            data-testid='food-search-item'
            hover={enableAddToFoodLogFeature ? true : false}
            onClick={handleOpeningModal}
            sx={{ '& > *': { borderBottom: 'unset' }, cursor: 'pointer' }}
         >
            <TableCell>
               <IconButton
                  aria-label='expand row'
                  size='small'
                  onClick={handleOpeningRow}
               >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
               </IconButton>
            </TableCell>
            <TableCell component='th' scope='row'>
               {getFoodTitle(brand, description)}
            </TableCell>
            <TableCell align='right'>{nutrition.calories}</TableCell>
            <TableCell className='desktop-table-view' align='right'>
               {nutrition.total_fat}
            </TableCell>
            <TableCell className='desktop-table-view' align='right'>
               {nutrition.total_carbohydrates}
            </TableCell>
            <TableCell className='desktop-table-view' align='right'>
               {nutrition.protein}
            </TableCell>
         </StyledTableRow>
         <NutritionTable open={open} nutrition={nutrition} />
      </>
   );
};
