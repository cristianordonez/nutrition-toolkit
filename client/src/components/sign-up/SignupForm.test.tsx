/**
 * @jest-environment jsdom
 */
import React, { useState } from 'react';
import { expect } from '../../../../jestGlobals';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SignupForm } from './SignupForm';
import userEvent from '@testing-library/user-event';

const mockedUsedNavigate = jest.fn();
const mockedFn = jest.fn();

jest.mock('react-router-dom', () => ({
   ...(jest.requireActual('react-router-dom') as any),
   useNavigate: () => mockedUsedNavigate,
}));

describe('SignupForm Component ', () => {
   test('Signup Form should be visible at initial render', async () => {
      render(
         <SignupForm
            showSignup={true}
            handleRedirectToSignup={mockedFn}
            setError={mockedFn}
            error={false}
            setErrorMessage={mockedFn}
            setOpenErrorAlert={mockedFn}
         />
      );
      expect(screen.getByTestId('signup-form')).toBeDefined();
   });
});
