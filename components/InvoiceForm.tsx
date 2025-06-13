"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Download, Loader2, Calculator, FileText, Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

import { invoiceSchema, InvoiceFormData } from "@/lib/validation";
import { generateInvoicePDF } from "@/lib/pdfGenerator";
import { amountToWords } from "@/lib/amountToWords";
import InvoicePreview from "./InvoicePreview";

const colorOptions = [
  { value: "Teak Brown", label: "Teak Brown" },
  { value: "American Ash", label: "American Ash" },
  { value: "White", label: "White" },
  { value: "Black", label: "Black" },
  { value: "Other", label: "Other" },
];

export default function InvoiceForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      invoiceId: "",
      customerName: "",
      customerAddress: "",
      customerContact: "",
      city: "",
      date: new Date().toISOString().split('T')[0],
      items: [
        {
          description: "",
          warranty: "1",
          color: "",
          amount: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const watchedItems = form.watch("items");
  const totalAmount = watchedItems.reduce((sum, item) => sum + (item.amount || 0), 0);

  const onSubmit = async (data: InvoiceFormData) => {
    setShowPreview(true);
  };

  const handleGeneratePDF = async () => {
    try {
      setIsGenerating(true);
      const filename = await generateInvoicePDF(form.getValues());
      
      toast({
        title: "Invoice Generated Successfully!",
        description: `PDF saved as: ${filename}`,
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const addItem = () => {
    append({
      description: "",
      warranty: "1",
      color: "",
      amount: 0,
    });
  };

  const removeItem = (index: number) => {
    remove(index);
  };

  const incrementWarranty = (index: number) => {
    const currentValue = parseInt(form.getValues(`items.${index}.warranty`) || "1");
    form.setValue(`items.${index}.warranty`, (currentValue + 1).toString());
  };

  const decrementWarranty = (index: number) => {
    const currentValue = parseInt(form.getValues(`items.${index}.warranty`) || "1");
    if (currentValue > 1) {
      form.setValue(`items.${index}.warranty`, (currentValue - 1).toString());
    }
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <InvoicePreview
              data={form.getValues()}
              onGeneratePDF={handleGeneratePDF}
              isGenerating={isGenerating}
            />
            <div className="flex justify-center mt-6">
              <Button
                onClick={() => setShowPreview(false)}
                variant="outline"
                className="mr-4"
              >
                Back to Edit
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <Building2 className="w-8 h-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-slate-800">Furnistore</h1>
            </motion.div>
            <p className="text-slate-600 text-lg">Professional Invoice Generator</p>
            <p className="text-slate-500 text-sm mt-2">No 192, Artigala road, Meegoda | +94763371762</p>
          </div>

          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-t-lg">
              <div className="flex items-center justify-center gap-3">
                <FileText className="w-6 h-6" />
                <CardTitle className="text-2xl font-bold">Create New Invoice</CardTitle>
              </div>
              <p className="text-slate-300 mt-2">Fill in the details below to generate a professional PDF invoice</p>
            </CardHeader>

            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Invoice Details */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card className="border-slate-200 shadow-sm">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-t-lg border-b">
                        <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-blue-600" />
                          Invoice Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="invoiceId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 font-medium">Invoice ID *</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g., INV-001, 000529"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-slate-300"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 font-medium">Invoice Date *</FormLabel>
                                <FormControl>
                                  <Input
                                    type="date"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-slate-300"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Customer Information */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="border-slate-200 shadow-sm">
                      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b">
                        <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-green-600" />
                          Customer Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="customerName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 font-medium">Customer Name *</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g., Asra Ameen"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-slate-300"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="customerContact"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 font-medium">Contact Number *</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g., +94 77 838 3287"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-slate-300"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="customerAddress"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel className="text-slate-700 font-medium">Customer Address *</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="e.g., K K Street, Puttalam"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-slate-300"
                                    rows={3}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 font-medium">City *</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g., Puttalam, Colombo"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-slate-300"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Items */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="border-slate-200 shadow-sm">
                      <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-t-lg border-b">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                            <Calculator className="w-5 h-5 text-orange-600" />
                            Invoice Items
                          </CardTitle>
                          <Button
                            type="button"
                            onClick={addItem}
                            variant="outline"
                            size="sm"
                            className="transition-all duration-200 hover:bg-blue-50 hover:border-blue-300 border-slate-300"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Item
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          <AnimatePresence>
                            {fields.map((field, index) => (
                              <motion.div
                                key={field.id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="p-6 border border-slate-200 rounded-lg bg-gradient-to-r from-slate-50/50 to-blue-50/30 shadow-sm"
                              >
                                <div className="flex justify-between items-center mb-4">
                                  <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                                    <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">
                                      {index + 1}
                                    </span>
                                    Item {index + 1}
                                  </h4>
                                  {fields.length > 1 && (
                                    <Button
                                      type="button"
                                      onClick={() => removeItem(index)}
                                      variant="ghost"
                                      size="sm"
                                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                  <FormField
                                    control={form.control}
                                    name={`items.${index}.description`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-slate-700 font-medium">Item Description *</FormLabel>
                                        <FormControl>
                                          <Textarea
                                            placeholder="e.g., 3 door wardrobe | long drawers - American Ash"
                                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-slate-300"
                                            rows={3}
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`items.${index}.color`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-slate-700 font-medium">Color *</FormLabel>
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-slate-300">
                                              <SelectValue placeholder="Select color" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            {colorOptions.map((color) => (
                                              <SelectItem key={color.value} value={color.value}>
                                                {color.label}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`items.${index}.warranty`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-slate-700 font-medium">Warranty (Years) *</FormLabel>
                                        <div className="flex items-center gap-2">
                                          <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => decrementWarranty(index)}
                                            className="h-10 w-10 p-0"
                                          >
                                            -
                                          </Button>
                                          <FormControl>
                                            <Input
                                              type="number"
                                              min="1"
                                              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-slate-300 text-center"
                                              {...field}
                                            />
                                          </FormControl>
                                          <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => incrementWarranty(index)}
                                            className="h-10 w-10 p-0"
                                          >
                                            +
                                          </Button>
                                        </div>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`items.${index}.amount`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-slate-700 font-medium">Amount (Rs.) *</FormLabel>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            placeholder="e.g., 36000.00"
                                            step="0.01"
                                            min="0"
                                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-slate-300"
                                            {...field}
                                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Total Amount */}
                  {totalAmount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <Calculator className="w-6 h-6 text-green-600 mr-3" />
                            <h3 className="text-xl font-semibold text-green-800">Total Calculation</h3>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-slate-700 text-lg">Total Amount:</span>
                              <span className="text-3xl font-bold text-green-700">
                                Rs. {totalAmount.toLocaleString('en-US', { 
                                  minimumFractionDigits: 2, 
                                  maximumFractionDigits: 2 
                                })}
                              </span>
                            </div>
                            <div className="text-sm text-slate-600 italic p-3 bg-white/50 rounded-lg border border-green-200">
                              <strong>In words:</strong> {amountToWords(totalAmount)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center pt-6"
                  >
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-12 py-4 text-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-xl"
                    >
                      <FileText className="w-5 h-5 mr-3" />
                      Preview Invoice
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}