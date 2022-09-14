//@ts-nocheck
/**
 * @jest-environment jsdom
 */
import React from 'react';
import { expect } from '../../../../jestGlobals';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import ForgotPasswordPage from './ForgotPasswordPage';

function Main() {
   return (
      <div>
         <ForgotPasswordPage />
      </div>
   );
}

describe('ForgotPasswordPage', () => {
   test('Renders the forgotpassword page lazily', async () => {
      render(
         <MemoryRouter>
            <Main />
         </MemoryRouter>
      );

      await waitFor(() => {
         expect(screen.getByText('Send recovery email')).toBeInTheDocument();
      });
   });
});
