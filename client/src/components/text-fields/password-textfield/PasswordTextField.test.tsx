// make test to check if corect function is called
// either login or other one

import React, { useState } from 'react';
import { expect } from '../../../../../jestGlobals';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PasswordTextField } from './PasswordTextField';
import userEvent from '@testing-library/user-event';

const mockedFn = jest.fn();

describe('PasswordTextField Component ', () => {
   test('When showsignup is set to false, the handleCreateAccount function does not get called', async () => {
      const user = userEvent.setup();
      render(
         <PasswordTextField
            error={false}
            errorMessage='this is an error message'
            showSignup={false}
            handleCreateAccountChange={mockedFn}
         />
      );
      await user.type(
         screen.getByPlaceholderText('Password'),
         'this is a password component'
      );
      expect(mockedFn).toHaveBeenCalledTimes(0);
   });
   test('When showsignup is set to true, the handleLoginChange function does not get called', async () => {
      const user = userEvent.setup();
      render(
         <PasswordTextField
            error={false}
            errorMessage='this is an error message'
            showSignup={true}
            handleLoginChange={mockedFn}
         />
      );
      await user.type(
         screen.getByPlaceholderText('Password'),
         'this is a password component'
      );
      expect(mockedFn).toHaveBeenCalledTimes(0);
   });
});
