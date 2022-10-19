import { TableRow, Typography } from '@mui/material';
import React from 'react';
import {
   getNutrientFormattedName,
   getNutrientUnitSize,
} from '../../utils/getNutrientUnitInfoArray';
import { StyledTableCell } from '../styled-table-components/StyledTableCell';

interface Props {
   nutrientName: string;
   nutrientAmount: null | number | string;
   serving_size_conversion_factor: number;
}

const nutrientMap = {};

export const NutritionTableRow = ({
   nutrientName,
   nutrientAmount,
   serving_size_conversion_factor,
}: Props) => {
   if (nutrientName === 'fdc_id' || nutrientName === 'id') {
      return null;
   } else if (
      nutrientName === 'saturated_fat' ||
      nutrientName === 'trans_fat' ||
      nutrientName === 'dietary_fiber' ||
      nutrientName === 'total_sugars'
   ) {
      return (
         <>
            <TableRow>
               <StyledTableCell component='th' scope='row'>
                  <Typography variant='body2' sx={{ pl: '20px' }}>
                     {getNutrientFormattedName(nutrientName)}
                  </Typography>
               </StyledTableCell>
               {nutrientAmount !== null ? (
                  <StyledTableCell>
                     {Math.round(
                        Number(nutrientAmount) * serving_size_conversion_factor
                     )}
                     &nbsp;
                     {getNutrientUnitSize(nutrientName)}
                  </StyledTableCell>
               ) : (
                  <StyledTableCell>-</StyledTableCell>
               )}
            </TableRow>
         </>
      );
   } else {
      return (
         <>
            <TableRow>
               <StyledTableCell component='th' scope='row'>
                  <Typography variant='body1' fontWeight={'bold'}>
                     {getNutrientFormattedName(nutrientName)}
                  </Typography>
               </StyledTableCell>
               {nutrientAmount !== null ? (
                  <StyledTableCell>
                     {Math.round(
                        Number(nutrientAmount) * serving_size_conversion_factor
                     )}
                     &nbsp;
                     {getNutrientUnitSize(nutrientName)}
                  </StyledTableCell>
               ) : (
                  <StyledTableCell>-</StyledTableCell>
               )}
            </TableRow>
         </>
      );
   }
};
