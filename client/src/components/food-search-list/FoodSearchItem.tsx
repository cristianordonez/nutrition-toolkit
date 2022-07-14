import React, { useState, Dispatch, SetStateAction } from 'react';
import './FoodSearchItem.scss';
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
import { AddToCartModal } from './AddToCartModal';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {GroceryItemNutrition, RecipeItemNutrition, MenuItemNutrition} from './index.types';

type NutrientType = {
   name: string;
   amount: number;
   percentOfDailyNeeds: number;
   unit: string;
   id: number;
};

interface Props {
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
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setOpenSnackbar: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity:Dispatch<SetStateAction<AlertColor | undefined>>;
}

export const FoodSearchItem = ({
   route,
   image,
   imageType,
   title,
   nutrition,
   description,
   ingredientList,
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

   let calories, carbs, fat, protein;

   if (route === 'recipes') {
      nutrition.nutrients.forEach((nutrient: NutrientType) => {
         if (nutrient.name === 'Calories') {
            calories = Math.floor(nutrition.nutrients[0].amount);
         } else if (nutrient.name === 'Protein') {
            protein = Math.floor(nutrition.nutrients[1].amount) + 'g';
         } else if (nutrient.name === 'Fat') {
            fat = Math.floor(nutrition.nutrients[1].amount) + 'g';
         } else if (nutrient.name === 'Carbohydrates') {
            carbs = Math.floor(nutrition.nutrients[3].amount) + 'g';
         }
      });
   } else {
      calories = nutrition.calories;
      protein = nutrition.protein;
      fat = nutrition.fat;
      carbs = nutrition.carbs;
   }
console.log('url:', url)
   return (
      <>
         <Grid item xs={12} sm={6} md={4} xl={3}>
            <Paper elevation={1} className='food-search-paper'>
               <Card className='search-item' data-testid='food-search-item'>
                  <CardMedia
                     component='img'
                     alt='food item image'
                     height='160'
                     image={image}
                  />
                  <CardContent>
                     {route === 'recipes' ? (
                    
                          
                              <Typography variant='overline'>
                                 {title}
                              </Typography>
                       
                   
                     ) : (
                        <Typography variant='overline'>{title}</Typography>
                     )}
                     {route === 'menuItems' && (
                        <Typography variant='h6'>{restaurantChain}</Typography>
                     )}
                     <div className='search-item-nutrition'>
                        {/* CALORIES */}
                        <div className='search-item-nutrient'>
                           <Typography variant='subtitle2'>
                              <strong>Calories</strong>
                           </Typography>
                           <Typography variant='body1'>{calories}</Typography>
                        </div>
                        {/*   CARBS  */}
                        <div className='search-item-nutrient'>
                           <Typography variant='subtitle2'>
                              <strong>Carbs</strong>
                           </Typography>
                           <Typography variant='body1'>{carbs}</Typography>
                        </div>
                        {/* PROTEIN */}
                        <div className='search-item-nutrient'>
                           <Typography variant='subtitle2'>
                              <strong>Protein</strong>
                           </Typography>
                           <Typography variant='body1'>{protein}</Typography>
                        </div>
                        {/* FAT */}
                        <div className='search-item-nutrient'>
                           <Typography variant='subtitle2'>
                              <strong>Fat</strong>
                           </Typography>
                           <Typography variant='body1'>{fat}</Typography>
                        </div>
                     </div>
                  </CardContent>
                  <CardActions>
                     {route === 'recipes' && 
                     <a href={url} target='_blank'>
                       <Button
                       fullWidth
                       variant='outlined'
                    >
                       <MenuBookIcon />
                       View Recipe
                    </Button>
                    </a>
                     }
                     <Button
                        onClick={handleOpeningDialog}
                        fullWidth
                        variant='outlined'
                     >
                        <AddShoppingCartIcon />
                        Add to Mealplan
                     </Button>
                  </CardActions>
               </Card>
            </Paper>
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
