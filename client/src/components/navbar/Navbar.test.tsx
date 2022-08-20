/**
 * @jest-environment jsdom
 */
import React, { useState } from 'react';
import { expect } from '../../../../jestGlobals';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from './NavBar';
import userEvent from '@testing-library/user-event';
import 'regenerator-runtime/runtime';
import { Route, MemoryRouter } from 'react-router-dom';
const mockedUsedNavigate = jest.fn();

describe('NavBar Component ', () => {
   test('When user is not logged in, should show the log out route', async () => {
      render(
         <MemoryRouter>
            <NavBar />
         </MemoryRouter>
      );
      waitFor(() => {
         expect(screen.findByText('Logout')).toBeInTheDocument();
      });
   });
});
