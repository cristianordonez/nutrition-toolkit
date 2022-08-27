import React, { Dispatch, SetStateAction } from 'react';

import { Typography, Grid, Input, Slider } from '@mui/material';

interface Props {
   height: string | number | (string | number)[];
   setHeight: Dispatch<SetStateAction<string | number | (string | number)[]>>;
}
export const HeightInputField = ({ height, setHeight }: Props) => {
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
      if (height < 54) {
         setHeight(54);
      } else if (height > 84) {
         setHeight(84);
      }
   };

   return (
      <>
         <Typography id='input-slider' gutterBottom>
            I am {height} inches tall
         </Typography>
         <Grid container spacing={2} alignItems='center'>
            <Grid item xs>
               <Slider
                  value={typeof height === 'number' ? height : 0}
                  onChange={handleHeightSliderChange}
                  aria-labelledby='height-input-slider'
                  min={54}
                  max={84}
               />
            </Grid>
            <Grid item>
               <Input
                  value={height}
                  size='small'
                  onChange={handleHeightInputChange}
                  onBlur={handleHeightBlur}
                  data-testid='height-input'
                  inputProps={{
                     step: 1,
                     min: 54,
                     max: 84,
                     type: 'number',
                     'aria-labelledby': 'input-slider',
                  }}
               />
            </Grid>
         </Grid>
      </>
   );
};
