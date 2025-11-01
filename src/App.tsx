import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProductList from "./page/ProductList";
import ProductDetailsPage from "./page/ProductDetails";
import Navbar from "./components/layout/navbar";

const App = () => {
  return (
    <main className="p-10">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
