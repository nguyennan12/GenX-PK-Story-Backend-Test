import type { Request, Response } from 'express';
import { InvoiceService } from '../services/invoice.service.js';

const calcInvoice = (req: Request, res: Response): void => {
  const result = InvoiceService.calc(req.body);
  res.status(200).json(result);
};

export const InvoiceController = { calcInvoice };
