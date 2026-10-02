import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import "./ProductCarousel.css";

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 2499,
    oldPrice: 3999,
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 2,
    name: "Classic Running Sneakers",
    category: "Fashion",
    price: 1999,
    oldPrice: 2999,
    rating: 4.7,
    reviews: 98,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 3,
    name: "Modern Smart Watch",
    category: "Electronics",
    price: 3499,
    oldPrice: 4999,
    rating: 4.9,
    reviews: 186,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 4,
    name: "Minimal Leather Backpack",
    category: "Accessories",
    price: 1299,
    oldPrice: 1999,
    rating: 4.6,
    reviews: 76,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 5,
    name: "Classic Denim Jacket",
    category: "Fashion",
    price: 1799,
    oldPrice: 2499,
    rating: 4.5,
    reviews: 64,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 6,
    name: "Wireless Bluetooth Speaker",
    category: "Electronics",
    price: 1599,
    oldPrice: 2299,
    rating: 4.7,
    reviews: 91,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 7,
    name: "Travel Backpack",
    category: "Accessories",
    price: 1499,
    oldPrice: 2199,
    rating: 4.6,
    reviews: 83,
    image:
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 8,
    name: "Smart Fitness Watch",
    category: "Electronics",
    price: 2899,
    oldPrice: 3999,
    rating: 4.8,
    reviews: 143,
    image:
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 9,
    name: "Premium Casual T-Shirt",
    category: "Fashion",
    price: 799,
    oldPrice: 1299,
    rating: 4.5,
    reviews: 112,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 10,
    name: "Modern Sunglasses",
    category: "Accessories",
    price: 999,
    oldPrice: 1599,
    rating: 4.4,
    reviews: 87,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85",
  },
];

function ProductCarousel() {
  const sliderRef = useRef(null);

  const slideLeft = () => {
    sliderRef.current?.scrollBy({
      left: -900,
      behavior: "smooth",
    });
  };

  const slideRight = () => {
    sliderRef.current?.scrollBy({
      left: 900,
      behavior: "smooth",
    });
  };

  return (
    <div className="product-carousel">
      <button
        className="carousel-arrow carousel-left"
        onClick={slideLeft}
        aria-label="Previous products"
      >
        <ChevronLeft size={25} />
      </button>

      <div className="product-carousel-track" ref={sliderRef}>
        {products.map((product) => (
          <div className="carousel-product" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <button
        className="carousel-arrow carousel-right"
        onClick={slideRight}
        aria-label="Next products"
      >
        <ChevronRight size={25} />
      </button>
    </div>
  );
}

export default ProductCarousel;