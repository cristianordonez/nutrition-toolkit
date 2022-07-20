import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home-page/Home';
import { LoginPage } from './login-page/LoginPage';
import { MacroCalculatorPage } from './macro-calculator-page/MacroCalculatorPage';
import { MealPlanPage } from './meal-plan-page/MealPlanPage';
import { SearchPage } from './search-page/SearchPage';
import NavBar from '../components/navbar/NavBar';
import { AuthProvider } from '../context/authContext';
import { UserSettingsPage } from './user-profile-page/UserProfilePage';
import { CssBaseline } from '@mui/material'; //used to provide mui color theme to all components
export const App = () => {
   //todo use routes params to get user info

   return (
      <>
         <CssBaseline />
         <NavBar />
         <Routes>
            {/* PUBLIC PAGE */}
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginPage />} />
            <Route
               path='/search'
               element={
                  <AuthProvider>
                     <SearchPage />
                  </AuthProvider>
               }
            />
            <Route
               path='/mealplan'
               element={
                  <AuthProvider>
                     <MealPlanPage />
                  </AuthProvider>
               }
            />
            <Route
               path='/macrocalculator'
               element={
                  <AuthProvider>
                     <MacroCalculatorPage />
                  </AuthProvider>
               }
            />
            <Route
               path='/settings'
               element={
                  <AuthProvider>
                     <UserSettingsPage />
                  </AuthProvider>
               }
            />
         </Routes>
      </>
   );
};
