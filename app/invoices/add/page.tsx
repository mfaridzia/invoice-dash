"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  MenuItem,
  Button,
  Alert,
  Snackbar,
  Paper,
  Box,
  Typography,
  FormLabel,
  FormControl,
  Divider,
  Select,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  invoiceFormSchema,
  type InvoiceFormSchema,
} from "@/lib/schemas/invoice";
import { useInvoices } from "@/hooks/useInvoices";
import { parseCurrency } from "@/utils/format";

export default function AddInvoicePage() {
  const router = useRouter();
  const { addInvoice } = useInvoices();
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceFormSchema>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      status: undefined,
    },
  });

  const onSubmit = (data: InvoiceFormSchema) => {
    const formattedData = {
      ...data,
      dueDate: dayjs(data.dueDate).format("DD-MM-YYYY"),
    };

    addInvoice(formattedData);
    setShowSuccess(true);
    setTimeout(() => {
      router.push("/invoices/list");
    }, 1000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        p: 3,
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ mt: 2, mb: 2, ml: "78px" }}
      >
        Add Invoice
      </Typography>

      <Paper
        sx={{ p: 3, mt: 1, maxWidth: 1000, width: "100%", alignSelf: "center" }}
      >
        <Typography fontWeight="bold" fontSize="large" sx={{ mb: 2 }}>
          Invoice Form
        </Typography>

        <Divider sx={{ mx: -3, mb: 3, borderColor: "grey" }} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.name} fullWidth>
                  <FormLabel htmlFor="name" required>
                    Name
                  </FormLabel>

                  <TextField
                    {...field}
                    placeholder="Enter your invoice name"
                    error={!!errors.name}
                    size="small"
                  />
                </FormControl>
              )}
            />
            <Controller
              name="invoiceNumber"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.invoiceNumber} fullWidth>
                  <FormLabel htmlFor="invoiceNumber" required>
                    Number
                  </FormLabel>

                  <TextField
                    {...field}
                    placeholder="Enter your invoice number"
                    error={!!errors.invoiceNumber}
                    size="small"
                  />
                </FormControl>
              )}
            />
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.dueDate} fullWidth>
                  <FormLabel htmlFor="dueDate" required>
                    Due Date
                  </FormLabel>

                  <DatePicker
                    {...field}
                    format="DD/MM/YYYY"
                    slotProps={{
                      textField: {
                        error: !!errors.dueDate,
                        size: "small",
                      },
                    }}
                  />
                </FormControl>
              )}
            />

            <Controller
              name="amount"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl error={!!errors.amount} fullWidth>
                  <FormLabel htmlFor="amount" required>
                    Amount
                  </FormLabel>
                  <TextField
                    {...field}
                    type="text"
                    size="small"
                    placeholder="Enter your invoice amount"
                    error={!!errors.amount}
                    value={parseCurrency(field.value)}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      field.onChange(rawValue);
                    }}
                    slotProps={{
                      input: {
                        startAdornment: "Rp",
                      },
                    }}
                    sx={{
                      "& input": {
                        paddingLeft: "8px",
                      },
                    }}
                  />
                </FormControl>
              )}
            />

            <Controller
              name="status"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <FormControl error={!!errors.status} fullWidth>
                  <FormLabel htmlFor="status" required>
                    Status
                  </FormLabel>
                  <Select
                    {...field}
                    error={!!errors.status}
                    size="small"
                    displayEmpty
                    value={value || ""}
                    onChange={onChange}
                  >
                    <MenuItem value="" disabled>
                      Choose the status
                    </MenuItem>
                    <MenuItem value="Paid">Paid</MenuItem>
                    <MenuItem value="Unpaid">Unpaid</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Box>

          <Box sx={{ mt: 6, display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ textTransform: "none", width: "200px" }}
            >
              + Add Invoice
            </Button>
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success">
          Invoice added successfully!
          <br />
          You can view and manage your invoice in the 'My Invoices' section.
        </Alert>
      </Snackbar>
    </Box>
  );
}
