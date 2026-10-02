
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  Package,
  MessageCircle,
  House,
  Laptop,
  Shirt,
  Dumbbell,
  Watch,
  Sparkles,
  CookingPot,
  ShoppingBasket,
  X,
} from "lucide-react";
import "./Navbar.css";

const categories = [
  { name: "Home", icon: House },
  { name: "Electronics", icon: Laptop },
  { name: "Fashion", icon: Shirt },
  { name: "Sports", icon: Dumbbell },
  { name: "Accessories", icon: Watch },
  { name: "Beauty", icon: Sparkles },
  { name: "Appliances", icon: CookingPot },
  { name: "Grocery", icon: ShoppingBasket },
];

export default function Navbar({ cartCount = 0 }) {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();

    const query = searchText.trim();

    if (!query) {
      navigate("/products");
      return;
    }

    navigate(`/products?search=${encodeURIComponent(query)}`);
  }

  function selectCategory(category) {
    if (category === "Home") {
      navigate("/");
    } else {
      navigate(`/products?category=${encodeURIComponent(category)}`);
    }
  }

  return (
    <>
      <header className="shop-navbar">
        <div className="shop-navbar-container">
          <Link to="/" className="shop-logo">
            <span className="shop-logo-icon">S</span>
            <span>
              SHOP<span className="logo-highlight">ZONE</span>
              <small>Find your everyday favourites</small>
            </span>
          </Link>

          <form className="shop-search" onSubmit={handleSearch}>
            <Search size={21} />

            <input
              type="search"
              placeholder="Search for products, brands and more..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              aria-label="Search products"
            />

            {searchText && (
              <button
                type="button"
                className="search-clear"
                aria-label="Clear search"
                onClick={() => setSearchText("")}
              >
                <X size={17} />
              </button>
            )}

            <button type="submit" className="search-submit">
              Search
            </button>
          </form>

          <nav className="shop-actions">
            <Link to="/orders" className="shop-action">
              <Package size={20} />
              <span>Orders</span>
            </Link>

            <Link
              to="/wishlist"
              className="shop-action"
              aria-label="Wishlist"
            >
              <Heart size={21} />
              <span>Wishlist</span>
            </Link>

            <Link to="/cart" className="shop-action cart-action">
              <span className="cart-icon-wrap">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="cart-count">{cartCount}</span>
                )}
              </span>
              <span>Cart</span>
            </Link>

            <Link to="/feedback" className="shop-action feedback-action">
              <MessageCircle size={20} />
              <span>Feedback</span>
            </Link>
          </nav>
        </div>
      </header>

      <nav className="category-navbar" aria-label="Product categories">
        <div className="category-navbar-inner">
          {categories.map(({ name, icon: Icon }) => (
            <button
              type="button"
              key={name}
              className="category-shortcut"
              onClick={() => selectCategory(name)}
            >
              <span className="category-shortcut-icon">
                <Icon size={22} strokeWidth={1.7} />
              </span>
              <span>{name}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}