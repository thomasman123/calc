import { Calculator } from "@/components/calculator"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">Sales Funnel Calculator</h1>
        <p className="text-center text-gray-600 mb-8">
          Discover how much revenue you're leaving on the table with your current sales system.
        </p>
        <Calculator />
      </div>
    </main>
  )
}
