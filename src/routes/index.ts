import { Router } from 'express';
import scheduleRoutes from './schedule.routes.js';
import invoiceRoutes from './invoice.routes.js';

const router = Router();

router.use('/schedule', scheduleRoutes);
router.use('/invoice', invoiceRoutes);

export default router;
