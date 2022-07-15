import React, {Dispatch, SetStateAction} from 'react';
import {MealplanItem} from './MealplanItem';
import { AlertColor } from '@mui/material';
export type MealplanItemType = {
    id: number; 
    position: number;
    slot: number;
    type: string;
    value: {
        id: number;
        imageType: string;
        servings: number;
        title: string;
    }
}

interface Props {
    mealplanItems: MealplanItemType[];
    setOpenSnackbar: Dispatch<SetStateAction<boolean>>;
    setAlertSeverity: Dispatch<SetStateAction<AlertColor | undefined>>
    setAlertMessage: Dispatch<SetStateAction<string>>;
    setMealPlanItems: Dispatch<SetStateAction<[]>>; 
    currentDay: string;
}

//gets list of meal plan items, then renders one mealplanitem component per item
export const MealplanDay = ({mealplanItems, setMealPlanItems, setOpenSnackbar, setAlertSeverity, setAlertMessage, currentDay}: Props) => {
    console.log('mealplanItems', mealplanItems)
    if (mealplanItems.length) {
    return (
        <>
        {mealplanItems.map(item => 
        <MealplanItem key={item.id}
            position={item.position}
            slot={item.slot}
            type={item.type}
            id={item.value.id}
            shoppingListId={item.id}
            imageType={item.value.imageType}
            servings={item.value.servings}
            title={item.value.title}
            setOpenSnackbar={setOpenSnackbar}
            setAlertSeverity={setAlertSeverity}
            setAlertMessage={setAlertMessage}
            setMealPlanItems={setMealPlanItems}
            currentDay={currentDay}
        />
        )}
        </>
    )
        } else {
            return (<>Loading...</>)
        }
}