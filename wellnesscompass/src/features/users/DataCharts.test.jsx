import React from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import DataCharts from './DataCharts';

const { charts } = vi.hoisted(() => ({ charts: [] }));
vi.mock('react-plotly.js', () => ({ default: (props) => { charts.push(props); return <div data-testid="chart" />; } }));
vi.mock('react-tooltip', () => ({ Tooltip: () => null }));
vi.mock('../../app/api/fetchAllUsers', () => ({ GetAllUsers: () => [{ userConsent: true, steps: [], activeMinutes: [] }] }));
vi.mock('../../app/api/fetchOneUser', () => ({ GetOneUser: () => [{ weight: [{ value: 150 }] }] }));
vi.mock('../statistics/descriptiveStatistics', () => ({
  caloriesMET: () => 100,
  userDataDisplay: () => [['2026-10-01'], [100]],
  averagesDataDisplay: () => [['2026-10-01'], [50]],
  userDataWeeklyDisplay: () => [['2026-10-01'], [100]],
  weeklyPopulationAverage: () => 50,
  weeklyStandardDeviation: () => 0,
  greaterOrLessThan: () => 'Synthetic comparison',
  getUserAverageForBreakDown: () => 1,
  simpleSum: () => 100,
  todayStats: () => ['Synthetic date', 100, 30, 2000],
  userBMR: () => 1500,
}));
afterEach(() => { cleanup(); charts.length = 0; });

it('all seven chart toggles supply supported Plotly layouts and traces with synthetic data', () => {
  render(<DataCharts userName="synthetic-test-only" />);
  const buttons = [
    screen.getAllByRole('button', { name: 'Steps' })[0],
    screen.getAllByRole('button', { name: 'Activity' })[0],
    screen.getByRole('button', { name: 'Sleep' }),
    screen.getAllByRole('button', { name: 'Steps' })[1],
    screen.getByRole('button', { name: 'Weight' }),
    screen.getAllByRole('button', { name: 'Activity' })[1],
    screen.getByRole('button', { name: 'Summary' }),
  ];
  for (const button of buttons) {
    const before = charts.length;
    fireEvent.click(button);
    expect(charts.length).toBeGreaterThan(before);
    for (const { layout, data } of charts.slice(before)) {
      expect(Array.isArray(layout)).toBe(false);
      if (layout.title) expect(typeof layout.title.text).toBe('string');
      expect(data.length).toBeGreaterThan(0);
      expect(data.every((trace) => ['bar', 'pie', 'scatter'].includes(trace.type))).toBe(true);
    }
  }
  expect(charts.some(({ data }) => data.some((trace) => trace.type === 'scatter' && trace.mode === 'lines'))).toBe(true);
});
