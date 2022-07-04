import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home-page/Home';
import { LoginPage } from './login-page/LoginPage';
import { MacroCalculatorPage } from './macro-calculator-page/MacroCalculatorPage';
import MealPlan from './meal-plan-page/MealPlan';
import { SearchPage } from './search-page/SearchPage';
import NavBar from '../components/navbar/NavBar';
import { AuthProvider } from '../context/authContext';

export const App = () => {
   //todo use routes params to get user info

   return (
      <>
         <NavBar />
         <Routes>
            {/* PUBLIC PAGE */}
            <Route path='/' element={<Home />} />
            {/* LOGIN PAGE */}
            <Route path='/login' element={<LoginPage />} />
            {/* PROTECTED PAGE */}
            <Route
               path='/:user_id/search'
               element={
                  <AuthProvider>
                     <SearchPage />
                  </AuthProvider>
               }
            />
            {/* <Route path='/macro-calculator' element={<MacroCalculator />} /> */}
            {/* <Route path='/meal-plan' element={<MealPlan />} /> */}
         </Routes>
      </>
   );
};
