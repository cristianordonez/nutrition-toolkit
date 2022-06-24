import React from 'react';
import './FoodSearchItem.scss';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

type NutrientType = {
   name: string;
   amount: number;
   percentOfDailyNeeds: number;
   unit: string;
};

const FoodSearchItem = ({
   route,
   image,
   title,
   nutrition,
   description,
   price,
   ingredientList,
   restaurantChain,
   url,
}: any) => {
   //item that appears in every item is image, title, nutrition,

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

   return (
      <>
         <Grid item xs={12} sm={6} md={4} xl={3}>
            <Paper elevation={1} className='food-search-paper'>
               <Card className='search-item'>
                  <CardMedia
                     component='img'
                     alt='food item image'
                     height='160'
                     image={image}
                  />
                  <CardContent>
                     {route === 'recipes' ? (
                        <CardActions>
                           <a href={url} target='_blank'>
                              <Typography variant='overline'>
                                 {title}
                              </Typography>
                           </a>
                        </CardActions>
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
                     <Button fullWidth variant='outlined'>
                        <AddShoppingCartIcon />
                        Add to Mealplan
                     </Button>
                  </CardActions>
               </Card>
            </Paper>
         </Grid>
      </>
   );
};

export default FoodSearchItem;
