import React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
   route: any;
   values: any;
   setRoute: any;
   setValues: any;
   handleSubmit: any;
}

const SearchFormCustom = ({
   route,
   values,
   setRoute,
   setValues,
   handleSubmit,
}: Props): JSX.Element => {
   const handleRouteChange = (event: SelectChangeEvent) => {
      setRoute(event.target.value);
   };

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [event.target.id]: event.target.value });
   };

   const handleTypeSelect = (event: SelectChangeEvent) => {
      setValues({ ...values, type: event.target.value });
   };

   return (
      <>
         <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
               <Typography variant='body1'>
                  Search for either recipe, a grocery product, or a menu item
                  from large list of restaurants
               </Typography>
               {/* ROUTES */}
               <FormControl>
                  <InputLabel>Search</InputLabel>
                  <Select
                     value={route}
                     onChange={handleRouteChange}
                     label='Search'
                     required
                  >
                     <MenuItem value={'recipes'}>Recipes</MenuItem>
                     <MenuItem value={'groceryProducts'}>
                        Grocery Products
                     </MenuItem>
                     <MenuItem value={'menuItems'}>Menu items</MenuItem>
                  </Select>
                  <FormHelperText>
                     Choose the type of item you are searching for.
                  </FormHelperText>
               </FormControl>
               {/* QUERY */}
               <TextField
                  id='query'
                  required
                  InputProps={{
                     startAdornment: (
                        <InputAdornment position='start'>
                           <SearchIcon />
                        </InputAdornment>
                     ),
                  }}
                  label='Item'
                  helperText='Enter an ingredient or item you want your search to contain (i.e. chicken, greek yogurt, etc.)'
                  value={values.query}
                  onChange={handleInputChange}
               />
               {/* TYPE */}
               <FormControl>
                  <InputLabel>Type</InputLabel>
                  <Select
                     value={values.type}
                     onChange={handleTypeSelect}
                     label='Type'
                     required
                     id='type'
                  >
                     <MenuItem value={'maincourse'}>Main Course</MenuItem>
                     <MenuItem value={'sidedish'}>Side Dish</MenuItem>
                     <MenuItem value={'dessert'}>Dessert</MenuItem>
                     <MenuItem value={'appetizer'}>Appetizer</MenuItem>
                     <MenuItem value={'salad'}>Salad</MenuItem>
                     <MenuItem value={'bread'}>Bread</MenuItem>
                     <MenuItem value={'breakfast'}>Breakfast</MenuItem>
                     <MenuItem value={'soup'}>Soup</MenuItem>
                     <MenuItem value={'beverage'}>Beverage</MenuItem>
                     <MenuItem value={'sauce'}>Sauce</MenuItem>
                     <MenuItem value={'marinade'}>Marinade</MenuItem>
                     <MenuItem value={'fingerfood'}>Fingerfood</MenuItem>
                     <MenuItem value={'snack'}>Snack</MenuItem>
                     <MenuItem value={'drink'}>Drink</MenuItem>
                  </Select>
                  <FormHelperText>
                     Choose the type of item you are searching for.
                  </FormHelperText>
               </FormControl>
               <Typography variant='h6'>Choose Calorie Range</Typography>
               {/* CALORIES */}
               <Stack direction='row'>
                  {/* MIN KCAL */}
                  <FormControl
                     fullWidth
                     variant='standard'
                     sx={{ m: 1, mt: 3 }}
                  >
                     <Input
                        id='minCalories'
                        type='number'
                        required
                        value={values.minCalories}
                        onChange={handleInputChange}
                        endAdornment={
                           <InputAdornment position='end'>kcal</InputAdornment>
                        }
                        inputProps={{
                           'aria-label': 'minimum calories',
                        }}
                     />
                     <FormHelperText>Minimum Calories</FormHelperText>
                  </FormControl>
                  {/* MAX KCAL */}
                  <FormControl
                     fullWidth
                     variant='standard'
                     sx={{ m: 1, mt: 3 }}
                  >
                     <Input
                        id='maxCalories'
                        type='number'
                        required
                        value={values.maxCalories}
                        onChange={handleInputChange}
                        endAdornment={
                           <InputAdornment position='end'>kcal</InputAdornment>
                        }
                        inputProps={{
                           'aria-label': 'maximum calories',
                        }}
                     />
                     <FormHelperText>Maximum Calories</FormHelperText>
                  </FormControl>
               </Stack>

               <Typography variant='h6'>Choose Carb Range</Typography>
               {/* CARBS */}
               <Stack direction='row'>
                  {/* MIN CARBS */}
                  <FormControl
                     variant='standard'
                     fullWidth
                     sx={{ m: 1, mt: 3 }}
                  >
                     <Input
                        id='minCarbs'
                        type='number'
                        required
                        value={values.minCarbs}
                        onChange={handleInputChange}
                        endAdornment={
                           <InputAdornment position='end'>g</InputAdornment>
                        }
                        inputProps={{
                           'aria-label': 'minimum carbs',
                        }}
                     />
                     <FormHelperText>Minimum Carbs</FormHelperText>
                  </FormControl>
                  {/* MAX CARBS */}
                  <FormControl
                     variant='standard'
                     fullWidth
                     sx={{ m: 1, mt: 3 }}
                  >
                     <Input
                        id='maxCarbs'
                        type='number'
                        required
                        value={values.maxCarbs}
                        onChange={handleInputChange}
                        endAdornment={
                           <InputAdornment position='end'>g</InputAdornment>
                        }
                        inputProps={{
                           'aria-label': 'maximum carbs',
                        }}
                     />
                     <FormHelperText>Maximum Carbs</FormHelperText>
                  </FormControl>
               </Stack>
               <Typography variant='h6'>Choose Protein Range</Typography>
               {/* PROTEIN */}
               <Stack direction='row'>
                  {/* MIN PROTEIN */}
                  <FormControl
                     variant='standard'
                     fullWidth
                     sx={{ m: 1, mt: 3 }}
                  >
                     <Input
                        id='minProtein'
                        required
                        type='number'
                        value={values.minProtein}
                        onChange={handleInputChange}
                        endAdornment={
                           <InputAdornment position='end'>g</InputAdornment>
                        }
                        inputProps={{
                           'aria-label': 'minimum protein',
                        }}
                     />
                     <FormHelperText>Minimum Protein</FormHelperText>
                  </FormControl>
                  {/* MAX PROTEIN */}
                  <FormControl
                     variant='standard'
                     fullWidth
                     sx={{ m: 1, mt: 3 }}
                  >
                     <Input
                        id='maxProtein'
                        required
                        type='number'
                        value={values.maxProtein}
                        onChange={handleInputChange}
                        endAdornment={
                           <InputAdornment position='end'>g</InputAdornment>
                        }
                        inputProps={{
                           'aria-label': 'maximum protein',
                        }}
                     />
                     <FormHelperText>Maximum Protein</FormHelperText>
                  </FormControl>
               </Stack>
               <Typography variant='h6'>Choose Fat Range</Typography>
               {/* FAT */}
               <Stack direction='row'>
                  {/* MIN FAT*/}
                  <FormControl
                     variant='standard'
                     fullWidth
                     sx={{ m: 1, mt: 3 }}
                  >
                     <Input
                        id='minFat'
                        type='number'
                        required
                        value={values.minFat}
                        onChange={handleInputChange}
                        endAdornment={
                           <InputAdornment position='end'>g</InputAdornment>
                        }
                        inputProps={{
                           'aria-label': 'minimum fat',
                        }}
                     />
                     <FormHelperText>Minimum Fat</FormHelperText>
                  </FormControl>
                  {/* FAT */}
                  <FormControl
                     variant='standard'
                     fullWidth
                     sx={{ m: 1, mt: 3 }}
                  >
                     <Input
                        id='maxFat'
                        required
                        type='number'
                        value={values.maxFat}
                        onChange={handleInputChange}
                        endAdornment={
                           <InputAdornment position='end'>g</InputAdornment>
                        }
                        inputProps={{
                           'aria-label': 'maximum fat',
                        }}
                     />
                     <FormHelperText>Maximum Fat</FormHelperText>
                  </FormControl>
               </Stack>
               <Button type='submit'>Submit</Button>
            </Stack>
         </form>
      </>
   );
};

export default SearchFormCustom;
