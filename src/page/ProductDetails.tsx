import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { productList } from "../data";
import { useCartStore } from "../store/useCartStore";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const product = productList.find((p) => p.id === id) || productList[0];
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="flex-1 flex justify-center">
          <img
            src={product.imageURL}
            alt={product.title}
            className="w-full max-w-md rounded-2xl shadow-lg object-cover"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <span className="bg-gray-100 px-3 py-1 text-sm rounded-lg text-gray-600">
              {product.category.name}
            </span>
          </div>

          <p className="text-gray-600 mb-4">{product.description}</p>

          <h2 className="text-2xl font-semibold mb-4">
            ${parseFloat(product.price).toFixed(2)}
          </h2>

          {/* Colors */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Available Colors</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition ${
                    selectedColor === color
                      ? "border-blue-600 scale-110"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="w-full md:w-auto bg-blue-600 text-white py-3 px-8 rounded-xl font-semibold text-lg shadow hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>

          <div className="mt-6">
            <Link
              to="/products"
              className="text-blue-600 hover:text-blue-800 font-medium underline"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
