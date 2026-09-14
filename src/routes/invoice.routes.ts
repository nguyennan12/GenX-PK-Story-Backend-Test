import { Router } from 'express';
import { InvoiceController } from '../controllers/invoice.controller.js';
import { asyncHandler } from '../middlewares/async-handler.middleware.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { invoiceCalcSchema } from '../validators/invoice.validator.js';

const router = Router();

router.post('/calc', validateBody(invoiceCalcSchema), asyncHandler(InvoiceController.calcInvoice));

export default router;
