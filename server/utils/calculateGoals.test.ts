import '@testing-library/jest-dom';
import { CalculateGoalsArgs } from '../../types/types';
import { calculate } from './calculateGoals';

describe('calculate goals util ', () => {
   //test when ft is used for height and lb for weight
   //1. goal is weight loss
   test('Calculates correct values when goal is weight loss, height and metrics are standard', async () => {
      const goalsWeightLoss: CalculateGoalsArgs = {
         goal: 'weight_loss',
         activityLevel: 1,
         gender: 'non_binary',
         age: 27,
         height: 67,
         heightMetric: 'ft',
         weight: 150,
         weightMetric: 'lb',
      };
      const values = calculate(goalsWeightLoss);
      expect(values.total_calories).toBe(1636);
      expect(values.total_carbohydrates).toBe(184);
      expect(values.total_protein).toBe(123);
      expect(values.total_fat).toBe(45);
   });
   //2. goal is weight maitenance
   test('Calculates correct values when goal is weight maintenance, height and metrics are standard', async () => {
      const goalsWeightMaintain: CalculateGoalsArgs = {
         goal: 'maintain',
         activityLevel: 1.5,
         gender: 'female',
         age: 32,
         height: 68,
         heightMetric: 'ft',
         weight: 205,
         weightMetric: 'lb',
      };
      const values = calculate(goalsWeightMaintain);
      expect(values.total_calories).toBe(2535);
      expect(values.total_carbohydrates).toBe(285);
      expect(values.total_protein).toBe(88);
      expect(values.total_fat).toBe(116);
   });
   //3. goal is weight gain
   test('Calculates correct values when goal is weight gain, height and metrics are standard', async () => {
      const goalsWeightGain: CalculateGoalsArgs = {
         goal: 'gain_muscle',
         activityLevel: 1,
         gender: 'male',
         age: 48,
         height: 74,
         heightMetric: 'ft',
         weight: 205,
         weightMetric: 'lb',
      };
      const values = calculate(goalsWeightGain);
      expect(values.total_calories).toBe(2752);
      expect(values.total_carbohydrates).toBe(310);
      expect(values.total_protein).toBe(155);
      expect(values.total_fat).toBe(99);
   });
   //test when cm is used for height and lbs for weight
   //1. goal is weight loss
   test('Calculates correct values when goal is weight loss, height is metric and weight is standard', async () => {
      const goalsWeightLoss: CalculateGoalsArgs = {
         goal: 'weight_loss',
         activityLevel: 1.2,
         gender: 'male',
         age: 38,
         height: 190,
         heightMetric: 'cm',
         weight: 170,
         weightMetric: 'lb',
      };
      const values = calculate(goalsWeightLoss);
      expect(values.total_calories).toBe(2005);
      expect(values.total_carbohydrates).toBe(226);
      expect(values.total_protein).toBe(139);
      expect(values.total_fat).toBe(61);
   });
   //2. goal is weight maitenance
   test('Calculates correct values when goal is weight maintenance, height is metric and weight is standard', async () => {
      const goalsWeightMaintain: CalculateGoalsArgs = {
         goal: 'maintain',
         activityLevel: 1.5,
         gender: 'female',
         age: 52,
         height: 145,
         heightMetric: 'cm',
         weight: 180,
         weightMetric: 'lb',
      };
      const values = calculate(goalsWeightMaintain);
      expect(values.total_calories).toBe(1955);
      expect(values.total_carbohydrates).toBe(220);
      expect(values.total_protein).toBe(61);
      expect(values.total_fat).toBe(92);
   });
   //3. goal is weight gain
   test('Calculates correct values when goal is weight gain, height is metric and weight is standard', async () => {
      const goalsWeightGain: CalculateGoalsArgs = {
         goal: 'gain_muscle',
         activityLevel: 1.5,
         gender: 'male',
         age: 32,
         height: 200,
         heightMetric: 'cm',
         weight: 215,
         weightMetric: 'lb',
      };
      const values = calculate(goalsWeightGain);
      expect(values.total_calories).toBe(3427);
      expect(values.total_carbohydrates).toBe(386);
      expect(values.total_protein).toBe(176);
      expect(values.total_fat).toBe(131);
   });
   //test when cm is used for height and kg for weight
   test('Calculates correct values when goal is weight loss, height and weight are metric', async () => {
      const goalsWeightLoss: CalculateGoalsArgs = {
         goal: 'weight_loss',
         activityLevel: 1,
         gender: 'non_binary',
         age: 18,
         height: 178,
         heightMetric: 'cm',
         weight: 72,
         weightMetric: 'kg',
      };
      const values = calculate(goalsWeightLoss);
      expect(values.total_calories).toBe(1728);
      expect(values.total_carbohydrates).toBe(194);
      expect(values.total_protein).toBe(130);
      expect(values.total_fat).toBe(48);
   });
   //2. goal is weight maitenance
   test('Calculates correct values when goal is weight maintenance, height and weight are metric', async () => {
      const goalsWeightMaintain: CalculateGoalsArgs = {
         goal: 'maintain',
         activityLevel: 1.5,
         gender: 'female',
         age: 28,
         height: 180,
         heightMetric: 'cm',
         weight: 78,
         weightMetric: 'kg',
      };
      const values = calculate(goalsWeightMaintain);
      expect(values.total_calories).toBe(2484);
      expect(values.total_carbohydrates).toBe(279);
      expect(values.total_protein).toBe(94);
      expect(values.total_fat).toBe(110);
   });
   //3. goal is weight gain
   test('Calculates correct values when goal is weight gain, height and weight are metric', async () => {
      const goalsWeightGain: CalculateGoalsArgs = {
         goal: 'gain_muscle',
         activityLevel: 1,
         gender: 'male',
         age: 58,
         height: 170,
         heightMetric: 'cm',
         weight: 64,
         weightMetric: 'kg',
      };
      const values = calculate(goalsWeightGain);
      expect(values.total_calories).toBe(2048);
      expect(values.total_carbohydrates).toBe(230);
      expect(values.total_protein).toBe(115);
      expect(values.total_fat).toBe(74);
   });

   //test when kg is used for weight and ft for height
   test('Calculates correct values when goal is weight loss, height is standard and weight is metric', async () => {
      const goalsWeightLoss: CalculateGoalsArgs = {
         goal: 'weight_loss',
         activityLevel: 1,
         gender: 'non_binary',
         age: 27,
         height: 74,
         heightMetric: 'ft',
         weight: 79,
         weightMetric: 'kg',
      };
      const values = calculate(goalsWeightLoss);
      expect(values.total_calories).toBe(1896);
      expect(values.total_carbohydrates).toBe(213);
      expect(values.total_protein).toBe(142);
      expect(values.total_fat).toBe(53);
   });
   //2. goal is weight maitenance
   test('Calculates correct values when goal is weight maintenance, height is standard and weight is metric', async () => {
      const goalsWeightMaintain: CalculateGoalsArgs = {
         goal: 'maintain',
         activityLevel: 1.5,
         gender: 'female',
         age: 67,
         height: 59,
         heightMetric: 'ft',
         weight: 54,
         weightMetric: 'kg',
      };
      const values = calculate(goalsWeightMaintain);
      expect(values.total_calories).toBe(1812);
      expect(values.total_carbohydrates).toBe(204);
      expect(values.total_protein).toBe(65);
      expect(values.total_fat).toBe(82);
   });
   //3. goal is weight gain
   test('Calculates correct values when goal is weight gain, height is standard and weight is metric', async () => {
      const goalsWeightGain: CalculateGoalsArgs = {
         goal: 'gain_muscle',
         activityLevel: 1,
         gender: 'male',
         age: 48,
         height: 74,
         heightMetric: 'ft',
         weight: 74,
         weightMetric: 'kg',
      };
      const values = calculate(goalsWeightGain);
      expect(values.total_calories).toBe(2368);
      expect(values.total_carbohydrates).toBe(266);
      expect(values.total_protein).toBe(133);
      expect(values.total_fat).toBe(86);
   });
});
