import React, { Dispatch, SetStateAction } from 'react';

import { Grid, Input, Slider, Typography } from '@mui/material';

interface Props {
   weight: string | number;
   setWeight: Dispatch<SetStateAction<string | number>>;
}

export const WeightInputField = ({ weight, setWeight }: Props) => {
   const handleWeightSliderChange = (
      event: Event,
      newValue: number | number[]
   ) => {
      const currentWeight = Array.isArray(newValue) ? newValue[0] : newValue;
      setWeight(currentWeight);
   };
   const handleWeightInputChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setWeight(event.target.value === '' ? '' : Number(event.target.value));
   };
   const handleWeightBlur = () => {
      if (weight < 70) {
         setWeight(70);
      } else if (weight > 400) {
         setWeight(400);
      }
   };

   return (
      <>
         <Typography id='input-slider' gutterBottom>
            I weigh {weight} pounds
         </Typography>
         <Grid container spacing={2} alignItems='center'>
            <Grid item xs>
               <Slider
                  value={typeof weight === 'number' ? weight : 0}
                  onChange={handleWeightSliderChange}
                  data-testid='weight-slider'
                  min={70}
                  max={400}
                  aria-labelledby='weight-input-slider'
                  color='secondary'
               />
            </Grid>
            <Grid item>
               <Input
                  value={weight}
                  size='small'
                  onChange={handleWeightInputChange}
                  onBlur={handleWeightBlur}
                  data-testid='weight-input'
                  inputProps={{
                     step: 1,
                     min: 70,
                     max: 400,
                     type: 'number',
                     'aria-labelledby': 'input-slider',
                  }}
               />
            </Grid>
         </Grid>
      </>
   );
};
