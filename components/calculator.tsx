"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { FunnelVisualization } from "@/components/funnel-visualization"
import { ResultsComparison } from "@/components/results-comparison"
import { ContactForm } from "@/components/contact-form"
import { CountryCodePicker } from "@/components/country-code-picker"

type FormData = {
  adSpend: number
  monthlyLeads: number
  closerBookings: number
  closerShowUps: number
  closeRate: number
  offerPrice: number
  name: string
  email: string
  countryCode: string
  phoneNumber: string
}

const initialFormData: FormData = {
  adSpend: 30000,
  monthlyLeads: 1000,
  closerBookings: 300,
  closerShowUps: 110,
  closeRate: 28,
  offerPrice: 9000,
  name: "",
  email: "",
  countryCode: "",
  phoneNumber: "",
}

export function Calculator() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [step, setStep] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const calculateCurrentResults = () => {
    const leads = formData.monthlyLeads
    const bookings = formData.closerBookings
    const shows = formData.closerShowUps
    const dealsClosed = shows * (formData.closeRate / 100)
    const revenue = dealsClosed * formData.offerPrice

    // Calculate metrics
    const costPerLead = formData.adSpend / leads
    const leadToBookingRate = (bookings / leads) * 100
    const showRate = (shows / bookings) * 100
    const roas = revenue / formData.adSpend
    const cpa = formData.adSpend / dealsClosed
    const revenuePerLead = revenue / leads

    return {
      leads,
      bookings,
      shows,
      dealsClosed,
      revenue,
      costPerLead,
      leadToBookingRate,
      showRate,
      roas,
      cpa,
      revenuePerLead,
    }
  }

  const calculateImprovedResults = () => {
    // Apply 10% improvements to key metrics
    const improvedLeadToBookingRate = Math.min((formData.closerBookings / formData.monthlyLeads) * 100 * 1.1, 100)
    const improvedShowRate = Math.min((formData.closerShowUps / formData.closerBookings) * 100 * 1.1, 100)
    const improvedCloseRate = Math.min(formData.closeRate * 1.1, 100)

    const leads = formData.monthlyLeads
    const bookings = leads * (improvedLeadToBookingRate / 100)
    const shows = bookings * (improvedShowRate / 100)
    const dealsClosed = shows * (improvedCloseRate / 100)
    const revenue = dealsClosed * formData.offerPrice

    // Calculate metrics
    const costPerLead = formData.adSpend / leads
    const roas = revenue / formData.adSpend
    const cpa = formData.adSpend / dealsClosed
    const revenuePerLead = revenue / leads

    return {
      leads,
      bookings,
      shows,
      dealsClosed,
      revenue,
      costPerLead,
      roas,
      cpa,
      revenuePerLead,
      improvedLeadToBookingRate,
      improvedShowRate,
      improvedCloseRate,
    }
  }

  const calculateAnnualLeak = () => {
    const current = calculateCurrentResults()
    const improved = calculateImprovedResults()
    return (improved.revenue - current.revenue) * 12
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 1,
    }).format(value)
  }

  const nextStep = () => {
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setShowResults(true)
    }
  }

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const questions = [
    {
      title: "Monthly Ad Spend",
      component: (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">What's your monthly paid ad spend?</h2>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              type="number"
              placeholder="30,000"
              className="pl-8"
              value={formData.adSpend || ""}
              onChange={(e) => handleInputChange("adSpend", Number.parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Monthly Marketing Leads",
      component: (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">How many leads do you get per month from paid ads?</h2>
          <Input
            type="number"
            placeholder="1,000"
            value={formData.monthlyLeads || ""}
            onChange={(e) => handleInputChange("monthlyLeads", Number.parseFloat(e.target.value) || 0)}
          />
        </div>
      ),
    },
    {
      title: "Closer Call Bookings",
      component: (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">How many sales calls get booked each month with your closers?</h2>
          <Input
            type="number"
            placeholder="300"
            value={formData.closerBookings || ""}
            onChange={(e) => handleInputChange("closerBookings", Number.parseFloat(e.target.value) || 0)}
          />
        </div>
      ),
    },
    {
      title: "Closer Call Show-Ups",
      component: (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">How many of those sales calls actually show up?</h2>
          <Input
            type="number"
            placeholder="110"
            value={formData.closerShowUps || ""}
            onChange={(e) => handleInputChange("closerShowUps", Number.parseFloat(e.target.value) || 0)}
          />
        </div>
      ),
    },
    {
      title: "Close Rate",
      component: (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">What % of your sales calls do you close into clients?</h2>
          <div className="space-y-6">
            <Slider
              value={[formData.closeRate]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => handleInputChange("closeRate", value[0])}
            />
            <div className="flex justify-between">
              <span>0%</span>
              <span className="font-medium">{formData.closeRate}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Offer Price",
      component: (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">What's the price of your main offer?</h2>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              type="number"
              placeholder="9,000"
              className="pl-8"
              value={formData.offerPrice || ""}
              onChange={(e) => handleInputChange("offerPrice", Number.parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Your Name",
      component: (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">What's your full name?</h2>
          <Input
            type="text"
            placeholder="John Smith"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
      ),
    },
    {
      title: "Your Email",
      component: (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">What's your email address?</h2>
          <Input
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>
      ),
    },
    {
      title: "Your Phone Number",
      component: (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">What's your phone number?</h2>
          <div className="flex gap-2">
            <CountryCodePicker
              value={formData.countryCode}
              onChange={(value) => handleInputChange("countryCode", value)}
            />
            <Input
              type="tel"
              placeholder="123-456-7890"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />
          </div>
        </div>
      ),
    },
  ]

  const currentResults = calculateCurrentResults()
  const improvedResults = calculateImprovedResults()
  const annualLeak = calculateAnnualLeak()

  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-6">
        {!showResults ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium text-gray-500">
                Step {step + 1} of {questions.length}
              </div>
              <div className="text-sm font-medium">{questions[step].title}</div>
            </div>

            <div className="h-1 w-full bg-gray-200 rounded-full">
              <div
                className="h-1 bg-gray-600 rounded-full transition-all duration-300"
                style={{ width: `${((step + 1) / questions.length) * 100}%` }}
              ></div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {questions[step].component}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={prevStep} disabled={step === 0} className="flex items-center gap-1">
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
              <Button
                onClick={nextStep}
                className="flex items-center gap-1"
                disabled={
                  (step === 0 && !formData.adSpend) ||
                  (step === 1 && !formData.monthlyLeads) ||
                  (step === 2 && !formData.closerBookings) ||
                  (step === 3 && !formData.closerShowUps) ||
                  (step === 6 && !formData.name) ||
                  (step === 7 && !formData.email) ||
                  (step === 8 && (!formData.countryCode || !formData.phoneNumber))
                }
              >
                {step === questions.length - 1 ? "See Results" : "Next"} <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Your Sales Funnel Analysis</h2>
              <p className="text-gray-600">Based on your inputs, here's how your sales funnel is performing</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-800">Revenue Leak Alert 🚨</h3>
                <p className="text-amber-700">
                  Your current sales system is leaking <span className="font-bold">{formatCurrency(annualLeak)}</span>{" "}
                  per year from preventable inefficiencies.
                </p>
              </div>
            </div>

            <FunnelVisualization current={currentResults} improved={improvedResults} />

            <ResultsComparison
              current={currentResults}
              improved={improvedResults}
              formatCurrency={formatCurrency}
              formatNumber={formatNumber}
            />

            <ContactForm
              name={formData.name}
              email={formData.email}
              phone={`${formData.countryCode}${formData.phoneNumber}`}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
