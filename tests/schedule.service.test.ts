import { describe, expect, it } from 'vitest';
import { ScheduleService } from '../src/services/schedule.service';
import { scheduleGenerateSchema } from '../src/validators/schedule.validator';

describe('ScheduleService.generate', () => {
  it('includes startDate when it is a valid class day', () => {
     const result = ScheduleService.generate({
      startDate: '2026-01-01',
      totalClasses: 2,
      classWeekdays: [3],
      holidays: [],
      holidayRanges: [],
    });

    expect(result).toEqual({
      endDate: '2026-01-08',
      fullSchedule: ['2026-01-01', '2026-01-08'],
    });
  });

  it('normalizes duplicate and unsorted weekdays', () => {
    const result = ScheduleService.generate({
      startDate: '2026-01-01',
      totalClasses: 4,
      classWeekdays: [3, 1, 1],
      holidays: [],
      holidayRanges: [],
    });

    expect(result).toEqual({
      endDate: '2026-01-13',
      fullSchedule: ['2026-01-01', '2026-01-06', '2026-01-08', '2026-01-13'],
    });
  });

  it('skips single holidays', () => {
    const result = ScheduleService.generate({
      startDate: '2026-01-01',
      totalClasses: 3,
      classWeekdays: [3],
      holidays: ['2026-01-08'],
      holidayRanges: [],
    });

    expect(result).toEqual({
      endDate: '2026-01-22',
      fullSchedule: ['2026-01-01', '2026-01-15', '2026-01-22'],
    });
  });

  it('skips holiday ranges inclusively', () => {
    const result = ScheduleService.generate({
      startDate: '2026-01-01',
      totalClasses: 3,
      classWeekdays: [3],
      holidays: [],
      holidayRanges: [['2026-01-08', '2026-01-15']],
    });

    expect(result).toEqual({
      endDate: '2026-01-29',
      fullSchedule: ['2026-01-01', '2026-01-22', '2026-01-29'],
    });
  });

  it('skips a date when it appears in both holidays and holidayRanges', () => {
    const result = ScheduleService.generate({
      startDate: '2026-01-01',
      totalClasses: 2,
      classWeekdays: [3],
      holidays: ['2026-01-08'],
      holidayRanges: [['2026-01-08', '2026-01-08']],
    });

    expect(result).toEqual({
      endDate: '2026-01-15',
      fullSchedule: ['2026-01-01', '2026-01-15'],
    });
  });

  it('rejects invalid date format in validation', () => {
    const result = scheduleGenerateSchema.safeParse({
      startDate: '2026/01/01',
      totalClasses: 2,
      classWeekdays: [3],
      holidays: [],
      holidayRanges: [],
    });

    expect(result.success).toBe(false);
  });

  it('rejects holiday range when start is after end', () => {
    const result = scheduleGenerateSchema.safeParse({
      startDate: '2026-01-01',
      totalClasses: 2,
      classWeekdays: [3],
      holidays: [],
      holidayRanges: [['2026-01-15', '2026-01-08']],
    });

    expect(result.success).toBe(false);
  });
});