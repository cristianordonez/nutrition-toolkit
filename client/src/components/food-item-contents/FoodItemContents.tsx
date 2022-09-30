import ClearIcon from '@mui/icons-material/Clear';
import {
   Button,
   Card,
   CardActions,
   CardContent,
   CardMedia,
   IconButton,
   Paper,
   Stack,
   Tooltip,
   Typography,
} from '@mui/material';
import React, { MouseEventHandler } from 'react';
import './FoodSearchItemContents.scss';

interface Props {
   route: string;
   image: string | undefined;
   title: string | undefined;
   restaurantChain?: string | undefined;
   nutrition?: any;
   url?: string | undefined;
   handleOpeningDialog?: MouseEventHandler<HTMLButtonElement>;
   isMealPlanItem?: boolean;
   servings?: number;
   isSampleFoodItem?: boolean | undefined;
   imageType?: string;
   id: number;
   handleOpeningAddToMealplanDialog?: (
      imageType: string,
      title: string,
      id: number
   ) => void;
   handleOpeningAddIngredientModal?: (
      img: string,
      title: string,
      popularUnits: string[],
      id: number
   ) => void;
   amount?: number | undefined;
   unit?: string | undefined;
   possibleUnits?: string[] | undefined;
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
   id,
   handleOpeningAddToMealplanDialog,
   handleOpeningAddIngredientModal,
   imageType,
   amount,
   possibleUnits,
   unit,
}: Props) => {
   //configure the nutrients here as different items contain different object structure
   let calories, carbs, fat, protein;
   if (
      (nutrition !== undefined && route === 'recipes') ||
      route === 'RECIPE' ||
      route === 'ingredients'
   ) {
      nutrition.nutrients.forEach((nutrient: NutrientType) => {
         if (nutrient.name === 'Calories') {
            // calories = Math.floor(nutrition.nutrients[0].amount);
            calories = Math.floor(nutrient.amount);
         } else if (nutrient.name === 'Protein') {
            // protein = Math.floor(nutrition.nutrients[1].amount) + 'g';
            protein = Math.floor(nutrient.amount);
         } else if (nutrient.name === 'Fat') {
            // fat = Math.floor(nutrition.nutrients[1].amount);
            fat = Math.floor(nutrient.amount);
         } else if (nutrient.name === 'Carbohydrates') {
            // carbs = Math.floor(nutrition.nutrients[3].amount) + 'g';
            carbs = Math.floor(nutrient.amount);
         }
      });
   } else if (nutrition !== undefined) {
      calories = nutrition.calories;
      protein = nutrition.protein;
      fat = nutrition.fat;
      carbs = nutrition.carbs;
   }

   return (
      <Paper elevation={1} className='food-search-paper'>
         <Card className='search-item' data-testid='food-search-item'>
            {isMealPlanItem && handleOpeningDialog !== undefined ? (
               <Tooltip title='Delete from Mealplan'>
                  <IconButton
                     sx={{
                        position: 'absolute',
                        alignSelf: 'flex-end',
                     }}
                     size='small'
                     color='error'
                     aria-label='delete from mealplan'
                     onClick={handleOpeningDialog}
                  >
                     <ClearIcon />
                  </IconButton>
               </Tooltip>
            ) : null}
            <CardMedia
               component='img'
               alt='food item image'
               height='160'
               image={image}
            />
            <CardContent>
               <Typography align='center' noWrap variant='subtitle1'>
                  {title}
               </Typography>
               {route === 'ingredients' ? (
                  <Typography align='center' variant='subtitle2'>
                     per {amount} {unit}
                  </Typography>
               ) : null}
               {isMealPlanItem && servings !== undefined ? (
                  <Stack direction='row'>
                     <Typography variant='subtitle2'>
                        Servings: {servings}
                     </Typography>
                  </Stack>
               ) : null}

               {route === 'menuItems' || route === 'MENU_ITEM' ? (
                  <Typography variant='subtitle2'>{restaurantChain}</Typography>
               ) : null}

               {nutrition !== undefined ? (
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
               ) : null}
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
               {!isMealPlanItem &&
               handleOpeningAddToMealplanDialog &&
               imageType &&
               route !== 'ingredients' &&
               title ? (
                  <Button
                     fullWidth
                     className='card-button'
                     onClick={() =>
                        handleOpeningAddToMealplanDialog(imageType, title, id)
                     }
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
