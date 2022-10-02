//@ts-nocheck
/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { expect } from '../../../../../jestGlobals';
import { DailyGoals } from './DailyGoalsMain';

describe('DailyGoals Component', () => {
   test('Shows correct title when page prop is set to mealplan', async () => {
      render(<DailyGoals page='mealplan' />);
      const dailyGoals = await screen.findByText(
         "Today's Macronutrient Totals"
      );
      expect(dailyGoals).toBeInTheDocument();
   });
});
