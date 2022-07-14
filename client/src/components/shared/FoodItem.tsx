import React, {MouseEventHandler} from 'react';
import { Paper, Card, CardMedia, CardContent, Typography, CardActions, Button  } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MenuBookIcon from '@mui/icons-material/MenuBook';

interface Props {
    route: string;
    image: string;
    title: string;
    restaurantChain: string | undefined;
    calories: string;
    carbs: string;
    protein: string;
    fat: string; 
    url: string | undefined;
    handleOpeningDialog: MouseEventHandler<HTMLButtonElement>;
}

export const FoodItem = ({route, image, title, restaurantChain, calories, carbs, protein, fat, url, handleOpeningDialog}: Props) => {
    return (
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
    )
}