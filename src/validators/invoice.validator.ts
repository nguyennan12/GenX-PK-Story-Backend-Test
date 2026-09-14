import { z } from 'zod';

export const invoiceCalcSchema = z.object({}).passthrough();

export type InvoiceCalcInput = z.infer<typeof invoiceCalcSchema>;
