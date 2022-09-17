import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MacroCalculatorForm } from '../../../components/macro-calculator-form';
import { useAuth } from '../../../context/authContext';
import { useHomeOutlet } from '../../../hooks/useHomeOutlet';
import './MacroCalculatorPage.scss';

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
      <>
         <div className='macro-calc-page'>
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
      </>
   );
};

export default MacroCalculatorPage;
