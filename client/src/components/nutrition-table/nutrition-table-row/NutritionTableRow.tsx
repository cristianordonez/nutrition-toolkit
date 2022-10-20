import { TableRow, Typography } from '@mui/material';
import React from 'react';
import { getNutrientFormattedName } from '../../../utils/getNutrientUnitInfoArray';
import { StyledTableCell } from '../../styled-table-components/StyledTableCell';
import { NutritionTableCell } from './NutritionTableCell';

interface Props {
   nutrientName: string;
   nutrientAmount: null | number | string;
   serving_size: number | null;
   showRegularAmount: 'Amount per Serving' | 'Amount per 100 g';
}

export const NutritionTableRow = ({
   nutrientName,
   nutrientAmount,
   serving_size,
   showRegularAmount,
}: Props) => {
   if (
      nutrientName === 'id' ||
      nutrientName === 'meal_id' ||
      nutrientName === 'fdc_id'
   ) {
      return null;
   } else if (
      nutrientName === 'saturated_fat' ||
      nutrientName === 'trans_fat' ||
      nutrientName === 'dietary_fiber' ||
      nutrientName === 'total_sugars'
   ) {
      // make new component for all cells that either shows amount per 100 g or regular amount based on prop, both options return cell with - if null value
      return (
         <>
            <TableRow>
               <StyledTableCell component='th' scope='row'>
                  <Typography variant='body2' sx={{ pl: '20px' }}>
                     {getNutrientFormattedName(nutrientName)}
                  </Typography>
               </StyledTableCell>
               <NutritionTableCell
                  nutrientAmount={nutrientAmount}
                  nutrientName={nutrientName}
                  showRegularAmount={showRegularAmount}
                  serving_size={serving_size}
               />
            </TableRow>
         </>
      );
   } else {
      return (
         <>
            <TableRow>
               <StyledTableCell component='th' scope='row'>
                  <Typography variant='body2' fontWeight={'bold'}>
                     {getNutrientFormattedName(nutrientName)}
                  </Typography>
               </StyledTableCell>
               <NutritionTableCell
                  nutrientAmount={nutrientAmount}
                  nutrientName={nutrientName}
                  showRegularAmount={showRegularAmount}
                  serving_size={serving_size}
               />
            </TableRow>
         </>
      );
   }
};
