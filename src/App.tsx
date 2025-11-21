import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import MenuPage from "./pages/Menu"
import CheckoutPage from "./pages/Checkout"
import ReceiptPage from "./pages/Receipt"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/receipt" element={<ReceiptPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
