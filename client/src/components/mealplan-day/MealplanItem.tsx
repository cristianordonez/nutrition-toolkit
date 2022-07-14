import React, {useState, useEffect} from 'react';
import { MealplanItemType } from '.';
import { FoodItem } from '../shared/FoodItem';
import {
    Paper,
    Card,
    CardActions,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Grid,
 } from '@mui/material';
 import { GroceryItemNutrition, RecipeItemNutrition, MenuItemNutrition } from '../food-search-list/index.types';
import axios from 'axios';

interface Props {
    position: number;
    slot: number;
    type: string;
    id: number;
    imageType: string;
    servings: number;
    title: string;

}

type FoodItemType = {
    id: number;
    imageType: string;
    image: string;
    title: string;
    nutrition: GroceryItemNutrition | RecipeItemNutrition | MenuItemNutrition | any;
    description?: string;
    ingredientList?: string;
    route: string;
    url?: string;
    restaurantChain?: string;
}

export const MealplanItem = ({position, slot, type, id, imageType, servings, title }: Props) => {
    const [itemData, setItemData] = useState<null | FoodItemType>(null); //will hold value of the items data after calling endpoint

    const handleOpeningDialog = () => {
        console.log('change this')
    }

    useEffect(()=> {
        let url:string = `/api/recipes/${id}`; //set initial value for url to avoid typescript error
        if (type === 'RECIPE') {
            url = `/api/recipes/${id}`
        } else if (type === 'PRODUCT') {
            url = `/api/groceryProducts/${id}`
        } else if (type === 'MENU_ITEM') {
            url = `/api/menuItems/${id}`
        }
        
        //call endpoint to get the rest of the itemData information
        axios.get(url).then(itemInfo => {
            console.log('iteminfo: ', itemInfo);
            setItemData(itemInfo.data);
        }).catch(err => {
            console.log('err in meal plan itemData', err);
        })
    }, [id])

    if (itemData) {

        return (
            
            <>
            {type === 'RECIPE' && 
          <FoodItem 
             route={type}
             image={itemData?.image}
             title={itemData?.title}
             restaurantChain={itemData?.restaurantChain}
            nutrition={itemData?.nutrition}
             url={itemData?.url}
             handleOpeningDialog={handleOpeningDialog}
          />
            }
    
            </>
        )
    } else {
        return (
            <div>no items yet</div>
        )
    }

    
}