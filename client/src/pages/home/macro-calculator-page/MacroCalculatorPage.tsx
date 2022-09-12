import React, { useState, useEffect } from 'react';
import './MacroCalculatorPage.scss';
import axios from 'axios';
import { Toolbar, IconButton } from '@mui/material';
import { MacroCalculatorForm } from '../../../components/macro-calculator-form';
import { useAuth } from '../../../context/authContext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useHomeOutlet } from '../../../hooks/useHomeOutlet';

const MacroCalculatorPage = () => {
   const {
      handleDrawerToggle,
      setAlertMessage,
      setOpenAlert,
      setAlertSeverity,
      setGoals,
      goals,
   } = useHomeOutlet();

   const { isLoading, isLoggedIn, username } = useAuth();
   const [showNextPage, setShowNextPage] = useState(false);
   const [showSignup, setShowSignup] = useState(false);

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

         <MacroCalculatorForm
            setOpenErrorAlert={setOpenAlert}
            setErrorMessage={setAlertMessage}
            setShowNextPage={setShowNextPage}
            setShowSignup={setShowSignup}
            setAlertSeverity={setAlertSeverity}
            page={'macrocalculator'}
            showNextPage={showNextPage}
         />
      </div>
   );
};

export default MacroCalculatorPage;
