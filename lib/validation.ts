import { z } from "zod";

export const invoiceSchema = z.object({
  invoiceId: z.string().min(1, "Invoice ID is required"),
  customerName: z.string().min(1, "Customer name is required"),
  customerAddress: z.string().min(1, "Customer address is required"),
  customerContact: z.string().min(1, "Customer contact is required"),
  city: z.string().min(1, "City is required"),
  date: z.string().min(1, "Date is required"),
  items: z.array(
    z.object({
      description: z.string().min(1, "Item description is required"),
      warranty: z.string().min(1, "Warranty information is required"),
      color: z.string().min(1, "Color is required"),
      amount: z.number().min(0.01, "Amount must be greater than 0"),
    })
  ).min(1, "At least one item is required"),
});

export type InvoiceFormData = z.infer<typeof invoiceSchema>;