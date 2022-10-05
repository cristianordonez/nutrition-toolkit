import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton, TableCell } from '@mui/material';
import React, { useState } from 'react';
import { FoodSearchResult } from '../../../../types/types';
import { NutritionTable } from '../nutrition-table/NutritionTable';
import { StyledTableRow } from '../styled-table-components/StyledTableRow';
import './FoodListRow.scss';

interface Props extends FoodSearchResult {
   handleOpeningAddToMealplanDialog: (
      id: number,
      dataType: string,
      servingSizes: number[],
      servingSizeUnit: string,
      title: string,
      ingredients: string
   ) => void;
}

export const FoodListRow = ({
   brand_name,
   brand_owner,
   branded_food_category,
   description,
   ingredients,
   fdc_id,
   serving_size,
   serving_size_unit,
   data_type,
   nutrition,

   handleOpeningAddToMealplanDialog,
}: Props) => {
   const [open, setOpen] = useState<boolean>(false);

   let brand_name_updated = '';
   let description_updated = '';
   let title = '';
   if (brand_name !== null) {
      const brandNameArr = brand_name.split(' ');
      for (let i = 0; i < brandNameArr.length; i++) {
         brandNameArr[i] =
            brandNameArr[i][0] + brandNameArr[i].slice(1).toLowerCase();
      }
      brand_name_updated = brandNameArr.join(' ');
   }

   if (description !== null) {
      const descriptionArr = description.split(' ');
      for (let i = 0; i < descriptionArr.length; i++) {
         descriptionArr[i] =
            descriptionArr[i][0] + descriptionArr[i].slice(1).toLowerCase();
      }
      description_updated = descriptionArr.join(' ');
   }

   if (brand_name_updated !== '') {
      title = `${description_updated} (${brand_name_updated})`;
   } else {
      title = description_updated;
   }

   const handleOpeningRow = (e: React.MouseEvent) => {
      e.stopPropagation();
      setOpen(!open);
   };

   const handleOpeningModal = (e: React.MouseEvent) => {
      let servingSizesArr = [100];
      if (serving_size !== 100) {
         servingSizesArr.push(serving_size);
      }
      handleOpeningAddToMealplanDialog(
         parseInt(fdc_id),
         data_type,
         servingSizesArr,
         serving_size_unit,
         title,
         ingredients
      );
   };

   return (
      <>
         <StyledTableRow
            hover={true}
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
               {title}
            </TableCell>
            <TableCell align='right'>{nutrition.calories}</TableCell>
            <TableCell align='right'>{nutrition.total_fat}</TableCell>
            <TableCell align='right'>{nutrition.total_carbohydrates}</TableCell>
            <TableCell align='right'>{nutrition.protein}</TableCell>
         </StyledTableRow>
         <NutritionTable open={open} nutrition={nutrition} />
      </>
   );
};
