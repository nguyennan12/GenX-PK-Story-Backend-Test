import { z } from 'zod';
import { isValidDateString } from '../utils/date.utils.js';

const dateStringSchema = z
  .string()
  .refine(isValidDateString, 'Date must be in YYYY-MM-DD format');

const holidayRangeSchema = z
  .tuple([dateStringSchema, dateStringSchema])
  .refine(([start, end]) => start <= end, 'Holiday range start date must be before or equal end date' );

export const scheduleGenerateSchema = z.object({
  startDate: dateStringSchema,

  totalClasses: z
    .number()
    .int()
    .min(1),

  classWeekdays: z
    .array(z.number().int().min(0).max(6))
    .min(1),

  holidays: z.array(dateStringSchema),

  holidayRanges: z.array(holidayRangeSchema),
});

export type ScheduleGenerateRequest = z.infer<typeof scheduleGenerateSchema>;