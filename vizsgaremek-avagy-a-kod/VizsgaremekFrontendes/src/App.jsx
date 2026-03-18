
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";


import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ShippingPage from "./pages/ShippingPage";
import ComplaintPage from "./pages/ComplaintPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app-root">
          <Header />
          <main className="site-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />

              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route path="/admin" element={<AdminPage />} />

              <Route path="/aszf" element={<TermsPage />} />
              <Route path="/adatvedelem" element={<PrivacyPage />} />
              <Route path="/szallitas" element={<ShippingPage />} />
              <Route path="/reklamacio" element={<ComplaintPage />} />
              <Route path="/rolunk" element={<AboutPage />} />
              <Route path="/kapcsolat" element={<ContactPage />} />

            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
