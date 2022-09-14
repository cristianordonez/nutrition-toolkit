/**
 * @jest-environment jsdom
 */
import React from 'react';
import { expect } from '../../../../jestGlobals';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from './NavBar';
import 'regenerator-runtime/runtime';
import { MemoryRouter } from 'react-router-dom';
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
