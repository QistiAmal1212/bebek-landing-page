import { useEffect, useRef, useState } from "react"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SimpleMarquee } from "@/components/ui/simple-marquee"
import { PatternBackground } from "@/components/ui/pattern-background"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import { FloatingElements } from "@/components/ui/floating-elements"
import { BubbleBackground } from "@/components/ui/bubble-background"

export default function Home() {
  const navigateRouter = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(heroScrollProgress, [0, 1], [1, 0])
  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 0.8])
  const heroY = useTransform(heroScrollProgress, [0, 1], [0, 100])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Gallery", id: "gallery" },
    { name: "Contact", id: "contact" },
    { name: "Menu", href: "/menu" },
  ]
  const heroImage = "/images/nasi-bebek-hero.png"
  const heroFallback =
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80&sat=-15"
  const testimonials = [
    {
      name: "Sarah L.",
      quote: "The duck dishes at Bebeks are absolutely amazing! The flavors are authentic and the service is excellent.",
      rating: 5,
    },
    {
      name: "Michael T.",
      quote: "Best Indonesian food I've had outside of Indonesia. The Bebek Special is a must-try for anyone visiting.",
      rating: 5,
    },
    { name: "Jessica R.", quote: "Great atmosphere, friendly staff, and delicious food. I'll definitely be back for more!", rating: 4 },
    {
      name: "Andre W.",
      quote: "We hosted a family dinner here and everyone loved the crispy duck and sambal. Truly memorable!",
      rating: 5,
    },
    {
      name: "Layla P.",
      quote: "The spice level was perfect and the presentation was stunning. This place feels like a hidden gem.",
      rating: 5,
    },
    {
      name: "Hannah S.",
      quote: "Fast service, friendly team, and the rice portions were generous. Highly recommended.",
      rating: 4,
    },
    {
      name: "Darius M.",
      quote: "I tried the seasonal menu and every dish felt carefully crafted. Can't wait to try more.",
      rating: 5,
    },
    {
      name: "Olivia K.",
      quote: "The sambal matah transported me right back to Bali. Fresh ingredients and bold flavors.",
      rating: 5,
    },
    {
      name: "Ravi P.",
      quote: "Even on a busy night the quality stays high. Crispy skin, juicy meat, and thoughtful sides.",
      rating: 5,
    },
  ]
  const featuredDishes = [
    {
      title: "BEBEK",
      description: "Crispy duck over warm rice with sambal ijo, lalapan, and kremesan.",
      image: "/images/nasi-bebek-sambal-ijo.png",
      fallback: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=1200&q=80&sat=-12",
      imagePosition: "center",
    },
    {
      title: "AYAM KAMPUNG",
      description: "Grilled kampung chicken finished with sambal matah, urap, and pandan rice.",
      image: "/images/nasi-bebek-sambal-matah.png",
      fallback: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80&sat=-10",
      imagePosition: "center top",
    },
    {
      title: "KELI / TALAPIA",
      description: "Spicy Manado-style rica-rica sauce over fried talapia or keli with lime.",
      image: "/images/nasi-bebek-bakar.png",
      fallback: "https://images.unsplash.com/photo-1608039829405-d38d22f6d6f3?auto=format&fit=crop&w=1200&q=80&sat=-15",
      imagePosition: "center bottom",
    },
  ]
  const galleryImages = [
    {
      src: "/images/nasi-bebek-gallery-1.png",
      fallback: "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1200&q=80&sat=-12",
      alt: "Nasi Bebek complete with sambal ijo",
      position: "center",
    },
    {
      src: "/images/nasi-bebek-gallery-2.png",
      fallback: "https://images.unsplash.com/photo-1589307004173-3c95204d00b3?auto=format&fit=crop&w=1200&q=80&sat=-12",
      alt: "Nasi Bebek sambal matah plating",
      position: "center",
    },
    {
      src: "/images/nasi-bebek-gallery-3.png",
      fallback: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80&sat=-10",
      alt: "Close up of crispy duck skin and sambal terasi",
      position: "center bottom",
    },
  ]
  const customerMoments = [
    {
      caption: "Family feast after Sunday service",
      tag: "@jakartacraves",
      image: "https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=900&q=80&sat=-12",
      fallback: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80&sat=-12",
      position: { x: -90, y: 20, rotate: -15, z: 70 },
      scale: 0.95,
    },
    {
      caption: "Lunch rush with the OG Bebeks crew",
      tag: "@culinarydarlings",
      image: "https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=900&q=80&sat=-12",
      fallback: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80&sat=-12",
      position: { x: -30, y: -10, rotate: -5, z: 60 },
      scale: 1.02,
    },
    {
      caption: "Chef's table sambal workshop",
      tag: "@spicythings",
      image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=900&q=80&sat=-12",
      fallback: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80&sat=-12",
      position: { x: 40, y: 0, rotate: 2, z: 55 },
      scale: 1.05,
    },
    {
      caption: "Friends night out in the patio",
      tag: "@nightmarketnotes",
      image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=900&q=80&sat=-12",
      fallback: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=900&q=80&sat=-12",
      position: { x: 90, y: 40, rotate: 10, z: 50 },
      scale: 0.98,
    },
    {
      caption: "Street-style plating challenge winners",
      tag: "@foodfestivalsg",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80&sat=-12",
      fallback: "https://images.unsplash.com/photo-1525171254930-643fc658b64e?auto=format&fit=crop&w=900&q=80&sat=-12",
      position: { x: -50, y: 180, rotate: -8, z: 45 },
      scale: 0.97,
    },
    {
      caption: "Corporate lunch takeover",
      tag: "@startupchow",
      image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80&sat=-12",
      fallback: "https://images.unsplash.com/photo-1447078806655-40579c2520d6?auto=format&fit=crop&w=900&q=80&sat=-12",
      position: { x: 30, y: 190, rotate: 6, z: 40 },
      scale: 0.93,
    },
    {
      caption: "Surprise proposal with duck feast",
      tag: "@loveandspice",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80&sat=-12",
      fallback: "https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=900&q=80&sat=-12",
      position: { x: -100, y: 260, rotate: -3, z: 35 },
      scale: 0.9,
    },
  ]
  const testimonialColumns = [0, 1, 2].map((columnIndex) =>
    testimonials.filter((_, index) => index % 3 === columnIndex),
  )
  const mobileTestimonialRows = Array.from({ length: 4 }, (_, columnIndex) =>
    testimonials.filter((_, index) => index % 4 === columnIndex),
  )

  return (
    <div className="min-h-screen bg-white relative">
      {/* Background Bubbles */}
      <BubbleBackground />

      {/* Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrollY > 50 ? "bg-white/90 backdrop-blur-sm shadow-sm py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bebk-j74VP9pg8DV1NLEU26ubhAQb5wRQYK.jpeg"
              alt="Bebeks Logo"
              width={45}
              height={45}
              className="object-contain w-11 h-11"
              loading="lazy"
            />
            <span className={`font-playfair font-bold text-2xl ${scrollY > 50 ? "text-green-600" : "text-white"}`}>
              Bebeks
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {menuItems.map((item, index) => {
              const linkClasses = `${
                scrollY > 50 ? "text-gray-700" : "text-white"
              } hover:text-green-500 transition-colors font-medium tracking-wide text-sm uppercase relative group`
              return (
                <motion.div
                  key={item.id || item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.href ? (
                    <RouterLink to={item.href} className={linkClasses}>
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                    </RouterLink>
                  ) : (
                    <a
                      href={`#${item.id}`}
                      className={linkClasses}
                      onClick={() => item.id && setActiveSection(item.id)}
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  )}
                </motion.div>
              )
            })}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <RouterLink to="/menu">
                <AnimatedGradientBorder borderWidth={1} borderRadius="0.25rem">
                  <Button className="bg-green-600 hover:bg-green-700 text-white text-sm uppercase tracking-wider px-6">
                    Order Now
                  </Button>
                </AnimatedGradientBorder>
              </RouterLink>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`md:hidden ${scrollY > 50 ? "text-green-600" : "text-white"}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-sm"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                {menuItems.map((item) =>
                  item.href ? (
                    <RouterLink
                      key={item.href}
                      to={item.href}
                      className="text-gray-700 hover:text-green-500 transition-colors font-medium py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </RouterLink>
                  ) : (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="text-gray-700 hover:text-green-500 transition-colors font-medium py-2"
                      onClick={() => {
                        item.id && setActiveSection(item.id)
                        setIsMenuOpen(false)
                      }}
                    >
                      {item.name}
                    </a>
                  ),
                )}
                <RouterLink to="/menu" className="w-full">
                  <Button className="bg-green-600 hover:bg-green-700 text-white w-full">Order Now</Button>
                </RouterLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0 min-h-screen" style={{ opacity: heroOpacity, y: heroY }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-green-900/60 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.25),_transparent_60%)] mix-blend-screen opacity-70 z-10 pointer-events-none" />
          <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }}>
            <img
              src={heroImage}
              alt="Bebeks Hero"
              className="object-cover filter brightness-90 w-full h-full min-h-screen"
              loading="eager"
              onError={(event) => {
                event.currentTarget.onerror = null
                event.currentTarget.src = heroFallback
              }}
            />
          </motion.div>
        </motion.div>

        <FloatingElements count={20} elementType="circle" className="absolute inset-0 z-10 pointer-events-none" />

        <div className="container mx-auto px-4 z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            style={{ scale: heroScale }}
            className="max-w-3xl mx-auto bg-black/30 backdrop-blur-sm p-8 md:p-12 rounded-sm border border-white/10"
          >
            <motion.div
              className="mb-6 mx-auto w-20 h-20 relative"
              animate={{
                rotateZ: [0, 10, 0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bebk-j74VP9pg8DV1NLEU26ubhAQb5wRQYK.jpeg"
                alt="Bebeks Logo"
                className="object-contain w-full h-full"
                loading="lazy"
              />
            </motion.div>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Experience Authentic <span className="text-green-300 italic">Nasi Bebek</span> & Sambal
            </h1>
            <div className="w-24 h-px bg-green-400 mx-auto my-6 classic-divider"></div>
            <p className="text-xl text-white/90 mb-8 font-light tracking-wide">
              From sambal ijo to sambal matah, every crispy duck plate is paired with steaming rice and house-made
              relishes.
            </p>
            <RouterLink to="/menu">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg relative overflow-hidden group">
                  <span className="relative z-10">View Our Menu</span>
                  <span className="absolute inset-0 bg-green-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </Button>
              </motion.div>
            </RouterLink>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white z-20"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* First Marquee Banner */}
      <div className="bg-green-600 text-white py-6 overflow-hidden">
        <SimpleMarquee speed={10} className="font-bold" fontSize="text-3xl md:text-4xl">
          {["BEBEK", "AYAM KAMPUNG", "TALAPIA", "KELI", "RICA-RICA", "INDONESIAN-DISH"].map((word, index) => (
            <span key={index} className="mx-6 uppercase">
              {word}
            </span>
          ))}
        </SimpleMarquee>
      </div>

      {/* About Section moved below menu */}

      {/* Featured Dishes Section */}
      <section className="py-20 bg-[#f8f8f5] relative overflow-hidden">
        <PatternBackground patternType="waves" patternColor="#22c55e" patternOpacity={0.03} animate={true}>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-playfair text-3xl md:text-5xl font-bold text-gray-800 mb-4">Featured Dishes</h2>
              <div className="w-32 h-px bg-green-500 mx-auto mb-8 classic-divider"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A preview of our most popular dishes. Visit our menu page to see our full selection.
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-8 justify-center">
              {featuredDishes.map((dish, index) => {
                const positionOffset = index === 0 ? -20 : index === featuredDishes.length - 1 ? 20 : 0
                return (
                  <motion.div
                    key={dish.title}
                    initial={{ opacity: 0, x: positionOffset, y: index === 1 ? 20 : 0 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="relative overflow-hidden rounded-lg shadow-lg max-w-sm cursor-pointer"
                    onClick={() => navigateRouter("/menu")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        navigateRouter("/menu")
                      }
                    }}
                  >
                    <img
                      src={dish.image}
                      alt={dish.title}
                      className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110"
                      style={dish.imagePosition ? { objectPosition: dish.imagePosition } : undefined}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null
                        event.currentTarget.src = dish.fallback
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-6">
                        <h3 className="font-playfair text-xl font-bold text-white">{dish.title}</h3>
                        <p className="text-white/80 text-sm">{dish.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-14">
              <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm border border-green-200/70 rounded-[40px] px-6 py-4 md:px-10 md:py-6 flex flex-col md:flex-row items-center gap-6 shadow-lg">
                <div className="flex-1 text-center md:text-left">
                  <p className="text-sm uppercase tracking-[0.3em] text-green-600 mb-2">Hungry For More?</p>
                  <h3 className="text-2xl font-playfair text-gray-900">
                    Explore every sambal, seasoning, and side on our full menu.
                  </h3>
                </div>
                <RouterLink to="/menu" className="flex-shrink-0 w-full md:w-auto">
                  <Button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white text-base font-semibold px-8 py-4 rounded-[30px] shadow-[0_15px_35px_rgba(34,197,94,0.35)] transition-transform hover:-translate-y-0.5">
                    View Full Menu
                  </Button>
                </RouterLink>
              </div>
            </div>

          </div>
        </PatternBackground>
      </section>

     

      {/* Second Marquee Banner */}
      <div className="bg-green-700 text-white py-6 overflow-hidden">
        <SimpleMarquee speed={10} className="font-bold" fontSize="text-3xl md:text-4xl">
          {["BEBEK", "AYAM KAMPUNG", "TALAPIA", "KELI", "RICA-RICA", "INDONESIAN-DISH"].map((word, index) => (
            <span key={index} className="mx-6 uppercase">
              {word}
            </span>
          ))}
        </SimpleMarquee>
      </div>

      {/* Testimonials */}
      <PatternBackground
        patternType="circles"
        patternColor="#22c55e"
        patternOpacity={0.03}
        className="py-20 bg-green-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto mb-8"></div>
          </motion.div>

          {/* Mobile: four marquee rows with multiple cards visible */}
          <div className="flex flex-col gap-6 md:hidden">
            {mobileTestimonialRows.map((row, rowIndex) => {
              const mobileDirection = rowIndex % 2 === 0 ? "animate-marquee-left" : "animate-marquee-right"
              return (
                <div key={`mobile-row-${rowIndex}`} className="relative overflow-hidden rounded-2xl">
                  <div
                    className={`flex gap-4 flex-row flex-nowrap w-[200%] ${mobileDirection}`}
                    style={{ animationDuration: `${22 + rowIndex * 3}s` }}
                  >
                    {[...row, ...row].map((testimonial, index) => (
                      <motion.div
                        key={`mobile-${rowIndex}-${index}-${testimonial.name}`}
                        whileHover={{
                          y: -5,
                          boxShadow:
                            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        }}
                        className="bg-white p-8 rounded-xl shadow-md transition-all duration-300 flex-shrink-0 w-[65%] max-w-sm"
                      >
                        <div className="flex items-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <motion.svg
                              key={`mobile-star-${rowIndex}-${index}-${testimonial.name}-${i}`}
                              className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539 0z" />
                            </motion.svg>
                          ))}
                        </div>
                        <p className="text-gray-600 mb-4 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Desktop: animated columns */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {testimonialColumns.map((column, columnIndex) => {
              const isReverse = columnIndex === 1
              return (
                <div key={columnIndex} className="relative h-[520px] overflow-hidden rounded-2xl">
                  <div
                    className={`flex gap-6 flex-row md:flex-col min-w-[200%] md:min-w-full ${
                      isReverse ? "animate-marquee-right md:animate-marquee-up" : "animate-marquee-left md:animate-marquee-down"
                    }`}
                    style={{ animationDuration: `${20 + columnIndex * 3}s` }}
                  >
                    {[...column, ...column].map((testimonial, index) => (
                      <motion.div
                        key={`${columnIndex}-${index}-${testimonial.name}`}
                        whileHover={{
                          y: -5,
                          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        }}
                        className="bg-white p-8 rounded-xl shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <motion.svg
                              key={`${testimonial.name}-${i}-${index}`}
                              className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539 0z" />
                            </motion.svg>
                          ))}
                        </div>
                        <p className="text-gray-600 mb-4 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </PatternBackground>
    </div>
  )
}
