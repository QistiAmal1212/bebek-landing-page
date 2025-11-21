import { useEffect, useMemo, useState } from "react"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { ArrowLeft, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

type ReceiptItem = { id: number; name: string; price: number; quantity: number }
type ReceiptData = {
  code: string
  createdAt: string
  orderType: "pickup" | "delivery"
  payment: string
  items: ReceiptItem[]
  total: number
}

export default function ReceiptPage() {
  const navigate = useNavigate()
  const [receipt, setReceipt] = useState<ReceiptData | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("bebek-receipt")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setReceipt(parsed)
      } catch {
        navigate("/menu")
      }
    } else {
      navigate("/menu")
    }
  }, [navigate])

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("ms-MY", { style: "currency", currency: "MYR", minimumFractionDigits: 2 }).format(value)

  const formattedDate = useMemo(() => {
    if (!receipt) return ""
    return new Date(receipt.createdAt).toLocaleString("en-MY", { dateStyle: "medium", timeStyle: "short" })
  }, [receipt])

  if (!receipt) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#f4f7f3] text-gray-900">
      <header className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <RouterLink to="/menu" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft size={18} />
            Back to menu
          </RouterLink>
          <p className="text-xs uppercase tracking-[0.4em] text-gray-400">Receipt</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="rounded-[32px] bg-white shadow-[0_35px_120px_rgba(17,25,40,0.08)] p-8 space-y-8">
          <div className="text-center space-y-1">
            <p className="text-xs uppercase tracking-[0.5em] text-emerald-600">Bebek Top Global</p>
            <h1 className="text-3xl font-semibold text-gray-900">Present this slip at pickup</h1>
            <p className="text-sm text-gray-500">Your order and payment preference are saved. Show this to the crew.</p>
          </div>

          <div className="rounded-3xl border border-dashed border-gray-200 p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-gray-400">Order Code</p>
                <p className="text-4xl font-semibold tracking-[0.2em] text-gray-900">{receipt.code}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.4em] text-gray-400">Issued</p>
                <p className="text-sm font-semibold text-gray-900">{formattedDate}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-[0.4em] text-gray-400">Order Type</p>
                <p className="mt-1 font-semibold text-gray-900">{receipt.orderType === "pickup" ? "Pickup" : "Delivery"}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-[0.4em] text-gray-400">Payment</p>
                <p className="mt-1 font-semibold text-gray-900">{receipt.payment}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.4em] text-gray-400">Items</p>
              <button
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 hover:text-gray-900"
                onClick={() => window.print()}
              >
                <Printer size={14} />
                Print
              </button>
            </div>
            <div className="rounded-3xl border border-gray-100 divide-y divide-gray-100">
              {receipt.items.map((item) => (
                <div key={`receipt-item-${item.id}`} className="p-4 flex items-center justify-between text-sm text-gray-600">
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p>
                      {item.quantity} x {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
              {receipt.items.length === 0 && <p className="p-4 text-sm text-gray-400">No items found.</p>}
            </div>
            <div className="flex items-center justify-between text-base font-semibold text-gray-900">
              <span>Total Due</span>
              <span>{formatPrice(receipt.total)}</span>
            </div>
          </div>

          <div className="rounded-3xl bg-gray-50 p-5 text-sm text-gray-600 space-y-2">
            <p>
              Need changes? Return to the menu to place another order. Otherwise head over to the counter and show the code
              above.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => navigate("/menu")}>
                New Order
              </Button>
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => navigate("/checkout")}>
                Checkout Again
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
