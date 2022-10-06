import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
   AlertColor,
   Button,
   IconButton,
   Paper,
   Stack,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   Tooltip,
   Typography,
} from '@mui/material';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
   CustomFoodInput,
   MealplanItem,
   NutritionSummaryMealplan,
} from '../../../../../../types/types';
import { getFoodTitle } from '../../../../../../utils/getFoodTitle';
import { NutritionTable } from '../../../../components/nutrition-table/NutritionTable';
import { StyledTableCell } from '../../../../components/styled-table-components/StyledTableCell';
import { StyledTableRow } from '../../../../components/styled-table-components/StyledTableRow';
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
   handleOpeningDialog: () => void;
   slot: 1 | 2 | 3 | 4;
   setCreateFoodData: Dispatch<SetStateAction<CustomFoodInput>>;
   createFoodData: CustomFoodInput;
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
   handleOpeningDialog,
   slot,
   setCreateFoodData,
   createFoodData,
}: Props) => {
   const navigate = useNavigate();
   const [open, setOpen] = useState<boolean>(false);

   const handleOpeningRow = (e: React.MouseEvent) => {
      e.stopPropagation();
      setOpen(!open);
   };

   const handleDeleteRow = async (id: number, currentDay: string) => {
      try {
         const axiosResponse = await axios.delete(`/api/mealplan/${id}`, {
            params: { currentDay },
            withCredentials: true,
         });
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

   //runs the handleopendialog function, but also updates the slot so dialog can receive it
   const handleDialogChild = (e: React.MouseEvent) => {
      setCreateFoodData({ ...createFoodData, slot: slot });
      handleOpeningDialog();
   };
   return (
      <>
         <TableContainer component={Paper}>
            <Table aria-label={`Food items for ${slotName}`}>
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
                           <TableCell>
                              {getFoodTitle(meal.brand_owner, meal.description)}
                           </TableCell>
                           <TableCell>
                              {Number(meal.serving_size) *
                                 Number(meal.servings)}{' '}
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
                                       handleDeleteRow(meal.meal_id, currentDay)
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
            </Table>
            <Stack sx={{ p: '5px' }} alignItems='center' direction='row'>
               <Button onClick={() => navigate('/home/search')}>
                  <AddIcon fontSize='small' />
                  <Typography variant='overline'>Add Food</Typography>
               </Button>
               <Button
                  variant='text'
                  color='secondary'
                  onClick={handleDialogChild}
               >
                  <AddIcon fontSize='small' />
                  <Typography variant='overline'>Add Custom Food</Typography>
               </Button>
            </Stack>
         </TableContainer>
      </>
   );
};
