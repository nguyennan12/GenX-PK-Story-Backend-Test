import { Router } from 'express';
import { ScheduleController } from '../controllers/schedule.controller.js';
import { asyncHandler } from '../middlewares/async-handler.middleware.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { scheduleGenerateSchema } from '../validators/schedule.validator.js';

const router = Router();

router.post('/generate', validateBody(scheduleGenerateSchema), asyncHandler(ScheduleController.generateSchedule),);

export default router;
