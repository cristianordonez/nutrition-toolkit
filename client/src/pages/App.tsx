import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home-page/Home';
import LoginPage from './login-page/LoginPage';
import MacroCalculator from './macro-calculator-page/MacroCalculator';
import MealPlan from './meal-plan-page/MealPlan';
import Search from './search-page/Search';
import NavBar from '../components/navbar/NavBar';

const App = () => {
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
            <Route path='/:customer_id/search' element={<Search />} />
            {/* <Route path='/macro-calculator' element={<MacroCalculator />} /> */}
            {/* <Route path='/meal-plan' element={<MealPlan />} /> */}
         </Routes>
      </>
   );
};

export default App;
