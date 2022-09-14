//@ts-nocheck
/**
 * @jest-environment jsdom
 */
import React, { useState } from 'react';
import { expect } from '../../../../jestGlobals';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import LandingPage from './LandingPage';
import { MemoryRouter } from 'react-router-dom';

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
      expect(screen.getByText('The Diabetes Calculator')).toBeInTheDocument();
   });
});
