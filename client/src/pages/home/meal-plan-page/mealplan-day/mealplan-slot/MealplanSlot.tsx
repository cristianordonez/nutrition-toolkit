import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
   AlertColor,
   IconButton,
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableFooter,
   TableHead,
} from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MealplanItem } from '../../../../../../../types/types';
import { NutritionTable } from '../../../../../components/nutrition-table/NutritionTable';
import { StyledTableCell } from '../../../../../components/styled-table-components/StyledTableCell';
import { StyledTableRow } from '../../../../../components/styled-table-components/StyledTableRow';

interface Props {
   meals: MealplanItem[];
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   currentDay: string;
   setMealPlanItems: Dispatch<SetStateAction<MealplanItem[]>>;
   slotName: string;
   key: number;
}

export const MealplanSlot = ({
   meals,
   setOpenAlert,
   setAlertSeverity,
   setAlertMessage,
   setMealPlanItems,
   currentDay,
   slotName,
}: Props) => {
   const navigate = useNavigate();
   const [open, setOpen] = useState<boolean>(false);

   const handleOpeningRow = (e: React.MouseEvent) => {
      e.stopPropagation();
      setOpen(!open);
   };

   //TODO add onclick function to delete mealplan item
   //TODO change style of foodnutrition table
   //TODO  add button to footer
   return (
      <>
         <TableContainer component={Paper}>
            <Table>
               <TableHead>
                  <StyledTableRow>
                     <StyledTableCell
                        sx={{ fontWeight: 'bold' }}
                        variant='head'
                     >
                        {slotName}
                     </StyledTableCell>
                     <StyledTableCell variant='head' />
                     <StyledTableCell variant='head' />
                     <StyledTableCell variant='head' />
                  </StyledTableRow>
               </TableHead>
               <TableBody>
                  {meals.map((meal) => (
                     <React.Fragment key={meal.fdc_id}>
                        <StyledTableRow
                           hover={true}
                           sx={{
                              '& > *': { borderBottom: 'unset' },
                              cursor: 'pointer',
                           }}
                        >
                           <TableCell>
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
                           </TableCell>
                           <TableCell>{meal.title}</TableCell>
                           <TableCell>
                              {meal.serving_size * meal.servings}{' '}
                              {meal.serving_size_unit}
                           </TableCell>
                           <TableCell>{meal.nutrition.calories} kcal</TableCell>
                        </StyledTableRow>
                        <NutritionTable
                           open={open}
                           nutrition={meal.nutrition}
                        />
                     </React.Fragment>
                  ))}
                  <TableFooter>
                     <StyledTableCell>Add</StyledTableCell>
                  </TableFooter>
               </TableBody>
            </Table>
         </TableContainer>
      </>
   );
};

{
   /* <MealplanItem
                                   slotName={meal.slotName}
                                   id={meal.value.id}
                                   shoppingListId={meal.id}
                                   servings={meal.value.servings}
                                   title={meal.value.title || meal.value.name}
                                   setOpenAlert={setOpenAlert}
                                   image={meal.value.image}
                                   setAlertSeverity={setAlertSeverity}
                                   setAlertMessage={setAlertMessage}
                                   setMealPlanItems={setMealPlanItems}
                                   currentDay={currentDay}
                                   amount={meal.value.amount}
                                   unit={meal.value.unit}
                                /> */
}
