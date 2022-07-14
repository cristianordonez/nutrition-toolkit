import React from 'react';
import {MealplanItem} from './MealplanItem';

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
}

//gets list of meal plan items, then renders one mealplanitem component per item
export const MealplanDay = ({mealplanItems}: Props) => {
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
            imageType={item.value.imageType}
            servings={item.value.servings}
            title={item.value.title}
        />
        )}
        </>
    )
        } else {
            return (<>Loading...</>)
        }
}