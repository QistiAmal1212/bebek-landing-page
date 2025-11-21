import { useEffect, useState } from "react"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SimpleMarquee } from "@/components/ui/simple-marquee"
import { BubbleBackground } from "@/components/ui/bubble-background"

type MenuSet = {
  id: number
  name: string
  description: string
  portion: string
  price: number
  includes: string[]
  sambal: string[]
  image: string
  fallback: string
}

export default function MenuPage() {
  const [cart, setCart] = useState<Array<{ id: number; name: string; price: number; quantity: number }>>([])
  const [cartInitialized, setCartInitialized] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartAcknowledged, setCartAcknowledged] = useState(false)

  const heroImg = "/images/nasi-bebek-hero.png"
  const heroFallback = "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80&sat=-15"
  const sambalOptions = [
    { name: "Sambal Ijo", note: "Fresh green chili, lime leaf & lemongrass" },
    { name: "Sambal Matah", note: "Bali style shallot relish with torch ginger" },
    { name: "Sambal Hitam", note: "Slow-cooked black sambal with belimbing wuluh" },
    { name: "Sambal Korek", note: "Fiery raw chili, garlic & hot oil" },
  ]
  const bebekSets: MenuSet[] = [
    {
      id: 1,
      name: "Set Bebek A",
      description: "",
      portion: "1 Pax",
      price: 17,
      includes: ["Nasi", "Bebek", "Sup", "kicap", "jukut goreng"],
      sambal: ["Sambal Korek"],
      image: heroImg,
      fallback: heroFallback,
    },
    {
      id: 2,
      name: "Set Bebek B",
      description: "",
      portion: "1 Pax",
      price: 18,
      includes: ["Nasi", "Bebek", "Sup", "kicap", "jukut goreng"],
      sambal: ["Sambal Hitam", "Sambal Hijau"],
      image: heroImg,
      fallback: heroFallback,
    },
    {
      id: 3,
      name: "Set Bebek C",
      description: "",
      portion: "1 Pax",
      price: 19,
      includes: ["Nasi", "Bebek", "Sup", "kicap", "jukut goreng"],
      sambal: ["Sambal uleg", "Sambal Hitam"],
      image: heroImg,
      fallback: heroFallback,
    },
    {
      id: 4,
      name: "Set Bebek D",
      description: "",
      portion: "1 Pax",
      price: 20,
      includes: ["Nasi", "Bebek", "Sup", "kicap", "jukut goreng"],
      sambal: ["Sambal Ijo", "Sambal Korek", "Sambal Matah"],
      image: heroImg,
      fallback: heroFallback,
    },
  ]

  const ayamSets: MenuSet[] = [
    {
      id: 101,
      name: "Set Ayam Kampung A",
      description: "",
      portion: "1 Pax",
      price: 69,
      includes: ["Nasi", "Ayam Kampung", "Sup", "kicap", "jukut goreng"],
      sambal: ["Sambal Ijo"],
      image: heroImg,
      fallback: heroFallback,
    },
    {
      id: 102,
      name: "Set Ayam Kampung B",
      description: "",
      portion: "1 Pax",
      price: 72,
      includes: ["Nasi", "Ayam Kampung", "Sup", "kicap", "jukut goreng"],
      sambal: ["Sambal Matah"],
      image: heroImg,
      fallback: heroFallback,
    },
    {
      id: 103,
      name: "Set Ayam Kampung C",
      description: "",
      portion: "2 Pax",
      price: 135,
      includes: ["Nasi", "Ayam Kampung", "Sup", "kicap", "jukut goreng"],
      sambal: ["Sambal Hitam"],
      image: heroImg,
      fallback: heroFallback,
    },
    {
      id: 104,
      name: "Set Ayam Kampung D",
      description: "",
      portion: "2 Pax",
      price: 145,
      includes: ["Nasi", "Ayam Kampung", "Sup", "kicap", "jukut goreng"],
      sambal: ["Sambal Korek"],
      image: heroImg,
      fallback: heroFallback,
    },
  ]

  const menuSections = [
    {
      title: "Set Bebek Top Global",
      tagline: "Signature Bebek packages curated for every group size. Each set comes with the full sambal quartet.",
      sets: bebekSets,
    },
    {
      title: "Set Ayam Kampung Sambal Pilihan",
      tagline: "Free-range kampung chicken with your favorite sambal spotlight.",
      sets: ayamSets,
    },
  ]

  const navigate = useNavigate()

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("ms-MY", { style: "currency", currency: "MYR", minimumFractionDigits: 2 }).format(value)

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("bebek-cart")
      if (storedCart) setCart(JSON.parse(storedCart))
    } finally {
      setCartInitialized(true)
    }
  }, [])

  useEffect(() => {
    if (!cartInitialized) return
    localStorage.setItem("bebek-cart", JSON.stringify(cart))
  }, [cart, cartInitialized])

  const addToCart = (item: { id: number; name: string; price: number }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleAddSet = (set: MenuSet) => {
    addToCart({ id: set.id, name: set.name, price: set.price })
  }

  const closeCart = () => {
    setIsCartOpen(false)
    setCartAcknowledged(false)
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Background Bubbles */}
      <BubbleBackground />

      {/* Header */}
      <header className="bg-white shadow-sm py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <RouterLink to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ x: -5 }}
              className="bg-green-50 rounded-full p-2 transition-colors duration-300 group-hover:bg-green-100"
            >
              <ArrowLeft size={20} className="text-green-600" />
            </motion.div>
            <span className="font-medium text-gray-700 group-hover:text-green-600 transition-colors duration-300">
              Back to Home
            </span>
          </RouterLink>

          <div className="flex items-center gap-3">
            <motion.button whileTap={{ scale: 0.95 }} className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart size={24} className="text-green-600" />
              {getTotalItems() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center
                  justify-center"
                >
                  {getTotalItems()}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Marquee Banner */}
      <div className="bg-green-700 text-white py-6 overflow-hidden">
        <SimpleMarquee speed={10} className="font-bold" fontSize="text-3xl md:text-4xl">
          {["BEBEK", "AYAM KAMPUNG", "TALAPIA", "KELI", "RICA-RICA", "INDONESIAN-DISH"].map((word, index) => (
            <span key={index} className="mx-6 uppercase">
              {word}
            </span>
          ))}
        </SimpleMarquee>
      </div>

      {/* Menu Content will go here */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-[0.3em] text-green-600 uppercase mb-3">Bebek Top Global Menu</p>
          <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-4">Our Delicious Menu</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pilih paket bebek atau ayam kampung favorit dan nikmati empat sambal khas kami: ijo, matah, hitam, dan korek.
            Semua disajikan dengan nasi hangat, lalapan, serta pelengkap khas Nusantara.
          </p>
        </div>

        <div className="mb-16" />

        {menuSections.map((section) => (
          <section key={section.title} className="mb-16">
            <div className="mb-6" />
            <div className="grid md:grid-cols-2 gap-8">
              {section.sets.map((set) => (
                <motion.article
                  key={set.id}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(15,23,42,0.08)] border border-gray-100 flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={set.image}
                      alt={set.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null
                        event.currentTarget.src = set.fallback
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <span className="absolute top-4 left-4 bg-white/90 text-green-700 text-xs font-semibold px-3 py-1 rounded-full tracking-[0.2em] uppercase">
                      {set.portion}
                    </span>
                    <span className="absolute top-4 right-4 bg-green-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                      {formatPrice(set.price)}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{set.name}</h3>
                    <p className="text-gray-600 mb-4 flex-1">{set.description}</p>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      {set.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-green-500"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {set.sambal.map((sambal) => (
                        <span
                          key={`${set.id}-${sambal}`}
                          className="text-xs font-semibold uppercase tracking-widest bg-green-50 text-green-700 px-3 py-1 rounded-full"
                        >
                          {sambal}
                        </span>
                      ))}
                    </div>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleAddSet(set)}
                    >
                      Add to Order
                    </Button>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        ))}
      </div>
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-green-600">Your Order</p>
                  <h3 className="text-xl font-semibold text-gray-900">{getTotalItems()} item(s)</h3>
                </div>
                <button className="text-sm font-semibold text-green-600 hover:text-green-700" onClick={closeCart}>
                  Close
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center text-gray-500 py-10">
                    Add your favorite sets to start feasting!
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="border border-gray-100 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">{formatPrice(item.price)}</p>
                        </div>
                        <button
                          className="text-xs uppercase tracking-[0.3em] text-red-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-gray-300">
                          <button
                            className="px-3 py-1 text-lg"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="px-4 text-sm font-semibold">{item.quantity}</span>
                          <button
                            className="px-3 py-1 text-lg"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <p className="text-base font-semibold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="px-6 py-4 border-t border-gray-100 space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">{formatPrice(getTotalPrice())}</span>
                </div>
                <label className="flex items-start gap-3 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    checked={cartAcknowledged}
                    onChange={(e) => setCartAcknowledged(e.target.checked)}
                  />
                  <span>I&rsquo;m ready to proceed to checkout with the selected sets.</span>
                </label>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled={!cartAcknowledged || cart.length === 0}
                  onClick={() => {
                    if (cart.length === 0) return
                    closeCart()
                    navigate("/checkout")
                  }}
                >
                  Continue to Checkout
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
