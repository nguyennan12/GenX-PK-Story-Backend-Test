import type { ScheduleGenerateInput } from '../validators/schedule.validator.js';

export interface ScheduleGenerateResult {
  endDate: string;
  fullSchedule: string[];
}

const generate = (_input: ScheduleGenerateInput): ScheduleGenerateResult => {
  throw new Error('Not implemented yet');
}

export const ScheduleService = { generate };
