/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import { expect } from '../../../../jestGlobals';
import NavBar from './NavBar';
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
