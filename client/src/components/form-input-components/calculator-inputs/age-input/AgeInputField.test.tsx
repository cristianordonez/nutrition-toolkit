//@ts-nocheck
/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { AgeInputField } from './AgeInputField';

function App() {
   const [age, setAge] = useState('45');
   return <AgeInputField age={age} setAge={setAge} />;
}
describe('AgeInputField', () => {
   test('Allows user to change age', async () => {
      const user = userEvent.setup();
      render(<App />);
      user.pointer([
         {
            target: screen.getByTestId('age-slider'),
            offset: 2,
            keys: '[MouseLeftt>]',
         },
         { offset: 5 },
      ]);
   });
});
