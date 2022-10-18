//@ts-nocheck
/**
 * @jest-environment jsdom
 */
import React, { useState } from 'react';
import { expect } from '../../../../jestGlobals';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { MacroCalculatorForm } from '.';
import { MemoryRouter } from 'react-router-dom';

function App() {
   return (
      <MemoryRouter>
         <MacroCalculatorForm />
      </MemoryRouter>
   );
}
describe('MacroCalculator Form', () => {
   test('Correctly renders the correct text when no page prop is passed in', async () => {
      render(<App />);
      expect(
         screen.getByText('Complete setting up your account')
      ).toBeInTheDocument();
      screen.debug();
   });
});
