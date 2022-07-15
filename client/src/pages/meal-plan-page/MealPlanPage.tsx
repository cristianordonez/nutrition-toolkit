import React, { useState, useEffect } from 'react';
import { SidebarMealplan } from '../../components/sidebar-mealplan';
import { MealplanDay } from '../../components/mealplan-day';
import { CustomAlert } from '../../components/shared/CustomAlert';

import { Typography, Tabs, Tab, AlertColor } from '@mui/material';
import axios from 'axios';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const MealPlanPage = () => {
    const [dayIndex, setDayIndex] = useState<number>(getDay(Date.now()));
    const [mealplanItems, setMealplanItems] = useState<[]>([])
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [alertSeverity, setAlertSeverity] = useState<AlertColor | undefined>('error')
    const [alertMessage, setAlertMessage] = useState<string>('')
    const [currentDay, setCurrentDay] = useState(format(Date.now(), 'yyyy-MM-dd'))//spoonacular api needs date in format '2022-07-13'

    console.log('currentDay:', currentDay);
    const handleClose = (event: React.SyntheticEvent | Event) => {
        setOpenSnackbar(false);
     };
  
     const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setDayIndex(newValue);
      };

      console.log('dayIndex: ', dayIndex)
    useEffect(() => {
            axios.get('/api/mealplan/day', {params: {date: currentDay}, withCredentials: true}).then(response => {
            console.log('response in meal plan:', response)
            setMealplanItems(response.data.items);

        })
    }, [])

//todo edit the new drop down calendar component and give it the current day props 
    return (
        <>
        <SidebarMealplan />
        <Typography variant='h1'>Meal Planner</Typography>
        <Tabs value={dayIndex} onChange={handleTabChange}>
            {days.map(day => <Tab key={day} label={day}/>)}
        </Tabs>
        <MealplanDay setMealPlanItems={setMealplanItems} currentDay={currentDay} mealplanItems={mealplanItems} setOpenSnackbar={setOpenSnackbar} setAlertSeverity={setAlertSeverity} setAlertMessage={setAlertMessage}/>
        <CustomAlert openAlert={openSnackbar} handleAlert={handleClose} alertSeverity={alertSeverity} alertMessage={alertMessage}/>

        </>
    )
};
