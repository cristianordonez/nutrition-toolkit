import React, { useState } from 'react';
import { CustomAlert } from '../../components/shared/CustomAlert';
import { AlertColor } from '@mui/material';
import { MacroCalculatorForm } from '../../components/shared/macro-calculator-form';
import NavBar from '../../components/navbar/NavBar';
import { useAuth } from '../../context/authContext';

export const MacroCalculatorPage = () => {
   const isLoading = useAuth();
   const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
   const [showNextPage, setShowNextPage] = useState(false);
   const [showSignup, setShowSignup] = useState(false);
   const [alertSeverity, setAlertSeverity] = useState<AlertColor | undefined>(
      'error'
   );
   const [alertMessage, setAlertMessage] = useState<string>(
      'No options matched your search. Try again with a broader search.'
   );

   const handleAlert = (event: React.SyntheticEvent | Event) => {
      setOpenSnackbar(false);
   };

   return isLoading ? null : (
      <>
         <NavBar isLoggedIn={true} />
         <MacroCalculatorForm
            setOpenErrorAlert={setOpenSnackbar}
            setErrorMessage={setAlertMessage}
            setShowNextPage={setShowNextPage}
            setShowSignup={setShowSignup}
            setAlertSeverity={setAlertSeverity}
            page={'macrocalculator'}
            showNextPage={showNextPage}
         />
         <CustomAlert
            openAlert={openSnackbar}
            handleAlert={handleAlert}
            alertSeverity={alertSeverity}
            alertMessage={alertMessage}
         />
      </>
   );
};
