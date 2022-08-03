import React, { MouseEventHandler } from 'react';
import './FoodSearchItemContents.scss';
import {
   Paper,
   Card,
   CardMedia,
   Tooltip,
   CardContent,
   Typography,
   CardActions,
   Button,
   IconButton,
   Stack,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import {
   GroceryItemNutrition,
   RecipeItemNutrition,
   MenuItemNutrition,
} from '../food-search-list/food-search-list.types';

interface Props {
   route: string;
   image: string | undefined;
   title: string | undefined;
   restaurantChain: string | undefined;
   nutrition:
      | GroceryItemNutrition
      | RecipeItemNutrition
      | MenuItemNutrition
      | any;
   url?: string | undefined;
   handleOpeningDialog: MouseEventHandler<HTMLButtonElement>;
   isMealPlanItem?: boolean;
   servings?: number;
}

type NutrientType = {
   name: string;
   amount: number;
   percentOfDailyNeeds: number;
   unit: string;
   id: number;
};

export const FoodItemContents = ({
   route,
   image,
   title,
   restaurantChain,
   nutrition,
   url,
   handleOpeningDialog,
   isMealPlanItem,
   servings,
}: Props) => {
   let calories, carbs, fat, protein;
   if (route === 'recipes' || route === 'RECIPE') {
      nutrition.nutrients.forEach((nutrient: NutrientType) => {
         if (nutrient.name === 'Calories') {
            calories = Math.floor(nutrition.nutrients[0].amount);
         } else if (nutrient.name === 'Protein') {
            protein = Math.floor(nutrition.nutrients[1].amount) + 'g';
         } else if (nutrient.name === 'Fat') {
            fat = Math.floor(nutrition.nutrients[1].amount);
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
   console.log('route in food item contents: ', route);
   console.log('url: ', url);

   return (
      <Paper elevation={1} className='food-search-paper'>
         {/* opens the dialog to confirm delete */}

         <Card className='search-item' data-testid='food-search-item'>
            <Tooltip title='Delete from Mealplan'>
               <IconButton
                  sx={{
                     position: 'absolute',
                     // backgroundColor: '#1E1E1E',
                     alignSelf: 'flex-end',
                  }}
                  // color='primary'
                  size='small'
                  color='error'
                  aria-label='delete from mealplan'
                  onClick={handleOpeningDialog}
               >
                  <ClearIcon />
               </IconButton>
            </Tooltip>
            <CardMedia
               component='img'
               alt='food item image'
               height='160'
               image={image}
            />
            <CardContent>
               <Typography align='center' variant='subtitle1'>
                  {title}
               </Typography>
               {isMealPlanItem ? (
                  <Stack direction='row'>
                     {/* <IconButton
                        sx={{ flexGrow: 1 }}
                        aria-label='delete from mealplan'
                        onClick={handleOpeningDialog}
                     >
                        <ClearIcon />
                     </IconButton> */}
                     <Typography variant='subtitle2'>
                        Servings: {servings}
                     </Typography>
                  </Stack>
               ) : null}

               {route === 'menuItems' ||
                  (route === 'MENU_ITEM' && (
                     <Typography variant='h6'>{restaurantChain}</Typography>
                  ))}
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
            <CardActions sx={{ display: 'flex' }}>
               {url !== undefined ? (
                  <Button
                     fullWidth
                     component='a'
                     href={url}
                     target='_blank'
                     className='card-button'
                     variant='outlined'
                     color='secondary'
                     size='small'
                  >
                     View Recipe
                  </Button>
               ) : // </a>
               null}
               {/* Configure the bottom button depending on if it is mealplan item or search item */}
               {!isMealPlanItem ? (
                  <Button
                     fullWidth
                     className='card-button'
                     onClick={handleOpeningDialog}
                     variant='outlined'
                     size='small'
                     data-testid='open-addtomealplan-dialog'
                  >
                     Add to Mealplan
                  </Button>
               ) : null}
            </CardActions>
         </Card>
      </Paper>
   );
};
