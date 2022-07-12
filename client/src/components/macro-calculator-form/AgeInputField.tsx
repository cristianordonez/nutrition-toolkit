import React, { Dispatch, SetStateAction } from 'react';
import { Typography, Grid, Input, Slider } from '@mui/material';

interface Props {
   age: string | number | (string | number)[];
   setAge: Dispatch<SetStateAction<string | number | (string | number)[]>>;
}

export const AgeInputField = ({ age, setAge }: Props) => {
   const handleAgeSliderChange = (
      event: Event,
      newValue: number | number[]
   ) => {
      setAge(newValue);
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
                  aria-labelledby='input-slider'
                  min={18}
                  max={100}
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
