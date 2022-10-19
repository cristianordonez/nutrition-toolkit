import {
   Box,
   Collapse,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   Typography,
} from '@mui/material';
import React from 'react';
import { FoodNutrition } from '../../../../types/types';
import { StyledTableCell } from '../styled-table-components/StyledTableCell';
import './NutritionTable.scss';
import { NutritionTableRow } from './NutritionTableRow';
interface Props {
   nutrition: FoodNutrition;
   open: boolean;
   serving_size_conversion_factor: number;
}
export const NutritionTable = ({
   open,
   nutrition,
   serving_size_conversion_factor,
}: Props) => {
   return (
      <TableRow>
         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout='auto' unmountOnExit>
               <Box sx={{ margin: 1, minWidth: { xs: '0', sm: '400px' } }}>
                  <Typography variant='h6' gutterBottom component='div'>
                     Nutrition Facts
                  </Typography>
                  <Table
                     size='small'
                     aria-label='additional nutrition data'
                     stickyHeader={true}
                  >
                     <TableHead>
                        <TableRow>
                           <StyledTableCell>Nutrient</StyledTableCell>
                           <StyledTableCell>Amount</StyledTableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {Object.entries(nutrition).map((nutrient) => (
                           <NutritionTableRow
                              nutrientName={nutrient[0]}
                              nutrientAmount={nutrient[1]}
                              serving_size_conversion_factor={
                                 serving_size_conversion_factor
                              }
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
