//@ts-nocheck
/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { expect } from '../../../../jestGlobals';
import LandingPage from './LandingPage';

function App() {
   return (
      <MemoryRouter>
         <LandingPage />
      </MemoryRouter>
   );
}
describe('Landing Page', () => {
   test('Correctly renders the landing page', async () => {
      const user = userEvent.setup();
      render(<App />);
      expect(screen.getByText('The MacroTrainer')).toBeInTheDocument();
   });
});
