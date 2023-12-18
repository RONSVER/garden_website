import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import OrderPage from "./pages/OrderPage";
import AllProductsSalesPage from "./pages/AllProductsSalesPage";
import AllCategoriesPage from "./pages/AllCategoriesPage";
import AllProductsByCategoriesPage from "./pages/AllProductsByCategoriesPage";
import AllProducts from "./pages/AllProducts";
import CartPage from "./pages/CartPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/categories" element={<AllCategoriesPage />} />
        <Route path="/products/:id" element={<OrderPage />} />
        <Route path="/sales" element={<AllProductsSalesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/categories/:id"
          element={<AllProductsByCategoriesPage />}
        />
        <Route path="/products" element={<AllProducts />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
