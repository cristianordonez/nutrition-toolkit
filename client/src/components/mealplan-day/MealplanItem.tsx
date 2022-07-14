import React, {useEffect} from 'react';
import { MealplanItemType } from '.';
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
 //call endpoint to get the rest of this items information 
export const MealplanItem = ({position, slot, type, id, imageType, servings, title }: Props) => {

    console.log('type in mealplanitem', type)
    //call endpoint to get the rest of the item information 
    useEffect(()=> {
        let url:string = `/api/recipes/${id}`; //set initial value to avoid typescript error
        if (type === 'RECIPE') {
            url = `/api/recipes/${id}`
        } else if (type === 'PRODUCT') {
            url = `/api/groceryProducts/${id}`
        } else if (type === 'MENU_ITEM') {
            url = `/api/menuItems/${id}`
        }
        
        axios.get(url).then(itemInfo => {
            console.log('iteminfo: ', itemInfo);
        }).catch(err => {
            console.log('err in meal plan item', err);
        })
         
        
    }, [id])
    return (
        <>
        <Paper>
            <Card>
            <CardMedia
                     component='img'
                     alt='food item image'
                     height='160'
                  />
                <CardContent>

                </CardContent>
            </Card>
        </Paper>
        </>
    )
}