"use client"

import { useEffect, useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export type CountryCode = {
  code: string
  name: string
  dial_code: string
}

const countryCodes: CountryCode[] = [
  { code: "US", name: "United States", dial_code: "+1" },
  { code: "GB", name: "United Kingdom", dial_code: "+44" },
  { code: "CA", name: "Canada", dial_code: "+1" },
  { code: "AU", name: "Australia", dial_code: "+61" },
  { code: "DE", name: "Germany", dial_code: "+49" },
  { code: "FR", name: "France", dial_code: "+33" },
  { code: "IN", name: "India", dial_code: "+91" },
  { code: "IT", name: "Italy", dial_code: "+39" },
  { code: "JP", name: "Japan", dial_code: "+81" },
  { code: "BR", name: "Brazil", dial_code: "+55" },
  { code: "RU", name: "Russia", dial_code: "+7" },
  { code: "ZA", name: "South Africa", dial_code: "+27" },
  { code: "MX", name: "Mexico", dial_code: "+52" },
  { code: "ES", name: "Spain", dial_code: "+34" },
  { code: "CN", name: "China", dial_code: "+86" },
  { code: "NL", name: "Netherlands", dial_code: "+31" },
  { code: "SE", name: "Sweden", dial_code: "+46" },
  { code: "NO", name: "Norway", dial_code: "+47" },
  { code: "NZ", name: "New Zealand", dial_code: "+64" },
  { code: "SG", name: "Singapore", dial_code: "+65" },
]

interface CountryCodePickerProps {
  value: string
  onChange: (value: string) => void
}

export function CountryCodePicker({ value, onChange }: CountryCodePickerProps) {
  const [open, setOpen] = useState(false)

  // Get user's country from timezone if possible
  useEffect(() => {
    if (value) return // Skip if value is already set

    try {
      // Try to get country from browser locale
      const locale = navigator.language
      const country = locale.split("-")[1] || "US"

      // Find matching country code
      const countryMatch = countryCodes.find((c) => c.code === country)
      if (countryMatch) {
        onChange(countryMatch.dial_code)
      } else {
        // Default to US
        onChange("+1")
      }
    } catch (error) {
      // Default to US if there's an error
      onChange("+1")
    }
  }, [value, onChange])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[110px] justify-between">
          {value ? countryCodes.find((country) => country.dial_code === value)?.dial_code : "Select..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-y-auto">
              {countryCodes.map((country) => (
                <CommandItem
                  key={country.code}
                  value={country.code}
                  onSelect={() => {
                    onChange(country.dial_code)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === country.dial_code ? "opacity-100" : "opacity-0")} />
                  {country.name} ({country.dial_code})
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
