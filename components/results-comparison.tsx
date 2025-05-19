"use client"

import { ArrowRight, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type ResultsData = {
  revenue: number
  roas: number
  cpa: number
  dealsClosed: number
  leadToBookingRate?: number
  showRate?: number
  closeRate?: number
  improvedLeadToBookingRate?: number
  improvedShowRate?: number
  improvedCloseRate?: number
}

type ResultsComparisonProps = {
  current: ResultsData
  improved: ResultsData
  formatCurrency: (value: number) => string
  formatNumber: (value: number) => string
}

export function ResultsComparison({ current, improved, formatCurrency, formatNumber }: ResultsComparisonProps) {
  const percentIncrease = (current: number, improved: number) => {
    return (((improved - current) / current) * 100).toFixed(1)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Current vs. Improved Performance</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Monthly Revenue</h4>
            <div className="flex items-center gap-3">
              <div className="text-xl font-bold">{formatCurrency(current.revenue)}</div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className="text-xl font-bold text-emerald-600">{formatCurrency(improved.revenue)}</div>
              <div className="text-sm font-medium text-emerald-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {percentIncrease(current.revenue, improved.revenue)}%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Return on Ad Spend (ROAS)</h4>
            <div className="flex items-center gap-3">
              <div className="text-xl font-bold">{formatNumber(current.roas)}x</div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className="text-xl font-bold text-emerald-600">{formatNumber(improved.roas)}x</div>
              <div className="text-sm font-medium text-emerald-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {percentIncrease(current.roas, improved.roas)}%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Cost Per Acquisition (CPA)</h4>
            <div className="flex items-center gap-3">
              <div className="text-xl font-bold">{formatCurrency(current.cpa)}</div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className="text-xl font-bold text-emerald-600">{formatCurrency(improved.cpa)}</div>
              <div className="text-sm font-medium text-emerald-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {percentIncrease(improved.cpa, current.cpa)}% lower
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Deals Closed (Monthly)</h4>
            <div className="flex items-center gap-3">
              <div className="text-xl font-bold">{formatNumber(current.dealsClosed)}</div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className="text-xl font-bold text-emerald-600">{formatNumber(improved.dealsClosed)}</div>
              <div className="text-sm font-medium text-emerald-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {percentIncrease(current.dealsClosed, improved.dealsClosed)}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Improvements Applied</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
            <span>
              Lead-to-Booking Rate: {current.leadToBookingRate?.toFixed(1)}% →{" "}
              {improved.improvedLeadToBookingRate?.toFixed(1)}%
            </span>
          </li>
          <li className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
            <span>
              Show Rate: {current.showRate?.toFixed(1)}% → {improved.improvedShowRate?.toFixed(1)}%
            </span>
          </li>
          <li className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
            <span>
              Close Rate: {current.closeRate}% → {improved.improvedCloseRate?.toFixed(1)}%
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
