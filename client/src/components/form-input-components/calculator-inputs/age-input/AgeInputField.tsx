import { Grid, Input, Slider, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
   age: number | string;
   setAge: Dispatch<SetStateAction<number | string>>;
}

export const AgeInputField = ({ age, setAge }: Props) => {
   const handleAgeSliderChange = (
      event: Event,
      newValue: number | number[]
   ) => {
      const currentAge = Array.isArray(newValue) ? newValue[0] : newValue;
      setAge(currentAge);
   };
   const handleAgeInputChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setAge(event.target.value === '' ? '' : Number(event.target.value));
   };
   const handleAgeBlur = () => {
      if (age < 18) {
         setAge(18);
      } else if (age > 100) {
         setAge(100);
      }
   };
   return (
      <>
         <Typography id='input-slider' gutterBottom>
            I am {age} years young
         </Typography>
         <Grid container spacing={2} alignItems='center'>
            <Grid item xs>
               <Slider
                  value={typeof age === 'number' ? age : 0}
                  onChange={handleAgeSliderChange}
                  data-testid='age-slider'
                  aria-labelledby='input-slider'
                  min={18}
                  max={100}
                  color='secondary'
               />
            </Grid>
            <Grid item>
               <Input
                  value={age}
                  size='small'
                  required
                  onChange={handleAgeInputChange}
                  onBlur={handleAgeBlur}
                  data-testid='age-input'
                  inputProps={{
                     step: 1,
                     min: 18,
                     max: 100,
                     type: 'number',
                     'aria-labelledby': 'input-slider',
                  }}
               />
            </Grid>
         </Grid>
      </>
   );
};
