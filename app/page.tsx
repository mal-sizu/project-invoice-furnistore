"use client";

import { motion } from "framer-motion";
import { FileText, Download, Calculator, Building2, ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  const features = [
    {
      icon: FileText,
      title: "Professional Templates",
      description: "Beautiful, industry-standard invoice templates that match your brand"
    },
    {
      icon: Calculator,
      title: "Automatic Calculations",
      description: "Built-in calculations with amount-to-words conversion"
    },
    {
      icon: Download,
      title: "PDF Generation",
      description: "High-quality PDF invoices ready for printing or email"
    },
    {
      icon: Building2,
      title: "Business Ready",
      description: "Complete business information and professional formatting"
    }
  ];

  const benefits = [
    "Generate professional PDF invoices instantly",
    "Automatic filename with invoice ID, city, and timestamp",
    "Built-in amount to words conversion",
    "Multi-item support with warranty information",
    "Responsive design works on all devices",
    "No registration required - start immediately"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Building2 className="w-12 h-12 text-blue-600" />
              <h1 className="text-5xl font-bold text-slate-800">Furnistore</h1>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
              Professional Invoice Generator
            </h2>
            <p className="text-xl text-slate-600 mb-4 max-w-3xl mx-auto">
              Create beautiful, professional PDF invoices in seconds. Perfect for furniture stores, 
              retailers, and service providers who need quick, reliable invoice generation.
            </p>
            <p className="text-slate-500 mb-8">
              No 192, Artigala road, Meegoda | +94763371762 | furnistore.lk@gmail.com
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Link href="/create-invoice">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  Create Invoice Now
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              Everything You Need for Professional Invoicing
            </h3>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our invoice generator provides all the features you need to create, 
              customize, and download professional invoices.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-slate-200">
                  <CardHeader className="text-center">
                    <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-lg text-slate-800">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-center">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-slate-800 mb-6">
                Why Choose Our Invoice Generator?
              </h3>
              <p className="text-lg text-slate-600 mb-8">
                Streamline your invoicing process with our powerful, user-friendly tool 
                designed specifically for businesses that need professional results fast.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="p-8 shadow-xl border-slate-200 bg-gradient-to-br from-white to-blue-50">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                  <h4 className="text-2xl font-bold text-slate-800 mb-4">
                    Ready to Get Started?
                  </h4>
                  <p className="text-slate-600 mb-6">
                    Create your first professional invoice in less than 2 minutes. 
                    No setup required.
                  </p>
                  <Link href="/create-invoice">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                      Start Creating
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Building2 className="w-8 h-8" />
              <h5 className="text-2xl font-bold">Furnistore</h5>
            </div>
            <p className="text-slate-300 mb-2">
              Professional Invoice Generator
            </p>
            <p className="text-slate-400 text-sm">
              No 192, Artigala road, Meegoda | +94763371762 | furnistore.lk@gmail.com
            </p>
            <div className="mt-8 pt-8 border-t border-slate-700">
              <p className="text-slate-400 text-sm">
                © 2024 Furnistore. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}