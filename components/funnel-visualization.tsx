"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type FunnelData = {
  leads: number
  bookings: number
  shows: number
  dealsClosed: number
  revenue: number
}

type FunnelVisualizationProps = {
  current: FunnelData
  improved: FunnelData
}

export function FunnelVisualization({ current, improved }: FunnelVisualizationProps) {
  const [activeTab, setActiveTab] = useState("current")

  const formatNumber = (num: number) => {
    return num < 10 ? num.toFixed(1) : Math.round(num)
  }

  const getPercentage = (value: number, total: number) => {
    return total === 0 ? 0 : (value / total) * 100
  }

  const renderFunnelStage = (label: string, value: number, percentage: number, color: string, isLast = false) => {
    return (
      <div className="relative">
        <motion.div
          className={`h-16 ${color} rounded-t-lg flex items-center justify-center text-white font-medium`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(percentage, 5)}%` }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {percentage > 15 && <span className="px-2 text-center">{formatNumber(value)}</span>}
        </motion.div>
        {!isLast && (
          <div
            className={`w-0 h-0 border-l-[20px] border-r-[20px] border-t-[15px] ${color.replace("bg-", "border-t-")} border-l-transparent border-r-transparent mx-auto`}
          ></div>
        )}
        <div className="text-xs text-center mt-1">{label}</div>
      </div>
    )
  }

  const data = activeTab === "current" ? current : improved
  const maxValue = data.leads

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Sales Funnel Visualization</h3>

      <Tabs defaultValue="current" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="current">Current Funnel</TabsTrigger>
          <TabsTrigger value="improved">Improved Funnel</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <div className="space-y-6">
            {renderFunnelStage("Leads", data.leads, 100, activeTab === "current" ? "bg-gray-600" : "bg-emerald-600")}
            {renderFunnelStage(
              "Bookings",
              data.bookings,
              getPercentage(data.bookings, maxValue),
              activeTab === "current" ? "bg-gray-500" : "bg-emerald-500",
            )}
            {renderFunnelStage(
              "Shows",
              data.shows,
              getPercentage(data.shows, maxValue),
              activeTab === "current" ? "bg-gray-500" : "bg-emerald-500",
            )}
            {renderFunnelStage(
              "Deals Closed",
              data.dealsClosed,
              getPercentage(data.dealsClosed, maxValue),
              activeTab === "current" ? "bg-gray-600" : "bg-emerald-600",
              true,
            )}
          </div>
        </TabsContent>

        <TabsContent value="improved" className="space-y-4">
          <div className="space-y-6">
            {renderFunnelStage("Leads", data.leads, 100, activeTab === "current" ? "bg-gray-600" : "bg-emerald-600")}
            {renderFunnelStage(
              "Bookings",
              data.bookings,
              getPercentage(data.bookings, maxValue),
              activeTab === "current" ? "bg-gray-500" : "bg-emerald-500",
            )}
            {renderFunnelStage(
              "Shows",
              data.shows,
              getPercentage(data.shows, maxValue),
              activeTab === "current" ? "bg-gray-500" : "bg-emerald-500",
            )}
            {renderFunnelStage(
              "Deals Closed",
              data.dealsClosed,
              getPercentage(data.dealsClosed, maxValue),
              activeTab === "current" ? "bg-gray-600" : "bg-emerald-600",
              true,
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
