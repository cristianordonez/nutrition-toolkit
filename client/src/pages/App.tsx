import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './landing-page/LandingPage';
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
            <Route path='/' element={<Search />} />
            {/* <Route path='/' element={<LandingPage />} /> */}
            {/* <Route path='/macro-calculator' element={<MacroCalculator />} /> */}
            {/* <Route path='/meal-plan' element={<MealPlan />} /> */}
         </Routes>
      </>
   );
};

export default App;
