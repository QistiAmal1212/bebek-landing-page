import { useEffect, useMemo, useState } from "react"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { ArrowLeft, ShieldCheck, Store, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

const paymentOptions = [
  { id: "cash", label: "Cash at Outlet", description: "Pay at pickup counter." },
  { id: "fpx", label: "FPX / Online Banking", description: "Pay with Malaysian banks." },
]

const fpxBanks = [
  { name: "Maybank2u", short: "Maybank", accent: "#f5c844" },
  { name: "CIMB Clicks", short: "CIMB", accent: "#d62828" },
  { name: "RHB Now", short: "RHB", accent: "#3a86ff" },
  { name: "Hong Leong Connect", short: "Hong Leong", accent: "#1d3557" },
  { name: "Public Bank", short: "Public Bank", accent: "#ff6f61" },
  { name: "Bank Islam", short: "Bank Islam", accent: "#8d5a97" },
]

export default function CheckoutPage() {
  const navigate = useNavigate()
  const [cart, setCart] = useState<Array<{ id: number; name: string; price: number; quantity: number }>>([])
  const [cartInitialized, setCartInitialized] = useState(false)
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup")
  const [paymentMethod, setPaymentMethod] = useState<string>("cash")
  const [selectedBank, setSelectedBank] = useState("")

  useEffect(() => {
    const storedCart = localStorage.getItem("bebek-cart")
    const storedOrderType = localStorage.getItem("bebek-order-type")
    const storedPaymentMethod = localStorage.getItem("bebek-payment-method")
    const storedBank = localStorage.getItem("bebek-payment-bank")
    if (storedCart) setCart(JSON.parse(storedCart))
    if (storedOrderType === "pickup" || storedOrderType === "delivery") setOrderType(storedOrderType)
    if (storedPaymentMethod) setPaymentMethod(storedPaymentMethod)
    if (storedBank) setSelectedBank(storedBank)
    setCartInitialized(true)
  }, [])

  useEffect(() => {
    if (!cartInitialized) return
    localStorage.setItem("bebek-order-type", orderType)
  }, [orderType, cartInitialized])

  useEffect(() => {
    if (!cartInitialized) return
    localStorage.setItem("bebek-payment-method", paymentMethod)
  }, [paymentMethod, cartInitialized])

  useEffect(() => {
    if (!cartInitialized) return
    localStorage.setItem("bebek-payment-bank", selectedBank)
  }, [selectedBank, cartInitialized])

  const totalPrice = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart])
  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart])

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("ms-MY", { style: "currency", currency: "MYR", minimumFractionDigits: 2 }).format(value)

  const handlePay = () => {
    if (cart.length === 0) {
      alert("Cart is empty. Add your sets again from the menu.")
      navigate("/menu")
      return
    }
    if (!paymentMethod) {
      alert("Select a payment method first!")
      return
    }
    if (paymentMethod === "fpx" && !selectedBank) {
      alert("Please choose a bank for FPX payment.")
      return
    }
    const code = `BTG-${Math.floor(Math.random() * 90000 + 10000)}`
    const receiptPayload = {
      code,
      createdAt: new Date().toISOString(),
      orderType,
      payment: paymentSummary,
      items: cart,
      total: totalPrice,
    }
    localStorage.setItem("bebek-receipt", JSON.stringify(receiptPayload))
    setCart([])
    localStorage.removeItem("bebek-cart")
    navigate("/receipt")
  }

  const paymentSummary = paymentMethod === "fpx" ? `FPX (${selectedBank || "Select bank"})` : "Cash at outlet"

  return (
    <div className="min-h-screen bg-[#f4f7f3] text-gray-900">
      <header className="bg-gradient-to-br from-[#0b1e13] via-[#123522] to-[#0f2419] text-white">
        <div className="container mx-auto px-4 py-10 space-y-8">
          <div className="flex items-center justify-between gap-6">
            <RouterLink to="/menu" className="text-white/80 hover:text-white">
              <ArrowLeft size={22} />
            </RouterLink>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.45em] text-emerald-200">Bebek Top Global Checkout</p>
            <h1 className="mt-3 text-3xl md:text-4xl font-semibold text-white">Secure payment for your sambal cravings</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 mt-6 pb-16 relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          <section className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <button
                className={`w-full rounded-[20px] border px-4 py-4 text-left transition ${
                  orderType === "pickup"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                    : "border-gray-200 text-gray-500 hover:border-emerald-200"
                }`}
                onClick={() => setOrderType("pickup")}
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-full bg-white border border-emerald-100 shrink-0">
                    <Store size={18} className={orderType === "pickup" ? "text-emerald-600" : "text-gray-400"} />
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">Pickup</p>
                    <p className="text-xs text-gray-500">Bebek outlet</p>
                  </div>
                </div>
              </button>
              <button className="w-full rounded-[20px] border border-dashed border-gray-300 px-4 py-4 text-left text-gray-400" disabled>
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-full bg-gray-50 border border-gray-200 shrink-0">
                    <Truck size={18} className="text-gray-400" />
                  </span>
                  <div>
                    <p className="font-semibold text-gray-500">Delivery</p>
                    <p className="text-xs uppercase tracking-wide text-gray-400">soon</p>
                  </div>
                </div>
              </button>
            </div>

            <div className="rounded-3xl border border-white/80 bg-white/95 shadow-[0_15px_40px_rgba(8,23,15,0.08)] p-8 space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.5em] text-emerald-600">Order Summary</p>
                </div>
                <span className="text-sm text-gray-500">{totalItems} items</span>
              </div>
              {cart.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/70 p-6 text-sm text-emerald-700">
                  Cart is empty. {" "}
                  <RouterLink to="/menu" className="font-semibold underline">
                    Add your sambal set from the menu.
                  </RouterLink>
                </div>
              ) : (
                <div className="space-y-4 divide-y divide-gray-100">
                  {cart.map((item) => (
                    <div key={`checkout-${item.id}`} className="pt-4 first:pt-0 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.quantity} x {formatPrice(item.price)}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

     

            <div className="rounded-3xl border border-white/80 bg-white shadow-[0_10px_30px_rgba(7,27,17,0.06)] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.5em] text-emerald-600">Payment</p>
                <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  <ShieldCheck size={12} />
                  secure
                </span>
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                {paymentOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`text-left rounded-2xl border px-4 py-3 transition text-sm ${
                      paymentMethod === option.id
                        ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                        : "border-gray-200 text-gray-600 hover:border-emerald-200"
                    }`}
                    onClick={() => setPaymentMethod(option.id)}
                  >
                    <p className="font-semibold">{option.label}</p>
                    <p className="text-[11px] text-gray-400">{option.description}</p>
                  </button>
                ))}
              </div>

              {paymentMethod === "fpx" && (
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.5em] text-emerald-600">FPX banks</p>
                  <div className="grid md:grid-cols-3 gap-2">
                    {fpxBanks.map((bank) => {
                      const isActive = selectedBank === bank.name
                      return (
                        <button
                          key={bank.name}
                          className={`flex items-center gap-3 rounded-2xl border px-4 py-2.5 text-left transition ${
                            isActive ? "text-emerald-900" : "text-gray-600 hover:border-emerald-200"
                          }`}
                          style={
                            isActive
                              ? { borderColor: bank.accent, backgroundColor: `${bank.accent}1a` }
                              : { borderColor: "#e5e7eb" }
                          }
                          onClick={() => setSelectedBank(bank.name)}
                        >
                          <span
                            className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold uppercase"
                            style={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", color: bank.accent }}
                          >
                            {bank.short.slice(0, 3)}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{bank.name}</p>
                            <p className="text-xs uppercase text-gray-400 tracking-wide">{bank.short}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/80 bg-white shadow-[0_20px_60px_rgba(7,27,17,0.15)] p-8 space-y-6 sticky top-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Subtotal</span>
                <span className="text-lg font-semibold">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Service Fee</span>
                <span>RM 0.00</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Pickup Charge</span>
                <span>Free</span>
              </div>
              <div className="border-t border-dashed border-gray-200 pt-4 flex items-center justify-between text-lg font-semibold">
                <span>Total due</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <Button className="w-full h-14 text-base bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handlePay}>
                Pay Now
              </Button>
              <p className="text-xs text-center text-gray-500">
                By proceeding you agree to pay at pickup or via the selected method. Orders remain saved even after refresh.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
