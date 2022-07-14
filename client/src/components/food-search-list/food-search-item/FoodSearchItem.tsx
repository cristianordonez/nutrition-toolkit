import React, { useState, Dispatch, SetStateAction } from 'react';
import './FoodSearchItem.scss';
import {FoodItem} from '../../shared/FoodItem';
import {
   Paper,
   Card,
   CardActions,
   CardMedia,
   CardContent,
   Typography,
   Button,
   Grid,
   AlertColor,
} from '@mui/material';
import { AddToCartModal } from '../AddToCartModal';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {GroceryItemNutrition, RecipeItemNutrition, MenuItemNutrition} from '../index.types';



interface Props {
   id: number;
   imageType: string;
   image: string;
   title: string;
   nutrition: GroceryItemNutrition | RecipeItemNutrition | MenuItemNutrition | any;
   route: string;
   url?: string;
   restaurantChain?: string;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setOpenSnackbar: Dispatch<SetStateAction<boolean>> ;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor | undefined>>;
}

export const FoodSearchItem = ({
   route,
   image,
   imageType,
   title,
   nutrition,
   restaurantChain,
   url,
   id,
   setAlertMessage,
   setOpenSnackbar,
   setAlertSeverity,
}: Props) => {
   //item that appears in every item is image, title, nutrition,
   const [openDialog, setOpenDialog] = useState<boolean>(false);

   //open the dialog window when add to cart button is clicked
   const handleOpeningDialog = () => {
      setOpenDialog(!openDialog);
   };

   // let calories, carbs, fat, protein;

   // if (route === 'recipes') {
   //    nutrition.nutrients.forEach((nutrient: NutrientType) => {
   //       if (nutrient.name === 'Calories') {
   //          calories = Math.floor(nutrition.nutrients[0].amount);
   //       } else if (nutrient.name === 'Protein') {
   //          protein = Math.floor(nutrition.nutrients[1].amount) + 'g';
   //       } else if (nutrient.name === 'Fat') {
   //          fat = Math.floor(nutrition.nutrients[1].amount) + 'g';
   //       } else if (nutrient.name === 'Carbohydrates') {
   //          carbs = Math.floor(nutrition.nutrients[3].amount) + 'g';
   //       }
   //    });
   // } else {
   //    calories = nutrition.calories;
   //    protein = nutrition.protein;
   //    fat = nutrition.fat;
   //    carbs = nutrition.carbs;
   // }

   return (
      <>
         <Grid item xs={12} sm={6} md={4} xl={3}>
            <FoodItem 
                 route={route}
                 image={image}
                 title={title}
                 restaurantChain={restaurantChain}
               //   calories={calories}
               //   carbs={carbs}
               //   protein={protein}
               //   fat={fat}
               nutrition={nutrition}
                 url={url}
                 handleOpeningDialog={handleOpeningDialog}
            />
           
         </Grid>
         <AddToCartModal
            openDialog={openDialog}
            handleOpeningDialog={handleOpeningDialog}
            route={route}
            imageType={imageType}
            title={title}
            id={id}
            setOpenDialog={setOpenDialog}
            setAlertMessage={setAlertMessage}
            setOpenSnackbar={setOpenSnackbar}
            setAlertSeverity={setAlertSeverity}
         />
      </>
   );
};
