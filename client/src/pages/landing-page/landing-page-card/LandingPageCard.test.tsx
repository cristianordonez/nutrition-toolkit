//@ts-nocheck
/**
 * @jest-environment jsdom
 */
import React, { useState } from 'react';
import { expect } from '../../../../../jestGlobals';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { LandingPageCard } from './LandingPageCard';

function App() {
   const body = 'this is the body';
   const title = 'Recipe title';
   const image = 'imagestring';
   const feature = 'this is the feature';
   return (
      <LandingPageCard
         body={body}
         title={title}
         image={image}
         feature={feature}
      />
   );
}

describe('Landing Page Card', () => {
   test('Correctly renders the landing page card with correct information', async () => {
      const user = userEvent.setup();
      render(<App />);
      expect(screen.getByText('Recipe title')).toBeInTheDocument();
   });
});
