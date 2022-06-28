import React, { useEffect } from 'react';
import {
   Paper,
   Typography,
   Grid,
   Slider,
   Input,
   FormControl,
   FormLabel,
   FormControlLabel,
   Radio,
   ToggleButtonGroup,
   ToggleButton,
   RadioGroup,
} from '@mui/material';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';

export const MacroCalculatorForm = () => {
   //GENDER HANDLERS
   const [gender, setGender] = React.useState('web');

   const handleGenderChange = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: string
   ) => {
      setGender(newAlignment);
   };

   //ACTIVITY LEVEL HANDLERS
   const [activityLevel, setActivityLevel] = React.useState(0);

   const handleActivityLevelChange = (
      event: React.MouseEvent<HTMLElement>,
      newActivityLevel: number
   ) => {
      setActivityLevel(newActivityLevel);
   };

   // AGE HANDLERS
   const [age, setAge] = React.useState<
      number | string | Array<number | string>
   >(18);

   const handleSliderChange = (event: Event, newValue: number | number[]) => {
      setAge(newValue);
   };

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAge(event.target.value === '' ? '' : Number(event.target.value));
   };

   const handleBlur = () => {
      if (age < 0) {
         setAge(0);
      } else if (age > 100) {
         setAge(100);
      }
   };

   //HEIGHT HANDLERS
   const [height, setHeight] = React.useState<
      number | string | Array<number | string>
   >(48);

   const handleHeightSliderChange = (
      event: Event,
      newValue: number | number[]
   ) => {
      setHeight(newValue);
   };

   const handleHeightInputChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setHeight(event.target.value === '' ? '' : Number(event.target.value));
   };
   const handleHeightBlur = () => {
      if (height < 0) {
         setHeight(0);
      } else if (height > 84) {
         setHeight(84);
      }
   };

   //WEIGHT HANDLERS
   const [weight, setWeight] = React.useState<
      number | string | Array<number | string>
   >(80);

   const handleWeightSliderChange = (
      event: Event,
      newValue: number | number[]
   ) => {
      setWeight(newValue);
   };

   const handleWeightInputChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setWeight(event.target.value === '' ? '' : Number(event.target.value));
   };

   const handleWeightBlur = () => {
      if (weight < 0) {
         setWeight(0);
      } else if (weight > 400) {
         setWeight(400);
      }
   };

   let marks = [
      { value: 0, label: '0' },
      { value: 400, label: '400' },
   ];
   return (
      <>
         <Paper component={'form'} className='signup-form'>
            <Typography variant='h6'>
               Complete setting up your account
            </Typography>
            <Typography variant='subtitle1'>
               Fill out the form below so we can calculate your recommended
               nutrient needs.
            </Typography>
            {/* GENDER */}
            <ToggleButtonGroup
               color='primary'
               value={gender}
               exclusive
               onChange={handleGenderChange}
            >
               <ToggleButton value='male'>Male</ToggleButton>
               <ToggleButton value='female'>Female</ToggleButton>
               <ToggleButton value='other'>Other</ToggleButton>
            </ToggleButtonGroup>
            {/* ACTIVITY LEVEL */}
            <ToggleButtonGroup
               color='primary'
               value={activityLevel}
               exclusive
               onChange={handleActivityLevelChange}
            >
               <ToggleButton value={1}>Sedentary(no exercise)</ToggleButton>
               <ToggleButton value={1.25}>
                  Moderate (2x - 4x per week)
               </ToggleButton>
               <ToggleButton value={1.5}>Active (5x+ per week)</ToggleButton>
            </ToggleButtonGroup>
            {/* AGE */}
            <Typography id='input-slider' gutterBottom>
               I am {age} years young
            </Typography>
            <Grid container spacing={2} alignItems='center'>
               <Grid item xs>
                  <Slider
                     value={typeof age === 'number' ? age : 0}
                     onChange={handleSliderChange}
                     aria-labelledby='input-slider'
                  />
               </Grid>
               <Grid item>
                  <Input
                     value={age}
                     size='small'
                     onChange={handleInputChange}
                     onBlur={handleBlur}
                     inputProps={{
                        step: 10,
                        min: 0,
                        max: 100,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                     }}
                  />
               </Grid>
            </Grid>
            {/* HEIGHT */}
            <Typography id='input-slider' gutterBottom>
               I am {height} inches tall
            </Typography>
            <Grid container spacing={2} alignItems='center'>
               <Grid item xs>
                  <Slider
                     value={typeof height === 'number' ? height : 0}
                     onChange={handleHeightSliderChange}
                     aria-labelledby='height-input-slider'
                  />
               </Grid>
               <Grid item>
                  <Input
                     value={height}
                     size='small'
                     onChange={handleHeightInputChange}
                     onBlur={handleHeightBlur}
                     inputProps={{
                        step: 10,
                        min: 0,
                        max: 84,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                     }}
                  />
               </Grid>
            </Grid>
            {/* WEIGHT */}
            <Typography id='input-slider' gutterBottom>
               I weigh {weight} pounds
            </Typography>
            <Grid container spacing={2} alignItems='center'>
               <Grid item xs>
                  <Slider
                     value={typeof weight === 'number' ? weight : 0}
                     onChange={handleWeightSliderChange}
                     min={0}
                     max={400}
                     aria-labelledby='weight-input-slider'
                  />
               </Grid>
               <Grid item>
                  <Input
                     value={weight}
                     size='small'
                     onChange={handleWeightInputChange}
                     onBlur={handleWeightBlur}
                     inputProps={{
                        // step: 20,
                        min: 0,
                        max: 400,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                     }}
                  />
               </Grid>
            </Grid>
         </Paper>
      </>
   );
};
