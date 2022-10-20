import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { FoodLogItem } from '../../../../../../types/types';
import { getFoodTitle } from '../../../../../../utils/getFoodTitle';
import { NutritionTable } from '../../../../components/nutrition-table';

interface Props {
   meal: FoodLogItem;
   currentDay: string;
   handleDeleteRow: (meal_id: number, currentDay: string) => void;
}

export const FoodLogRow = ({ meal, currentDay, handleDeleteRow }: Props) => {
   const [open, setOpen] = useState<boolean>(false);

   const handleOpeningRow = (e: React.MouseEvent) => {
      e.stopPropagation();
      setOpen(!open);
   };

   return (
      <>
         <TableRow
            hover={false}
            sx={{
               '& > *': { borderBottom: 'unset' },
            }}
         >
            <TableCell>
               <Tooltip
                  enterDelay={600}
                  enterNextDelay={1200}
                  title={`View item's nutrition facts`}
               >
                  <IconButton
                     aria-label='expand row'
                     size='small'
                     onClick={handleOpeningRow}
                  >
                     {open ? (
                        <KeyboardArrowUpIcon />
                     ) : (
                        <KeyboardArrowDownIcon />
                     )}
                  </IconButton>
               </Tooltip>
            </TableCell>
            <TableCell>
               {getFoodTitle(meal.brand_owner, meal.description)}
            </TableCell>
            <TableCell>
               {Number(meal.serving_size) * Number(meal.servings)}{' '}
               {meal.serving_size_unit}
            </TableCell>
            <TableCell>{meal.nutrition.calories} kcal</TableCell>
            <TableCell>
               <Tooltip
                  enterDelay={600}
                  enterNextDelay={1200}
                  title={`Delete item`}
               >
                  <IconButton
                     aria-label='delete from food log'
                     size='small'
                     onClick={() => handleDeleteRow(meal.meal_id, currentDay)}
                  >
                     <RemoveCircleIcon color='error' />
                  </IconButton>
               </Tooltip>
            </TableCell>
         </TableRow>
         <NutritionTable
            open={open}
            nutrition={meal.nutrition}
            serving_size={100} //this is needed because Nutrition Table is expecting nutrition to be per 100 g or mL, but meals in food log are saved as is (not standardized to 100)
            showStandardizedCol={false}
         />
      </>
   );
};
