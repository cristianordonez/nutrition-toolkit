//@ts-nocheck
/**
 * @jest-environment jsdom
 */
import React, { useState } from 'react';
import { expect } from '../../../../../jestGlobals';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { HeightInputField } from './HeightInputField';

function App() {
   const [height, setHeight] = useState('70');
   return <HeightInputField height={height} setHeight={setHeight} />;
}
describe('HeightInputField', () => {
   test('Allows user to change height', async () => {
      const user = userEvent.setup();
      render(<App />);
      user.pointer([
         {
            target: screen.getByTestId('height-slider'),
            offset: 2,
            keys: '[MouseLeft>]',
         },
         { offset: 5 },
      ]);
   });
});
