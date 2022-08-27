import React, { MouseEvent, Dispatch, SetStateAction } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { AgeInputField } from '../calculator-inputs/AgeInputField';
import { HeightInputField } from '../calculator-inputs/HeightInputField';
import { WeightInputField } from '../calculator-inputs/WeightInputField';

interface Props {
   handleGenderChange: (event: MouseEvent<HTMLElement>, value: any) => void;
   activityLevel: number;
   gender: string;
   handleActivityLevelChange: (
      event: MouseEvent<HTMLElement>,
      value: any
   ) => void;
   height: string | number | (string | number)[];
   setHeight: Dispatch<SetStateAction<string | number | (string | number)[]>>;
   age: string | number | (string | number)[];
   setAge: Dispatch<SetStateAction<string | number | (string | number)[]>>;

   weight: string | number | (string | number)[];
   setWeight: Dispatch<SetStateAction<string | number | (string | number)[]>>;
}

export const Calculator = ({
   handleGenderChange,
   gender,
   activityLevel,
   handleActivityLevelChange,
   age,
   setAge,
   height,
   setHeight,
   weight,
   setWeight,
}: Props) => {
   return (
      <>
         <ToggleButtonGroup
            color='primary'
            fullWidth={true}
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
            fullWidth={true}
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
         {/* AGE HEIGHT AND WEIGHT*/}
         <AgeInputField age={age} setAge={setAge} />
         <HeightInputField height={height} setHeight={setHeight} />
         <WeightInputField weight={weight} setWeight={setWeight} />
      </>
   );
};
