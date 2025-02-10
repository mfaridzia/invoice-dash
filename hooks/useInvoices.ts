"use client";

import { useState, useEffect } from "react";
import type { Invoice, InvoiceFormData } from "@/lib/types/invoice";
import { STORAGE_KEY } from "@/constants";

type State =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "success"; invoices: Invoice[] };

export function useInvoices() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const invoices = stored ? (JSON.parse(stored) as Invoice[]) : [];
      setState({ status: "success", invoices });
    } catch {
      setState({
        status: "error",
        error: "Failed to load invoices from storage.",
      });
    }
  }, []);

  const addInvoice = (data: InvoiceFormData) => {
    if (state.status !== "success") return;

    try {
      const newInvoice: Invoice = {
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
        ...data,
        amount: Number.parseFloat(data.amount),
        invoiceNumber: `INV${data.invoiceNumber}`,
      };

      const updatedInvoices = [...state.invoices, newInvoice];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedInvoices));
      setState({ status: "success", invoices: updatedInvoices });

      return newInvoice;
    } catch {
      setState({
        status: "error",
        error: "Failed to add invoice.",
      });
    }
  };

  const deleteInvoice = (id: string) => {
    if (state.status !== "success") return;

    try {
      const updatedInvoices = state.invoices.filter(
        (invoice) => invoice.id !== id
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedInvoices));
      setState({ status: "success", invoices: updatedInvoices });
    } catch {
      setState({
        status: "error",
        error: "Failed to delete invoice.",
      });
    }
  };

  return { state, addInvoice, deleteInvoice };
}
