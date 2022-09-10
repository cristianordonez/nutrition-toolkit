import React, { Dispatch, SetStateAction } from 'react';
import './MealplanDay.scss';
import { MealplanItem } from '../MealplanItem';
import { AlertColor } from '@mui/material';
import { MealplanItemType } from '../../../../../../types/types';

interface Props {
   meals: MealplanItemType[];
   setOpenSnackbar: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setMealPlanItems: Dispatch<SetStateAction<[]>>;
   currentDay: string;
}

export const MealplanDay = ({
   meals,
   setOpenSnackbar,
   setAlertSeverity,
   setAlertMessage,
   setMealPlanItems,
   currentDay,
}: Props) => {
   return (
      <>
         <div className='outer-container'>
            <div className='slider-container'>
               <div id='slider'>
                  {meals.map((meal, index) => (
                     <div className='slider-card' key={index}>
                        <MealplanItem
                           type={meal.type}
                           id={meal.value.id}
                           shoppingListId={meal.id}
                           servings={meal.value.servings}
                           title={meal.value.title}
                           setOpenSnackbar={setOpenSnackbar}
                           setAlertSeverity={setAlertSeverity}
                           setAlertMessage={setAlertMessage}
                           setMealPlanItems={setMealPlanItems}
                           currentDay={currentDay}
                        />
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </>
   );
};
