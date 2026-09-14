import type { Request, Response } from 'express';
import { ScheduleService } from '../services/schedule.service.js';

const generateSchedule = (req: Request, res: Response): void => {
  const result = ScheduleService.generate(req.body);
  res.status(200).json(result);
};

export const ScheduleController = { generateSchedule };
