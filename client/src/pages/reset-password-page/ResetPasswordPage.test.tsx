//@ts-nocheck
/**
 * @jest-environment jsdom
 */
import React from 'react';
import { expect } from '../../../../jestGlobals';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ResetPasswordPage from './ResetPasswordPage';

describe('ResetPasswordPage', () => {
   test('Renders the resetpassword page lazily', async () => {
      const { getByText } = render(
         <MemoryRouter>
            <ResetPasswordPage />
         </MemoryRouter>
      );

      await waitFor(() => {
         expect(getByText('Change password')).toBeInTheDocument();
      });
   });
});
