import AddIcon from '@mui/icons-material/Add';
import {
   AlertColor,
   Button,
   Paper,
   Stack,
   Table,
   TableBody,
   TableContainer,
   TableHead,
   TableRow,
   Typography,
} from '@mui/material';
import axios from 'axios';
import React, { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import {
   CustomFoodInput,
   FoodLogItem,
   NutritionSummaryFoodLog,
} from '../../../../../../types/types';
import { StyledTableCell } from '../../../../components/styled-table-components/StyledTableCell';
import { FoodLogRow } from './FoodLogRow';
interface Props {
   meals: FoodLogItem[];
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   currentDay: string;
   setFoodLogItems: Dispatch<SetStateAction<FoodLogItem[]>>;
   slotName: string;
   key: number;
   setNutritionSummary: Dispatch<SetStateAction<NutritionSummaryFoodLog>>;
   handleOpeningDialog: () => void;
   slot: 1 | 2 | 3 | 4;
   setCreateFoodData: Dispatch<SetStateAction<CustomFoodInput>>;
   createFoodData: CustomFoodInput;
}

export const FoodLogSlot = ({
   meals,
   setOpenAlert,
   setAlertSeverity,
   setAlertMessage,
   setFoodLogItems,
   currentDay,
   slotName,
   setNutritionSummary,
   handleOpeningDialog,
   slot,
   setCreateFoodData,
   createFoodData,
}: Props) => {
   const navigate = useNavigate();

   const handleDeleteRow = async (id: number, currentDay: string) => {
      try {
         const axiosResponse = await axios.delete(`/api/foodLog/${id}`, {
            params: { currentDay },
            withCredentials: true,
         });
         setFoodLogItems(
            axiosResponse.data.updatedItems as unknown as FoodLogItem[]
         );

         setNutritionSummary(axiosResponse.data.updatedNutritionSummary);
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
   const handleDialogChild = () => {
      setCreateFoodData({ ...createFoodData, slot: slot });
      handleOpeningDialog();
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
                     <StyledTableCell variant='head' />
                     <StyledTableCell variant='head' />
                     <StyledTableCell variant='head' />
                  </TableRow>
               </TableHead>
               <TableBody>
                  {meals.map((meal) => (
                     <FoodLogRow
                        key={meal.fdc_id}
                        meal={meal}
                        currentDay={currentDay}
                        handleDeleteRow={handleDeleteRow}
                     />
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
