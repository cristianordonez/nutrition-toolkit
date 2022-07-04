/**
 * @jest-environment jsdom
 */
import React, { useState } from 'react';
import { expect } from '../../../../jestGlobals';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginForm } from './LoginForm';
import userEvent from '@testing-library/user-event';
import 'regenerator-runtime/runtime';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...(jest.requireActual('react-router-dom') as any),
   useNavigate: () => mockedUsedNavigate,
}));

describe('LoginForm Component ', () => {
   test('Error message is shown when error is true', async () => {
      render(
         <LoginForm
            showTextFieldError={true}
            errorMessage='this should display'
         />
      );
      expect(screen.getByText('this should display')).toBeDefined();
   });

   test('Clicking on create account button calls the handleRedirect function', async () => {
      const user = userEvent.setup();
      const handleRedirectToSignup = jest.fn();
      render(<LoginForm handleRedirectToSignup={handleRedirectToSignup} />);
      await user.click(screen.getByTestId('create-account-btn'));
      expect(handleRedirectToSignup).toHaveBeenCalledTimes(1);
   });
});
