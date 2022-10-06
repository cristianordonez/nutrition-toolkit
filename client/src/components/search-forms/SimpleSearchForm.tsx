import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { AlertColor, Button, Stack } from '@mui/material';
import axios from 'axios';
import React, { Dispatch, SetStateAction } from 'react';
import { FoodSearchResult, Query } from '../../../../types/types';
import { QueryTextField } from '../form-input-components/QueryTextField';
interface Props {
   values: Query;
   handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   setValues: Dispatch<SetStateAction<any>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   setIsSearching: Dispatch<SetStateAction<boolean>>;
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setShowLoadMoreBtn: Dispatch<SetStateAction<boolean>>;
   setSearchResults: Dispatch<SetStateAction<FoodSearchResult[]>>;
   setSendAdvancedRequest: Dispatch<SetStateAction<boolean>>;
}

export const SimpleSearchForm = ({
   values,
   handleInputChange,
   setValues,
   setAlertMessage,
   setAlertSeverity,
   setIsSearching,
   setOpenAlert,
   setShowLoadMoreBtn,
   setSearchResults,
   setSendAdvancedRequest,
}: Props): ReactJSXElement => {
   const handleSuggestedSubmit = async (event: React.SyntheticEvent) => {
      try {
         event.preventDefault();
         let url = '/api/food/all';
         setIsSearching(true);
         setSendAdvancedRequest(false);
         let newValues = { ...values, offset: 0 }; //declare new values so that there are no async bugs, and reset offset to 0 in case user changed it
         setValues(newValues);
         const foodItems = await axios.get(url, {
            params: newValues,
         });
         if (foodItems.data.length === 0) {
            setAlertMessage(
               'No options matched your search. Try again with a broader search'
            );
            setAlertSeverity('warning');
            setOpenAlert(true);
            setShowLoadMoreBtn(false);
         } else {
            setAlertSeverity('success');
            setAlertMessage('Success! Here are your matching items.');
            setOpenAlert(true);
            if (foodItems.data.length < 6) {
               setShowLoadMoreBtn(false);
            } else {
               setShowLoadMoreBtn(true);
            }
            setSearchResults(foodItems.data);
         }
         setIsSearching(false);
      } catch (err) {
         setIsSearching(false); //used to trigger the loading circle
         setAlertSeverity('error');
         setAlertMessage(
            'Unable to get search results. Please try again later.'
         );
         setOpenAlert(true);
         console.log(err);
      }
   };

   return (
      <>
         <form onSubmit={handleSuggestedSubmit}>
            <Stack spacing={3}>
               <QueryTextField
                  query={values.query}
                  id={'query'}
                  handleInputChange={handleInputChange}
                  helperText={'Search by food'}
               />

               <Button type='submit' variant='contained'>
                  Submit
               </Button>
            </Stack>
         </form>
      </>
   );
};
