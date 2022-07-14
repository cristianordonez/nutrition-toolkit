// make test to check if corect function is called
// either login or other one

import React, { useState } from 'react';
import { expect } from '../../../../jestGlobals';

import { renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useMetrics } from './useMetrics';
import userEvent from '@testing-library/user-event';
import { MetricsType } from './useMetrics.types';

interface Props {
   goals: MetricsType;
}

const goals = {
   weight: 150,
   gender: 'female',
   height: 67,
   age: 27,
   activityLevel: 1.2,
};
describe('useMetrics hook ', () => {
   test('calculates correct values ', async () => {
      const user = userEvent.setup();
      const { result } = renderHook(() => useMetrics(goals));
      expect(result.current.total_calories).toEqual(1737);
      expect(result.current.total_carbohydrates).toEqual(162);
      expect(result.current.total_protein).toEqual(68);
      expect(result.current.total_fat).toEqual(90);
   });
});
