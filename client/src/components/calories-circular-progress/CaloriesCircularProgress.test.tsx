//@ts-nocheck
/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { expect } from '../../../../jestGlobals';
import { CaloriesCircularProgress } from './CaloriesCircularProgress';

describe('CaloriesCircularProgress component', () => {
   test('Displays correct values in correct position', async () => {
      render(<CaloriesCircularProgress calories={1500} goalCalories={2000} />);
      const caloriesValue = await screen.getByText('1500 / 2000', {
         exact: false,
      });
      expect(caloriesValue).toBeInTheDocument();
   });
});
