import AddCircleIcon from '@mui/icons-material/AddCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { FoodSearchResult } from '../../../../../types/types';
import { getFoodTitle } from '../../../../../utils/getFoodTitle';
import { NutritionTable } from '../../nutrition-table';
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
   handleOpeningAddToFoodLogDialog,
   enableAddToFoodLogFeature,
}: Props) => {
   const [open, setOpen] = useState<boolean>(false);
   let brand: string = '';
   let servingSizesArr = [100]; //value for 1 is manually placed on DOM for correct order
   if (data_type === 'custom' && custom_food_brand_owner !== null) {
      brand = custom_food_brand_owner;
   } else if (data_type === 'branded_food' && brand_owner !== null) {
      brand = brand_owner;
   } else if (brand_owner !== null) {
      brand = brand_owner;
   }

   const handleOpeningRow = (e: React.MouseEvent) => {
      e.stopPropagation();
      setOpen(!open);
   };

   const handleOpeningModal = (e: React.MouseEvent) => {
      if (
         serving_size !== 100 &&
         serving_size !== null &&
         serving_size < 100 &&
         serving_size > 1
      ) {
         servingSizesArr.unshift(serving_size);
      } else if (
         serving_size !== 100 &&
         serving_size !== null &&
         serving_size > 100
      ) {
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

   return (
      <>
         <TableRow
            data-testid='food-search-item'
            sx={{ '& > *': { borderBottom: 'unset' } }}
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
                  (Number(nutrition.calories) / 100) * Number(serving_size)
               )}
            </TableCell>
            {enableAddToFoodLogFeature ? (
               <TableCell align='right'>
                  <Tooltip
                     enterDelay={600}
                     enterNextDelay={1200}
                     title={`Delete item`}
                  >
                     <IconButton
                        aria-label='add to food log'
                        size='small'
                        onClick={(e) => handleOpeningModal(e)}
                     >
                        <AddCircleIcon color='success' />
                     </IconButton>
                  </Tooltip>
               </TableCell>
            ) : (
               <TableCell></TableCell>
            )}
         </TableRow>
         <NutritionTable
            open={open}
            nutrition={nutrition}
            serving_size={serving_size}
            showStandardizedCol={true}
         />
      </>
   );
};
