import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
   IconButton,
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Tooltip,
} from '@mui/material';
import React, { useState } from 'react';
import { FoodLogItem } from '../../../../../../../types/types';
import { NutritionTable } from '../../../../../components/nutrition-table';
import { StyledTableCell } from '../../../../../components/styled-table-components/StyledTableCell';
import { getFoodTitle } from '../../../../../utils/getFoodTitle';
interface Props {
   key: number;
   slotName: string;
   meals: FoodLogItem[];
}

export const SampleFoodLogSlot = ({ slotName, meals }: Props) => {
   const [open, setOpen] = useState<boolean>(false);
   const handleOpeningRow = (e: React.MouseEvent) => {
      e.stopPropagation();
      setOpen(!open);
   };

   return (
      <>
         <TableContainer component={Paper}>
            <Table aria-label={`Food items for ${slotName}`}>
               <TableHead>
                  <TableRow>
                     <StyledTableCell
                        sx={{ fontWeight: 'bold' }}
                        variant='head'
                     >
                        {slotName}
                     </StyledTableCell>
                     <StyledTableCell variant='head' />
                     <StyledTableCell
                        variant='head'
                        className='hide-on-mobile'
                     />
                     <StyledTableCell variant='head' />
                  </TableRow>
               </TableHead>
               <TableBody>
                  {meals.map((meal) => (
                     <React.Fragment key={meal.fdc_id}>
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
                           <TableCell className='hide-on-mobile'>
                              {Number(meal.serving_size) *
                                 Number(meal.servings)}{' '}
                              {meal.serving_size_unit}
                           </TableCell>
                           <TableCell>{meal.nutrition.calories} kcal</TableCell>
                        </TableRow>
                        <NutritionTable
                           open={open}
                           nutrition={meal.nutrition}
                           serving_size={100}
                           showStandardizedCol={false}
                        />
                     </React.Fragment>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </>
   );
};
