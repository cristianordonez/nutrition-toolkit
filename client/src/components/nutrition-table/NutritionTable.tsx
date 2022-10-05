import {
   Box,
   Collapse,
   Table,
   TableBody,
   TableCell,
   TableHead,
   Typography,
} from '@mui/material';
import React from 'react';
import { FoodNutrition } from '../../../../types/types';
import { StyledTableCell } from '../styled-table-components/StyledTableCell';
import { StyledTableRow } from '../styled-table-components/StyledTableRow';

interface Props {
   nutrition: FoodNutrition;
   open: boolean;
}
export const NutritionTable = ({ open, nutrition }: Props) => {
   return (
      <>
         <StyledTableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
               <Collapse in={open} timeout='auto' unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                     <>
                        <Typography variant='h6' gutterBottom component='div'>
                           Nutrition Facts
                        </Typography>
                        <Table
                           size='small'
                           aria-label='additional nutrition data'
                           stickyHeader={true}
                        >
                           <TableHead>
                              <StyledTableRow>
                                 <StyledTableCell>Nutrient</StyledTableCell>
                                 <StyledTableCell>Amount</StyledTableCell>
                              </StyledTableRow>
                           </TableHead>
                           <TableBody>
                              <StyledTableRow>
                                 <StyledTableCell
                                    sx={{ fontWeight: 'bold' }}
                                    component='th'
                                    scope='row'
                                 >
                                    Calories
                                 </StyledTableCell>
                                 {nutrition.calories !== null ? (
                                    <StyledTableCell>
                                       {nutrition.calories}
                                    </StyledTableCell>
                                 ) : (
                                    <StyledTableCell>-</StyledTableCell>
                                 )}
                              </StyledTableRow>
                              <StyledTableRow>
                                 <StyledTableCell
                                    sx={{ fontWeight: 'bold' }}
                                    component='th'
                                    scope='row'
                                 >
                                    Total Fat
                                 </StyledTableCell>
                                 {nutrition.total_fat !== null ? (
                                    <StyledTableCell>
                                       {nutrition.total_fat} g
                                    </StyledTableCell>
                                 ) : (
                                    <StyledTableCell>-</StyledTableCell>
                                 )}
                              </StyledTableRow>
                              <StyledTableRow>
                                 <StyledTableCell component='th' scope='row'>
                                    Saturated
                                 </StyledTableCell>
                                 {nutrition.saturated_fat !== null ? (
                                    <StyledTableCell>
                                       {nutrition.saturated_fat} g
                                    </StyledTableCell>
                                 ) : (
                                    <StyledTableCell>-</StyledTableCell>
                                 )}
                              </StyledTableRow>
                              <StyledTableRow>
                                 <StyledTableCell component='th' scope='row'>
                                    Trans
                                 </StyledTableCell>
                                 {nutrition.trans_fat !== null ? (
                                    <StyledTableCell>
                                       {nutrition.trans_fat} g
                                    </StyledTableCell>
                                 ) : (
                                    <StyledTableCell>-</StyledTableCell>
                                 )}
                              </StyledTableRow>
                              <StyledTableRow>
                                 <StyledTableCell component='th' scope='row'>
                                    Polyunsaturated
                                 </StyledTableCell>
                                 {nutrition.polyunsaturated_fat !== null ? (
                                    <StyledTableCell>
                                       {nutrition.polyunsaturated_fat} g
                                    </StyledTableCell>
                                 ) : (
                                    <StyledTableCell>-</StyledTableCell>
                                 )}
                              </StyledTableRow>
                              <StyledTableRow>
                                 <StyledTableCell component='th' scope='row'>
                                    Monounsaturated
                                 </StyledTableCell>
                                 {nutrition.monounsaturated_fat !== null ? (
                                    <StyledTableCell>
                                       {nutrition.monounsaturated_fat} g
                                    </StyledTableCell>
                                 ) : (
                                    <StyledTableCell>-</StyledTableCell>
                                 )}
                              </StyledTableRow>
                              <StyledTableRow>
                                 <StyledTableCell
                                    sx={{ fontWeight: 'bold' }}
                                    component='th'
                                    scope='row'
                                 >
                                    Cholesterol
                                 </StyledTableCell>
                                 {nutrition.cholesterol !== null ? (
                                    <StyledTableCell>
                                       {nutrition.cholesterol} mg
                                    </StyledTableCell>
                                 ) : (
                                    <StyledTableCell>-</StyledTableCell>
                                 )}
                              </StyledTableRow>
                              <StyledTableRow>
                                 <StyledTableCell
                                    sx={{ fontWeight: 'bold' }}
                                    component='th'
                                    scope='row'
                                 >
                                    Sodium
                                 </StyledTableCell>
                                 {nutrition.sodium !== null ? (
                                    <StyledTableCell>
                                       {nutrition.sodium} mg
                                    </StyledTableCell>
                                 ) : (
                                    <StyledTableCell>-</StyledTableCell>
                                 )}
                              </StyledTableRow>
                              <StyledTableRow>
                                 <StyledTableCell
                                    sx={{ fontWeight: 'bold' }}
                                    component='th'
                                    scope='row'
                                 >
                                    Total Carbohydrates
                                 </StyledTableCell>
                                 {nutrition.total_carbohydrates !== null ? (
                                    <StyledTableCell>
                                       {nutrition.total_carbohydrates} g
                                    </StyledTableCell>
                                 ) : (
                                    <StyledTableCell>-</StyledTableCell>
                                 )}
                              </StyledTableRow>
                              <StyledTableRow>
                                 <StyledTableCell component='th' scope='row'>
                                    Dietary Fiber
                                 </StyledTableCell>
                                 {nutrition.dietary_fiber !== null ? (
                                    <StyledTableCell>
                                       {nutrition.dietary_fiber} g
                                    </StyledTableCell>
                                 ) : (
                                    <StyledTableCell>-</StyledTableCell>
                                 )}
                              </StyledTableRow>
                              <StyledTableRow>
                                 <StyledTableCell component='th' scope='row'>
                                    Sugar
                                 </StyledTableCell>
                                 {nutrition.sugar !== null ? (
                                    <StyledTableCell>
                                       {nutrition.sugar} g
                                    </StyledTableCell>
                                 ) : (
                                    <StyledTableCell>-</StyledTableCell>
                                 )}
                              </StyledTableRow>
                              <StyledTableRow>
                                 <StyledTableCell
                                    sx={{ fontWeight: 'bold' }}
                                    component='th'
                                    scope='row'
                                 >
                                    Protein
                                 </StyledTableCell>
                                 {nutrition.protein !== null ? (
                                    <StyledTableCell>
                                       {nutrition.protein} g
                                    </StyledTableCell>
                                 ) : (
                                    <StyledTableCell>-</StyledTableCell>
                                 )}
                              </StyledTableRow>
                              <StyledTableRow>
                                 <StyledTableCell
                                    sx={{ fontWeight: 'bold' }}
                                    component='th'
                                    scope='row'
                                 >
                                    Vitamin D
                                 </StyledTableCell>
                                 {nutrition.vitamin_d !== null ? (
                                    <StyledTableCell>
                                       {nutrition.vitamin_d} %
                                    </StyledTableCell>
                                 ) : (
                                    <StyledTableCell>-</StyledTableCell>
                                 )}
                              </StyledTableRow>
                              <StyledTableRow>
                                 <StyledTableCell
                                    sx={{ fontWeight: 'bold' }}
                                    component='th'
                                    scope='row'
                                 >
                                    Calcium
                                 </StyledTableCell>
                                 {nutrition.calcium !== null ? (
                                    <StyledTableCell>
                                       {nutrition.calcium} %
                                    </StyledTableCell>
                                 ) : (
                                    <StyledTableCell>-</StyledTableCell>
                                 )}
                              </StyledTableRow>
                              <StyledTableRow>
                                 <StyledTableCell
                                    sx={{ fontWeight: 'bold' }}
                                    component='th'
                                    scope='row'
                                 >
                                    Iron
                                 </StyledTableCell>
                                 {nutrition.iron !== null ? (
                                    <StyledTableCell>
                                       {nutrition.iron} %
                                    </StyledTableCell>
                                 ) : (
                                    <StyledTableCell>-</StyledTableCell>
                                 )}
                              </StyledTableRow>
                              <StyledTableRow>
                                 <StyledTableCell
                                    sx={{ fontWeight: 'bold' }}
                                    component='th'
                                    scope='row'
                                 >
                                    Potassium
                                 </StyledTableCell>
                                 {nutrition.potassium !== null ? (
                                    <StyledTableCell>
                                       {nutrition.potassium} mg
                                    </StyledTableCell>
                                 ) : (
                                    <StyledTableCell>-</StyledTableCell>
                                 )}
                              </StyledTableRow>
                              <StyledTableRow>
                                 <StyledTableCell
                                    sx={{ fontWeight: 'bold' }}
                                    component='th'
                                    scope='row'
                                 >
                                    Vitamin A
                                 </StyledTableCell>
                                 {nutrition.vitamin_a !== null ? (
                                    <StyledTableCell>
                                       {nutrition.vitamin_a} %
                                    </StyledTableCell>
                                 ) : (
                                    <StyledTableCell>-</StyledTableCell>
                                 )}
                              </StyledTableRow>
                              <StyledTableRow>
                                 <StyledTableCell
                                    sx={{ fontWeight: 'bold' }}
                                    component='th'
                                    scope='row'
                                 >
                                    Vitamin C
                                 </StyledTableCell>
                                 {nutrition.vitamin_c !== null ? (
                                    <StyledTableCell>
                                       {nutrition.vitamin_c} %
                                    </StyledTableCell>
                                 ) : (
                                    <StyledTableCell>-</StyledTableCell>
                                 )}
                              </StyledTableRow>
                           </TableBody>
                        </Table>
                     </>
                  </Box>
               </Collapse>
            </TableCell>
         </StyledTableRow>
      </>
   );
};
