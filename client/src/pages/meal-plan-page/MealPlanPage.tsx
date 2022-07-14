import React, { useState, useEffect } from 'react';
import { SidebarMealplan } from '../../components/sidebar-mealplan';
import { MealplanDay } from '../../components/mealplan-day/MealplanDay';
import { Typography } from '@mui/material';
import axios from 'axios';
import getDay from 'date-fns/getDay'; //returns day in form of index, where 0 is Monday and Sunday is 6;
import fromUnixTime from 'date-fns/getUnixTime';
import format from 'date-fns/format';

//! items are getting added to wrong day, are one day ahead

//spoonacular api needs date in format '2022-07-13' 
export const MealPlanPage = () => {
    useEffect(() => {
    //    const currentDay = format(Date.now(), 'yyyy-MM-dd')
        // console.log('currentDay: ', currentDay);
        axios.get('/api/mealplan/day', {params: {date: '2022-07-13'}, withCredentials: true}).then(response => {
            console.log('response in meal plan:', response)
        })
    })

    //todo first get current date, send with above request to api, then update current meals 

    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',]
    return (
        <>
        <SidebarMealplan />
        <Typography variant='h1'>Meal Planner</Typography>
        <MealplanDay/>
        </>
    )
};


