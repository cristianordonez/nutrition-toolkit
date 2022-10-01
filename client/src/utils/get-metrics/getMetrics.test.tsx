import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from '../../../../jestGlobals';
import { MetricsType } from '../../../../types/types';
import { getMetrics } from './getMetrics';

interface Props {
   goals: MetricsType;
}

const goals = {
   weight: 150,
   gender: 'female',
   height: 67,
   age: 27,
   activityLevel: 1.2,
   goal: 'weight_loss' as 'weight_loss' | 'maintain' | 'gain_muscle',
};
describe('getMetrics hook ', () => {
   test('calculates correct values ', async () => {
      const user = userEvent.setup();
      const { result } = renderHook(() => getMetrics(goals));
      expect(result.current.total_calories).toEqual(1737);
      expect(result.current.total_carbohydrates).toEqual(162);
      expect(result.current.total_protein).toEqual(68);
      expect(result.current.total_fat).toEqual(90);
   });
});
