// make test to check if corect function is called
// either login or other one

import React, { useState } from 'react';
import { expect } from '../../../../../../jestGlobals';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EmailTextField } from './EmailTextField';
import userEvent from '@testing-library/user-event';

const mockedFn = jest.fn();

describe('EmailTextField Component ', () => {
   test('Calls handleCreateAccountChange when typed into', async () => {
      const user = userEvent.setup();
      render(<EmailTextField handleCreateAccountChange={mockedFn} />);
      await user.type(
         screen.getByPlaceholderText('Email'),
         'this is an email component'
      );
      expect(mockedFn).toHaveBeenCalledTimes(22);
   });
});
