import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from '../../../../jestGlobals';
import { MetricsType } from '../../../../types/types';
import { getGoalsFromMetrics } from './getGoalsFromMetrics';

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
describe('getGoalsFromMetrics util ', () => {
   test('calculates correct values', async () => {
      const user = userEvent.setup();
      const { result } = renderHook(() => getGoalsFromMetrics(goals));
      expect(result.current.total_calories).toEqual(1499);
      expect(result.current.total_carbohydrates).toEqual(187);
      expect(result.current.total_protein).toEqual(122);
      expect(result.current.total_fat).toEqual(29);
   });
});
