import {
   Box,
   Collapse,
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   SelectChangeEvent,
   Stack,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { FoodNutrition } from '../../../../types/types';
import { StyledTableCell } from '../styled-table-components/StyledTableCell';
import { NutritionTableRow } from './nutrition-table-row/NutritionTableRow';
import './NutritionTable.scss';

interface Props {
   nutrition: FoodNutrition;
   open: boolean;
   serving_size: null | number;
   showStandardizedCol: boolean;
}
export const NutritionTable = ({
   open,
   nutrition,
   serving_size,
   showStandardizedCol,
}: Props) => {
   const [showRegularAmount, setShowRegularAmount] = useState<
      'Amount per Serving' | 'Amount per 100 g'
   >('Amount per Serving');

   const handleSelectDataToShow = (event: SelectChangeEvent) => {
      setShowRegularAmount(
         event.target.value as 'Amount per Serving' | 'Amount per 100 g'
      );
   };

   const options = ['Amount per Serving', 'Amount per 100 g'];
   //since select control will be hidden on food log due to showstandardizedCol prop, they cant change state so regular amount per serving will always be shown
   return (
      <TableRow>
         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout='auto' unmountOnExit>
               <Box sx={{ margin: 1 }}>
                  <Stack
                     direction='row'
                     sx={{ width: '100%' }}
                     alignItems='center'
                  >
                     <Typography variant='h6' gutterBottom component='div'>
                        Nutrition Facts
                     </Typography>
                     {showStandardizedCol ? (
                        <FormControl sx={{ width: '100%' }}>
                           <InputLabel>Show</InputLabel>
                           <Select
                              value={showRegularAmount}
                              onChange={handleSelectDataToShow}
                              label='Show'
                              required
                              fullWidth
                              size='small'
                              id='data to show'
                           >
                              {options.map((option) => (
                                 <MenuItem value={option} key={option}>
                                    {option}
                                 </MenuItem>
                              ))}
                           </Select>
                        </FormControl>
                     ) : null}
                  </Stack>
                  <Table
                     size='small'
                     aria-label='additional nutrition data'
                     stickyHeader={true}
                  >
                     <TableHead>
                        <TableRow>
                           <StyledTableCell>Nutrient</StyledTableCell>
                           <StyledTableCell>
                              {showRegularAmount}
                           </StyledTableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {Object.entries(nutrition).map((nutrient) => (
                           <NutritionTableRow
                              key={nutrient[0]}
                              nutrientName={nutrient[0]}
                              nutrientAmount={nutrient[1]}
                              serving_size={serving_size}
                              showRegularAmount={showRegularAmount}
                           />
                        ))}
                     </TableBody>
                  </Table>
               </Box>
            </Collapse>
         </TableCell>
      </TableRow>
   );
};
