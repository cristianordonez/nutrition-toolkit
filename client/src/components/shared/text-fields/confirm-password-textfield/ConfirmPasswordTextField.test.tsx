// make test to check if corect function is called
// either login or other one

import React, { useState } from 'react';
import { expect } from '../../../../../../jestGlobals';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ConfirmPasswordTextField } from './ConfirmPasswordTextField';
import userEvent from '@testing-library/user-event';

const mockedFn = jest.fn();

describe('ConfirmPasswordTextField Component ', () => {
   test('Calls handleCreateAccountChange when typed into', async () => {
      const user = userEvent.setup();
      render(
         <ConfirmPasswordTextField
            showTextFieldError={false}
            errorMessage='this is a message'
            handleCreateAccountChange={mockedFn}
         />
      );
      await user.type(
         screen.getByPlaceholderText('Confirm Password'),
         'this is a password'
      );
      expect(mockedFn).toHaveBeenCalledTimes(18);
   });
});
