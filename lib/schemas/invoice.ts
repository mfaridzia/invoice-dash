import { z } from "zod";
import dayjs from "dayjs";

export const invoiceFormSchema = z.object({
  name: z.string().min(1, "Invoice name is required"),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  dueDate: z
    .any()
    .refine((date) => date !== undefined && date !== null && date !== "", {
      message: "Due date is required",
    })
    .refine((date) => dayjs(date).isValid(), {
      message: "Invalid date",
    }),
  amount: z.string().min(1, "Amount is required"),
  status: z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : val),
    z.enum(["Paid", "Unpaid", "Pending"], {
      errorMap: () => ({ message: "Status must be Paid, Unpaid, or Pending" }),
    })
  ),
});

export type InvoiceFormSchema = z.infer<typeof invoiceFormSchema>;
