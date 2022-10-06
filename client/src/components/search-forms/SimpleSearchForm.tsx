import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { AlertColor, Button, SelectChangeEvent, Stack } from '@mui/material';
import axios from 'axios';
import React, { Dispatch, SetStateAction } from 'react';
import { FoodSearchResult, Query } from '../../../../types/types';
import { QueryTextField } from '../form-input-components/QueryTextField';
interface Props {
   values: Query;
   handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   handleTypeSelect: (event: SelectChangeEvent) => void;
   setValues: Dispatch<SetStateAction<any>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   setLoading: Dispatch<SetStateAction<boolean>>;
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setShowLoadMoreBtn: Dispatch<SetStateAction<boolean>>;
   setSearchResults: Dispatch<SetStateAction<FoodSearchResult[]>>;
   setSendAdvancedRequest: Dispatch<SetStateAction<boolean>>;
}

export const SimpleSearchForm = ({
   values,
   handleInputChange,
   handleTypeSelect,
   setValues,
   setAlertMessage,
   setAlertSeverity,
   setLoading,
   setOpenAlert,
   setShowLoadMoreBtn,
   setSearchResults,
   setSendAdvancedRequest,
}: Props): ReactJSXElement => {
   const handleSuggestedSubmit = async (event: React.SyntheticEvent) => {
      try {
         event.preventDefault();
         setLoading(true);
         setSendAdvancedRequest(false);
         let newValues = { ...values, offset: 0 }; //declare new values so that there are no async bugs, and reset offset to 0 in case user changed it
         setValues(newValues);
         const foodItems = await axios.get(`/api/food/all`, {
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
         }
         setSearchResults(foodItems.data);
         setLoading(false);
      } catch (err) {
         setLoading(false); //used to trigger the loading circle
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
                  handleInputChange={handleInputChange}
               />

               <Button type='submit' variant='contained'>
                  Submit
               </Button>
            </Stack>
         </form>
      </>
   );
};
