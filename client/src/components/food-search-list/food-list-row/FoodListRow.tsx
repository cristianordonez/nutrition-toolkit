import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { FoodSearchResult } from '../../../../../types/types';
import { getFoodTitle } from '../../../../../utils/getFoodTitle';
import { NutritionTable } from '../../nutrition-table/NutritionTable';
import './FoodListRow.scss';
interface Props extends FoodSearchResult {
   handleOpeningAddToFoodLogDialog: (
      id: number,
      dataType: string,
      servingSizes: number[],
      servingSizeUnit: string,
      description: string,
      brand: string
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
   serving_size_conversion_factor,
   handleOpeningAddToFoodLogDialog,
   enableAddToFoodLogFeature,
}: Props) => {
   const [open, setOpen] = useState<boolean>(false);
   let brand: string = '';
   let servingSizesArr = [100];
   let finalModifier: string | null = '';
   if (data_type === 'custom' && custom_food_brand_owner !== null) {
      brand = custom_food_brand_owner;
      finalModifier = 'Custom input';
   } else if (data_type === 'branded_food' && brand_owner !== null) {
      brand = brand_owner;
      finalModifier = '1 serving as per nutrition label';
   } else if (brand_owner !== null) {
      brand = brand_owner;
      finalModifier = serving_size_unit;
   }

   const handleOpeningRow = (e: React.MouseEvent) => {
      e.stopPropagation();
      setOpen(!open);
   };

   const handleOpeningModal = (e: React.MouseEvent) => {
      if (serving_size !== 100 && serving_size !== null) {
         servingSizesArr.push(serving_size);
      }
      if (serving_size_unit === null) {
         serving_size_unit = 'g';
      }
      handleOpeningAddToFoodLogDialog(
         parseInt(fdc_id),
         data_type,
         servingSizesArr,
         serving_size_unit,
         description,
         brand
      );
   };

   console.log(
      'serving_size_conversion_factor: ',
      serving_size_conversion_factor
   );
   return (
      <>
         <TableRow
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
            <TableCell className='desktop-table-view' align='right'>
               {serving_size}&nbsp;
               {serving_size_unit}
            </TableCell>

            <TableCell align='right'>
               {Math.round(
                  Number(nutrition.calories) *
                     Number(serving_size_conversion_factor)
               )}
            </TableCell>
         </TableRow>
         <NutritionTable
            open={open}
            nutrition={nutrition}
            serving_size_conversion_factor={serving_size_conversion_factor}
         />
      </>
   );
};
