"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Menu,
  MenuItem as MenuItemMUI,
  Snackbar,
  Alert,
} from "@mui/material";
import { useInvoices } from "@/hooks/useInvoices";
import { QUERY } from "@/constants";
import { Search } from "@/components/invoices/search";
import { DropdownStatus } from "@/components/invoices/dropdown-status";
import { InvoiceTable } from "@/components/invoices/table";

export default function InvoiceListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, deleteInvoice } = useInvoices();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const search = searchParams.get(QUERY.SEARCH) || "";
  const status = searchParams.get(QUERY.STATUS) || QUERY.ALL_STATUS;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams);
    if (event.target.value) {
      newParams.set(QUERY.SEARCH, event.target.value);
    } else {
      newParams.delete(QUERY.SEARCH);
    }
    router.push(`?${newParams.toString()}`);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams);
    if (event.target.value !== QUERY.ALL_STATUS) {
      newParams.set(QUERY.STATUS, event.target.value);
    } else {
      newParams.delete(QUERY.STATUS);
    }
    router.push(`?${newParams.toString()}`);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedInvoice(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedInvoice(null);
  };

  const handleDeleteInvoice = () => {
    if (selectedInvoice) {
      setShowSuccess(true);
      deleteInvoice(selectedInvoice);
      handleMenuClose();
    }
  };

  if (state.status === "loading")
    return (
      <Typography textAlign="center" mt={20} variant="h3">
        Loading your data...
      </Typography>
    );

  if (state.status === "error")
    return (
      <Typography color="error" textAlign="center" mt={20} variant="h3">
        {state.error}
      </Typography>
    );

  const filteredInvoices = state.invoices.filter((invoice) => {
    const matchesSearch =
      invoice.name.toLowerCase().includes(search.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      status === QUERY.ALL_STATUS || invoice.status === status;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ px: 12, py: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#1F2937" }}>
          My Invoices
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Search search={search} onChangeSearch={handleSearchChange} />
          <DropdownStatus status={status} onChangeStatus={handleStatusChange} />
        </Box>
      </Box>

      {filteredInvoices.length > 0 ? (
        <InvoiceTable
          invoices={filteredInvoices}
          onHandleMenuOpen={handleMenuOpen}
        />
      ) : (
        <Box sx={{ textAlign: "center", py: 5 }}>
          <Typography variant="h6" color="textPrimary">
            Oops, no data found
          </Typography>
        </Box>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItemMUI onClick={handleDeleteInvoice} sx={{ color: "#DC2626" }}>
          Delete
        </MenuItemMUI>
      </Menu>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success">Invoice deleted successfully!</Alert>
      </Snackbar>
    </Box>
  );
}
