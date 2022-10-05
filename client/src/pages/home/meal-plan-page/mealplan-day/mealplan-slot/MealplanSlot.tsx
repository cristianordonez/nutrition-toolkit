import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
   AlertColor,
   Button,
   IconButton,
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableFooter,
   TableHead,
   TableRow,
   Tooltip,
} from '@mui/material';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
   MealplanItem,
   NutritionSummaryMealplan,
} from '../../../../../../../types/types';
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
   setNutritionSummary: Dispatch<SetStateAction<NutritionSummaryMealplan>>;
}

export const MealplanSlot = ({
   meals,
   setOpenAlert,
   setAlertSeverity,
   setAlertMessage,
   setMealPlanItems,
   currentDay,
   slotName,
   setNutritionSummary,
}: Props) => {
   const navigate = useNavigate();
   const [open, setOpen] = useState<boolean>(false);

   const handleOpeningRow = (e: React.MouseEvent) => {
      e.stopPropagation();
      setOpen(!open);
   };

   //TODO  add button to footer to link to navigate page
   //TODO change style of foodnutrition table

   const handleDeleteRow = async (id: number, currentDay: string) => {
      try {
         const axiosResponse = await axios.delete(`/api/mealplan/${id}`, {
            params: { currentDay },
            withCredentials: true,
         });
         console.log('axiosResponse: ', axiosResponse);
         setMealPlanItems(
            axiosResponse.data.updatedItems as unknown as MealplanItem[]
         );
         setNutritionSummary(axiosResponse.data.updatedNutritionSummary[0]);
         setAlertSeverity('success');
         setAlertMessage('Food item has been deleted');
         setOpenAlert(true);
      } catch (err) {
         console.log('err: ', err);
         setAlertSeverity('error');
         setAlertMessage('Unable to delete item. Please try again later.');
         setOpenAlert(true);
      }
   };
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
                     <StyledTableCell variant='head' />
                  </StyledTableRow>
               </TableHead>
               <TableBody>
                  {meals.map((meal) => (
                     <React.Fragment key={meal.fdc_id}>
                        <StyledTableRow
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
                           <TableCell>{meal.title}</TableCell>
                           <TableCell>
                              {meal.serving_size * meal.servings}{' '}
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
                                    aria-label='expand row'
                                    size='small'
                                    onClick={() =>
                                       handleDeleteRow(meal.id, currentDay)
                                    }
                                 >
                                    <RemoveCircleIcon color='error' />
                                 </IconButton>
                              </Tooltip>
                           </TableCell>
                        </StyledTableRow>
                        <NutritionTable
                           open={open}
                           nutrition={meal.nutrition}
                        />
                     </React.Fragment>
                  ))}
               </TableBody>
               <TableFooter>
                  <TableRow>
                     <TableCell
                        sx={{ whiteSpace: 'nowrap' }}
                        size='small'
                        variant='footer'
                     >
                        <Button
                           size='small'
                           variant='text'
                           onClick={() => navigate('/home/search')}
                        >
                           Add Food
                        </Button>
                     </TableCell>
                     <TableCell variant='footer' />
                     <TableCell variant='footer' />
                     <TableCell variant='footer' />
                     <TableCell variant='footer' />
                  </TableRow>
               </TableFooter>
            </Table>
         </TableContainer>
      </>
   );
};
