"use client";

import InvoiceForm from "@/components/InvoiceForm";
import { Toaster } from "@/components/ui/sonner";

export default function CreateInvoicePage() {
  return (
    <>
      <InvoiceForm />
      <Toaster />
    </>
  );
}