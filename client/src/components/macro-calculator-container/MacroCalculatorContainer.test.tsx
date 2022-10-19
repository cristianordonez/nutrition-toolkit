//@ts-nocheck
/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MacroCalculatorContainer } from '.';
import { expect } from '../../../../jestGlobals';

function App() {
   return (
      <MemoryRouter>
         <MacroCalculatorContainer />
      </MemoryRouter>
   );
}
describe('MacroCalculator Container', () => {
   test('Correctly renders the correct text when no page prop is passed in', async () => {
      render(<App />);
      expect(
         screen.getByText('Complete setting up your account')
      ).toBeInTheDocument();
      screen.debug();
   });
});
