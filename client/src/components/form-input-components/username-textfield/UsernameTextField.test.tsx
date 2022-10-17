// make test to check if corect function is called
// either login or other one

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { expect } from '../../../../../jestGlobals';
import { UsernameTextField } from './UsernameTextField';

const mockedFn = jest.fn();

describe('UsernameTextField Component ', () => {
   test('When showsignup is set to false, the handleCreateAccountChange function does not get called', async () => {
      const user = userEvent.setup();
      render(
         <UsernameTextField
            handleCreateAccountChange={mockedFn}
            showSignup={false}
         />
      );
      await user.type(
         screen.getByPlaceholderText('Email'),
         'this is a email/username component'
      );
      expect(mockedFn).toHaveBeenCalledTimes(0);
   });
   test('When showsignup is set to true, the handleLoginChange function does not get called', async () => {
      const user = userEvent.setup();
      render(
         <UsernameTextField showSignup={true} handleLoginChange={mockedFn} />
      );
      await user.type(
         screen.getByPlaceholderText('Username'),
         'this is a username component'
      );

      expect(mockedFn).toHaveBeenCalledTimes(0);
   });
});
