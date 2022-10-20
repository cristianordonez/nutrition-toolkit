import React from 'react';
import { getNutrientUnitSize } from '../../../utils/getNutrientUnitInfoArray';
import { StyledTableCell } from '../../styled-table-components/StyledTableCell';

interface Props {
   nutrientName: string;
   nutrientAmount: null | number | string;
   serving_size: number | null;
   showRegularAmount: 'Amount per Serving' | 'Amount per 100 g';
}
export const NutritionTableCell = ({
   nutrientAmount,
   nutrientName,
   showRegularAmount,
   serving_size,
}: Props) => {
   if (nutrientAmount === null) {
      return <StyledTableCell align='right'>-</StyledTableCell>;
   } else {
      if (showRegularAmount === 'Amount per Serving') {
         return (
            <>
               <StyledTableCell align='right'>
                  {Math.round(
                     (Number(nutrientAmount) / 100) * Number(serving_size)
                  )}
                  &nbsp;
                  {getNutrientUnitSize(nutrientName)}
               </StyledTableCell>
            </>
         );
      } else {
         return (
            <>
               <StyledTableCell align='right'>
                  {Math.round(Number(nutrientAmount))}
                  &nbsp;
                  {getNutrientUnitSize(nutrientName)}
               </StyledTableCell>
            </>
         );
      }
   }
};
