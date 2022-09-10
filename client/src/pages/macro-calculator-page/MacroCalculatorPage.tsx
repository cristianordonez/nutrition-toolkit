import React, { useState, useEffect } from 'react';
import './MacroCalculatorPage.scss';
import axios from 'axios';
import { CustomAlert } from '../../components/custom-alert/CustomAlert';
import { AlertColor, Toolbar, IconButton } from '@mui/material';
import { MacroCalculatorForm } from '../../components/macro-calculator-form';
import { useAuth } from '../../context/authContext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { SideBar } from '../../components/sidebar/SideBar';
import { CurrentGoals } from '../../../../types/types';

const MacroCalculatorPage = () => {
   const [goals, setGoals] = useState<CurrentGoals | {}>({});
   const { isLoading, isLoggedIn, username } = useAuth();
   const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
   const [showNextPage, setShowNextPage] = useState(false);
   const [showSignup, setShowSignup] = useState(false);
   const [alertSeverity, setAlertSeverity] = useState<AlertColor>('error');
   const [alertMessage, setAlertMessage] = useState<string>(
      'No options matched your search. Try again with a broader search.'
   );
   const [mobileOpen, setMobileOpen] = React.useState(false);

   const handleAlert = (event: React.SyntheticEvent | Event) => {
      setOpenSnackbar(false);
   };

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   useEffect(() => {
      getGoals();
   }, []);

   const getGoals = async () => {
      try {
         let currentGoals = await axios.get('/api/metrics');
         setGoals(currentGoals.data);
      } catch (err) {
         console.log(err);
      }
   };
   return isLoading ? null : (
      <div className='macro-calc-page'>
         <Toolbar sx={{ display: { sm: 'none' }, alignSelf: 'flex-start' }}>
            <IconButton
               color='inherit'
               aria-label='open drawer'
               edge='start'
               onClick={handleDrawerToggle}
               sx={{ mr: 2, display: { sm: 'none' } }}
            >
               <ArrowForwardIosIcon />
            </IconButton>
         </Toolbar>
         {Object.keys(goals).length > 0 ? (
            <SideBar
               mobileOpen={mobileOpen}
               handleDrawerToggle={handleDrawerToggle}
               page='macrocalculator'
               goals={goals}
            />
         ) : null}

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
      </div>
   );
};

export default MacroCalculatorPage;
