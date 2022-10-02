import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
   Box,
   Collapse,
   IconButton,
   Table,
   TableBody,
   TableCell,
   TableHead,
   Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { FoodSearchResult } from '../../../../types/types';
import { StyledTableCell } from '../styled-table-components/StyledTableCell';
import { StyledTableRow } from '../styled-table-components/StyledTableRow';
import './FoodListRow.scss';

interface Props extends FoodSearchResult {
   handleOpeningAddToMealplanDialog: (
      id: number,
      dataType: string,
      servingSizes: number[],
      servingSizeUnit: string,
      title: string,
      ingredients: string
   ) => void;
}

export const FoodListRow = ({
   brand_name,
   brand_owner,
   branded_food_category,
   description,
   ingredients,
   fdc_id,
   serving_size,
   serving_size_unit,
   data_type,
   nutrition,

   handleOpeningAddToMealplanDialog,
}: Props) => {
   const [open, setOpen] = useState<boolean>(false);

   let brand_name_updated = '';
   let description_updated = '';
   let title = '';
   if (brand_name !== null) {
      const brandNameArr = brand_name.split(' ');
      for (let i = 0; i < brandNameArr.length; i++) {
         brandNameArr[i] =
            brandNameArr[i][0] + brandNameArr[i].slice(1).toLowerCase();
      }
      brand_name_updated = brandNameArr.join(' ');
   }

   if (description !== null) {
      const descriptionArr = description.split(' ');
      for (let i = 0; i < descriptionArr.length; i++) {
         descriptionArr[i] =
            descriptionArr[i][0] + descriptionArr[i].slice(1).toLowerCase();
      }
      description_updated = descriptionArr.join(' ');
   }

   if (brand_name_updated !== '') {
      title = `${description_updated} (${brand_name_updated})`;
   } else {
      title = description_updated;
   }

   const handleOpeningRow = (e: React.MouseEvent) => {
      e.stopPropagation();
      setOpen(!open);
   };

   const handleOpeningModal = (e: React.MouseEvent) => {
      let servingSizesArr = [100];
      if (serving_size !== 100) {
         servingSizesArr.push(serving_size);
      }
      handleOpeningAddToMealplanDialog(
         parseInt(fdc_id),
         data_type,
         servingSizesArr,
         serving_size_unit,
         title,
         ingredients
      );
   };

   return (
      <>
         <StyledTableRow
            hover={true}
            onClick={handleOpeningModal}
            sx={{ '& > *': { borderBottom: 'unset' }, cursor: 'pointer' }}
         >
            <TableCell>
               <IconButton
                  aria-label='expand row'
                  size='small'
                  onClick={handleOpeningRow}
               >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
               </IconButton>
            </TableCell>
            <TableCell component='th' scope='row'>
               {title}
            </TableCell>
            <TableCell align='right'>{nutrition.calories}</TableCell>
            <TableCell align='right'>{nutrition.total_fat}</TableCell>
            <TableCell align='right'>{nutrition.total_carbohydrates}</TableCell>
            <TableCell align='right'>{nutrition.protein}</TableCell>
         </StyledTableRow>
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
