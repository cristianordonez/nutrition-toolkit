// make test to check if corect function is called
// either login or other one

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { expect } from '../../../../shared/jestGlobals';
import { CustomTextField } from './CustomTextField';

const mockedFn = jest.fn();

describe('CustomTextField Component ', () => {
   test('When showsignup is set to false, the handleCreateAccountChange function does not get called', async () => {
      const user = userEvent.setup();
      render(
         <CustomTextField
            handleCreateAccountChange={mockedFn}
            showSignup={false}
            name='email'
            value={'email'}
            showTextFieldError={undefined}
            label={'Email'}
            type='email'
            placeholder='Email'
            errorMessage=''
            helperText='Enter your email.'
         />
      );
      await user.type(
         screen.getByPlaceholderText('Email'),
         'this is a email/username component'
      );
      expect(mockedFn).toHaveBeenCalledTimes(0);
   });
});
