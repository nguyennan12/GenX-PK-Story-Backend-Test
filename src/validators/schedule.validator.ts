import { z } from 'zod';

export const scheduleGenerateSchema = z.object({}).passthrough();

export type ScheduleGenerateInput = z.infer<typeof scheduleGenerateSchema>;
