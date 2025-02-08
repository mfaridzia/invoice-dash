import dayjs from "dayjs";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import { MoreHoriz as MoreHorizIcon } from "@mui/icons-material";
import { formatCurrency } from "@/utils/format";
import { STATUS_STYLES } from "@/constants";
import { Invoice } from "@/lib/types/invoice";

export function InvoiceTable({
  invoices,
  onHandleMenuOpen,
}: {
  invoices: Invoice[];
  onHandleMenuOpen: (event: React.MouseEvent<HTMLElement>, id: string) => void;
}) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
            <TableCell sx={{ color: "#000", fontWeight: 600 }}>
              Invoice
            </TableCell>
            <TableCell sx={{ color: "#000", fontWeight: 600 }}>
              Due Date
            </TableCell>
            <TableCell sx={{ color: "#000", fontWeight: 600 }}>
              Status
            </TableCell>
            <TableCell sx={{ color: "#000", fontWeight: 600 }}>
              Amount
            </TableCell>
            <TableCell align="right" sx={{ color: "#000", fontWeight: 600 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow
              key={invoice.id}
              sx={{ "&:hover": { backgroundColor: "#F9FAFB" } }}
            >
              <TableCell>
                <Typography
                  variant="body1"
                  sx={{ color: "#111827", fontWeight: 500 }}
                >
                  {invoice.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#6B7280" }}>
                  {invoice.invoiceNumber}
                </Typography>
              </TableCell>
              <TableCell sx={{ color: "#000" }}>
                {dayjs(invoice.dueDate, "DD-MM-YYYY").format("MMM D, YYYY")}
              </TableCell>
              <TableCell>
                <Chip
                  label={invoice.status}
                  size="small"
                  sx={{
                    ...STATUS_STYLES[invoice.status],
                    borderRadius: "16px",
                    fontWeight: 500,
                  }}
                />
              </TableCell>
              <TableCell sx={{ color: "#000" }}>
                {formatCurrency(invoice.amount)}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={(e) => onHandleMenuOpen(e, invoice.id)}
                  sx={{ color: "#6B7280" }}
                >
                  <MoreHorizIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
