"use client"

import { CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type ContactFormProps = {
  name: string
  email: string
  phone: string
}

export function ContactForm({ name, email, phone }: ContactFormProps) {
  return (
    <Card className="border-2 border-gray-800">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold">Ready to fix your leaky sales funnel?</h3>
          <p className="text-gray-600 mt-2">Book a free 30-minute Sales System Audit with our team</p>
        </div>

        <div className="space-y-4">
          <a
            href="https://go.heliosscale.com/booking"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button className="w-full py-6 text-lg" size="lg">
              <CalendarDays className="mr-2 h-5 w-5" />
              Book My Free Sales System Audit
            </Button>
          </a>

          <p className="text-xs text-center text-gray-500 mt-2">
            No obligation. Our team will help you identify and fix the leaks in your sales funnel.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
