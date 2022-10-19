import MenuBookIcon from '@mui/icons-material/MenuBook';
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
import React, {
   Dispatch,
   MouseEventHandler,
   SetStateAction,
   useState,
} from 'react';
import { FoodSearchResult } from '../../../../types/types';
import { StyledTableCell } from '../styled-table-components/StyledTableCell';
import { AddToCartModal } from './add-to-cart-modal/AddToCartModal';
import { FoodListRow } from './food-list-row/FoodListRow';
import './index.scss';
interface Props {
   searchResults: FoodSearchResult[];
   handleLoadMore: MouseEventHandler<HTMLButtonElement>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setOpenSnackbar: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   showLoadMoreBtn: boolean;
   enableAddToFoodLogFeature: boolean;
}

export const FoodSearchList = ({
   searchResults,
   handleLoadMore,
   setAlertMessage,
   setOpenSnackbar,
   setAlertSeverity,
   showLoadMoreBtn,
   enableAddToFoodLogFeature,
}: Props) => {
   const [openDialog, setOpenDialog] = useState<boolean>(false);
   const [currentId, setCurrentId] = useState<number>(0);
   const [currentDescription, setCurrentDescription] = useState<string>('');
   const [currentBrand, setCurrentBrand] = useState<string>('');
   const [currentModifier, setCurrentModifier] = useState<string | null>();
   const [currentDataType, setCurrentDataType] = useState<string>('');
   const [currentServingSizeUnit, setCurrentServingSizeUnit] =
      useState<string>('');
   const [currentServingSizes, setCurrentServingSizes] = useState<number[]>([
      100,
   ]);

   const handleOpeningAddToFoodLogDialog = (
      id: number,
      dataType: string,
      servingSizes: number[],
      servingSizeUnit: string,
      description: string,
      brand: string
   ) => {
      setCurrentId(id);
      setCurrentDataType(dataType);
      setCurrentServingSizes(servingSizes);
      setCurrentServingSizeUnit(servingSizeUnit);
      setCurrentDescription(description);
      setCurrentBrand(brand);
      setOpenDialog(!openDialog);
   };

   const handleOpeningDialog = () => {
      setOpenDialog(!openDialog);
   };
   console.log('searchResults: ', searchResults);
   return (
      <>
         <div className='food-search-list'>
            <Stack
               direction='row'
               spacing={{ xs: 0.5, sm: 1 }}
               sx={{ width: '100%' }}
            >
               <MenuBookIcon />
               <Typography variant='body1'>
                  Click on the arrow to the left of each search result to view
                  the nutrition facts for the item. Then click on any row to
                  save the item to your food log.
               </Typography>
            </Stack>
            <Typography variant='h6' align='left'>
               Search Results
            </Typography>
            <div className='food-search-main-container'>
               <TableContainer component={Paper}>
                  <Table stickyHeader={true} aria-label='search results'>
                     <TableHead>
                        <TableRow>
                           <StyledTableCell variant='head' />
                           <StyledTableCell>
                              Food&nbsp;Description
                           </StyledTableCell>
                           <StyledTableCell
                              align='right'
                              className='desktop-table-view'
                           >
                              Serving&nbsp;Size
                           </StyledTableCell>

                           {/* <StyledTableCell
                              align='right'
                              className='desktop-table-view'
                           >
                              Carbs&nbsp;(g)
                           </StyledTableCell>
                           <StyledTableCell
                              align='right'
                              className='desktop-table-view'
                           >
                              Protein&nbsp;(g)
                           </StyledTableCell>
                           <StyledTableCell
                              align='right'
                              className='desktop-table-view'
                           >
                              Fat&nbsp;(g)
                           </StyledTableCell> */}
                           <StyledTableCell align='right'>
                              Calories
                           </StyledTableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {searchResults.map((searchResult, index) => (
                           <FoodListRow
                              key={index}
                              handleOpeningAddToFoodLogDialog={
                                 handleOpeningAddToFoodLogDialog
                              }
                              brand_owner={searchResult.brand_owner}
                              custom_food_brand_owner={
                                 searchResult.custom_food_brand_owner
                              }
                              description={searchResult.description}
                              fdc_id={searchResult.fdc_id}
                              serving_size={searchResult.serving_size}
                              serving_size_unit={searchResult.serving_size_unit}
                              data_type={searchResult.data_type}
                              nutrition={searchResult.nutrition}
                              enableAddToFoodLogFeature={
                                 enableAddToFoodLogFeature
                              }
                              serving_size_conversion_factor={
                                 searchResult.serving_size_conversion_factor
                              }
                           />
                        ))}
                     </TableBody>
                  </Table>
               </TableContainer>
            </div>
            {showLoadMoreBtn ? (
               <Button fullWidth onClick={handleLoadMore} variant='text'>
                  Load More
               </Button>
            ) : null}
         </div>
         {enableAddToFoodLogFeature === true ? (
            <AddToCartModal
               openDialog={openDialog}
               handleOpeningDialog={handleOpeningDialog}
               id={currentId}
               currentDataType={currentDataType}
               currentServingSizes={currentServingSizes}
               currentServingSizeUnit={currentServingSizeUnit}
               setOpenDialog={setOpenDialog}
               currentDescription={currentDescription}
               setAlertMessage={setAlertMessage}
               setOpenSnackbar={setOpenSnackbar}
               setAlertSeverity={setAlertSeverity}
               currentModifier={currentModifier}
               currentBrand={currentBrand}
            />
         ) : null}
      </>
   );
};
