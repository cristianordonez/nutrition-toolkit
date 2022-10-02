import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { AlertColor, Stack, Tab, Tabs, Typography } from '@mui/material';
import axios from 'axios';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import subDays from 'date-fns/subDays';
import React, {
   Dispatch,
   ReactNode,
   SetStateAction,
   useEffect,
   useState,
} from 'react';
import { NutritionSummaryMealplan } from '../../../../../types/types';
import { MealPlanWeekText } from '../../../components/mealplan-week-text/MealPlanWeekText';
import { useAuth } from '../../../context/authContext';
import { DateSelectForm } from './date-select-form/DateSelectForm';
import { MealplanDays } from './mealplan-days';
import './MealPlanPage.scss';

const days = [
   'Sunday',
   'Monday',
   'Tuesday',
   'Wednesday',
   'Thursday',
   'Friday',
   'Saturday',
];

interface Props {
   handleDrawerToggle: () => void;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   SearchFormComponent: ReactNode;
   setNutritionSummary: Dispatch<SetStateAction<NutritionSummaryMealplan>>;
   setMealplanItems: Dispatch<SetStateAction<any>>; //TODO add mealplan type
   mealplanItems: any; //TODO add mealplan type
   currentDay: string;
   setCurrentDay: Dispatch<SetStateAction<string>>;
}

const initialNutritionSummary = {
   total_calories: '0',
   total_protein: '0',
   total_fat: '0',
   total_carbohydrates: '0',
};

const MealPlanPage = ({
   handleDrawerToggle,
   setAlertMessage,
   setOpenAlert,
   setAlertSeverity,
   setNutritionSummary,
   setMealplanItems,
   currentDay,
   setCurrentDay,
   mealplanItems,
}: Props) => {
   const { isLoading, isLoggedin } = useAuth();
   const [dayIndex, setDayIndex] = useState<number>(getDay(Date.now()));
   const [value, setValue] = React.useState<any>(new Date(Date.now()));

   //#check for active mealplan items only when navigating to the mealplan page
   useEffect(() => {
      handleDateChange();
   }, [currentDay]);

   const handleDateChange = async () => {
      setMealplanItems([]); //when tab changes, reset the nutrition summary and the mealplan items
      // setNutritionSummary(initialNutritionSummary);
      try {
         const userMealplanItems = await axios.get('/api/mealplan/day', {
            params: { date: currentDay },
            withCredentials: true,
         });
         console.log('userMealplanItems: ', userMealplanItems);
         if (userMealplanItems.data.mealplanItems.length > 0) {
            console.log(
               'userMealplanItems.data in handledate change: ',
               userMealplanItems.data
            );
            setNutritionSummary(userMealplanItems.data.nutritionSummary[0]);
            setMealplanItems(userMealplanItems.data.mealplanItems);
         } else {
         }
      } catch (err) {
         console.log(err);
         setAlertSeverity('info');
         setAlertMessage(
            'You have no items saved on this day for your mealplan.'
         );
         setOpenAlert(true);
      }
   };

   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setMealplanItems([]); //when tab changes, reset the nutrition summary and the mealplan items
      setNutritionSummary(initialNutritionSummary);
      const prevDate = currentDay; //create variable to store the previous date and previous tab index
      const prevDayIndex = dayIndex;
      let differenceInDays = newValue - dayIndex; //find out how many days before or after current date is new selected date by finding difference between previous tab and current tab
      let newDate: Date | number | undefined;
      let { year, month, day } = getFormattedDay(currentDay);
      if (differenceInDays > 0) {
         //then update current date by adding or subtracting correct number of days
         newDate = addDays(
            new Date(`${year}, ${month}, ${day}`),
            differenceInDays
         );
      } else if (differenceInDays < 0) {
         newDate = subDays(
            new Date(`${year}, ${month}, ${day}`),
            Math.abs(differenceInDays)
         );
      }
      if (newDate !== undefined) {
         setValue(newDate); //updates the date textfield value
         setDayIndex(newValue);
         setCurrentDay(format(newDate, 'yyyy-MM-dd'));
      }
   };

   const getFormattedDay = (date: string) => {
      let dates = date.split('-');
      let year = dates[0];
      let month = dates[1];
      let day = dates[2];
      return { year, month, day };
   };

   return (
      <>
         <div className='mealplan-page'>
            <MealPlanWeekText currentDay={currentDay} />
            <div className='mealplan-page-main-content'>
               <Stack
                  direction='row'
                  spacing={{ xs: 1, sm: 4 }}
                  alignItems='space-evenly'
               >
                  <Stack direction='row' spacing={0.5} sx={{ width: '50%' }}>
                     <CalendarMonthIcon />
                     <Typography variant='body1'>
                        View your daily meal plan items or begin to add items to
                        your meal plan
                     </Typography>
                  </Stack>
                  {/* TODO provide a setmealplans function instead  */}
                  <DateSelectForm
                     currentDay={currentDay}
                     setCurrentDay={setCurrentDay}
                     setDayIndex={setDayIndex}
                     value={value}
                     setValue={setValue}
                  />
               </Stack>
               <div className='tabs-container'>
                  <Tabs
                     value={dayIndex}
                     onChange={handleTabChange}
                     variant='scrollable'
                     scrollButtons='auto'
                     aria-label='change mealplan date'
                  >
                     {days.map((day) => (
                        <Tab key={day} label={day} />
                     ))}
                  </Tabs>
               </div>
               {isLoading ? null : (
                  <MealplanDays
                     // setMealPlanItems={setMealplanItems}
                     currentDay={currentDay}
                     // mealplanItems={mealplanItems}
                     setOpenAlert={setOpenAlert}
                     setAlertSeverity={setAlertSeverity}
                     setAlertMessage={setAlertMessage}
                  />
               )}
            </div>
         </div>
      </>
   );
};

export default MealPlanPage;
