//@ts-nocheck
/**
 * @jest-environment jsdom
 */
import React, { useState } from 'react';
import { expect } from '../../../../jestGlobals';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CaloriesCircularProgress } from './CaloriesCircularProgress';

describe('CaloriesCircularProgress component', () => {
   test('Displays correct values in correct position', async () => {
      render(
         <CaloriesCircularProgress
            calories={2000}
            caloriesUsed={1500}
            caloriesTotal={2000}
         />
      );
      const caloriesValue = await screen.getByText('1500 / 2000', {
         exact: false,
      });
      expect(caloriesValue).toBeInTheDocument();
   });
});
