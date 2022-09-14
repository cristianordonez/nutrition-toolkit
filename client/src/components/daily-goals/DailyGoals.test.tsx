//@ts-nocheck
/**
 * @jest-environment jsdom
 */
import React, { useState } from 'react';
import { expect } from '../../../../jestGlobals';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DailyGoals } from './index';

describe('DailyGoals Component', () => {
   test('Shows correct title when page prop is set to mealplan', async () => {
      render(<DailyGoals page='mealplan' />);
      const dailyGoals = await screen.findByText(
         "Today's Macronutrient Totals"
      );
      expect(dailyGoals).toBeInTheDocument();
   });
});
