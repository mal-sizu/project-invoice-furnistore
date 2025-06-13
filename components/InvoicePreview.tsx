import { InvoiceFormData } from "@/lib/validation";
import { amountToWords } from "@/lib/amountToWords";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface InvoicePreviewProps {
  data: InvoiceFormData;
  onGeneratePDF: () => Promise<void>;
  isGenerating: boolean;
}

export default function InvoicePreview({ data, onGeneratePDF, isGenerating }: InvoicePreviewProps) {
  const totalAmount = data.items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="text-center bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold">Invoice Preview</CardTitle>
      </CardHeader>
      
      <CardContent className="p-8">
        {/* Header */}
        <div className="border-b-2 border-slate-200 pb-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Furnistore</h2>
              <p className="text-slate-600">No 192, Artigala road, Meegoda</p>
              <p className="text-slate-600">+94763371762 | furnistore.lk@gmail.com</p>
            </div>
            <div className="text-right">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">INVOICE</h3>
              <p className="text-slate-600">Invoice No: {data.invoiceId}</p>
              <p className="text-slate-600">Date: {new Date(data.date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-slate-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Bill to:</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-slate-600"><span className="font-medium">Name:</span> {data.customerName}</p>
              <p className="text-slate-600"><span className="font-medium">Contact:</span> {data.customerContact}</p>
            </div>
            <div>
              <p className="text-slate-600"><span className="font-medium">Address:</span></p>
              <p className="text-slate-600 whitespace-pre-line">{data.customerAddress}</p>
              <p className="text-slate-600"><span className="font-medium">City:</span> {data.city}</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-6">
          <div className="bg-slate-800 text-white p-4 rounded-t-lg">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2">Item Description</div>
              <div>Warranty</div>
              <div>Amount (Rs.)</div>
            </div>
          </div>
          
          <div className="border border-slate-200 rounded-b-lg">
            {data.items.map((item, index) => (
              <div 
                key={index}
                className={`grid grid-cols-4 gap-4 p-4 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                }`}
              >
                <div className="col-span-2">
                  <p className="font-medium text-slate-800">{item.description}</p>
                  <p className="text-sm text-slate-600">Color: {item.color}</p>
                </div>
                <div className="text-slate-700">{item.warranty} yrs warranty</div>
                <div className="text-slate-700">
                  {item.amount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-medium text-slate-800">Total Amount:</span>
            <span className="text-2xl font-bold text-green-700">
              {totalAmount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })} LKR
            </span>
          </div>
          <p className="text-slate-600 italic">
            <span className="font-medium"></span> {amountToWords(totalAmount)}
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-600 text-sm mb-6">
          <p className="font-medium mb-2">Thank you for your business!</p>
          <p>Payment terms: Due upon receipt | Payment methods: Bank Transfer, Cash</p>
        </div>

        {/* Generate PDF Button */}
        <div className="flex justify-center">
          <Button
            onClick={onGeneratePDF}
            disabled={isGenerating}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-12 py-4 text-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-xl"
          >
            {isGenerating ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-3" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 