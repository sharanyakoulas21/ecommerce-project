import { useEffect, useMemo, useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Invoice from "./components/Invoice";
import API_URL from "./api";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const searchText = search.toLowerCase();

      const matchesSearch =
        product.name?.toLowerCase().includes(searchText) ||
        product.category?.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, search]);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * item.quantity,
    0
  );

  function handleAddToCart(product) {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }

  function handleRemove(id) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  }

  function handleIncrease(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  function handleDecrease(id) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handlePlaceOrder(customerDetails) {
    setCustomer(customerDetails);
    setOrderPlaced(true);
    setShowCheckout(false);
  }

  function handleContinueShopping() {
    setOrderPlaced(false);
    setCustomer(null);
    setCart([]);
    setSelectedCategory("All");
    setSearch("");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (orderPlaced) {
    return (
      <div className="invoice-page">
        <Invoice
          customer={customer}
          cart={cart}
        />

        <button
          className="continue-shopping-btn"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-container">

          <div className="logo">
            <span className="logo-icon">🛍️</span>
            <span>ShopEase</span>
          </div>

          <div className="search-box">
            <span>🔎</span>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <div className="nav-cart">
            <span className="cart-icon">🛒</span>

            <div>
              <small>Cart</small>
              <strong>{cartCount} items</strong>
            </div>
          </div>

        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">

          <span className="hero-badge">
            ✨ New Collection
          </span>

          <h1>
            Discover Products
            <br />
            You'll Love.
          </h1>

          <p>
            Shop the latest products at amazing prices.
            Quality products, simple shopping and fast
            delivery.
          </p>

          <button
            className="hero-button"
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Shop Now →
          </button>

        </div>

        <div className="hero-image">
          <div className="hero-circle">
            🛍️
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="main-container">

        {/* CATEGORIES */}
        <section className="category-section">

          <div className="section-heading">
            <div>
              <span className="section-label">
                EXPLORE
              </span>

              <h2>Shop by Category</h2>
            </div>
          </div>

          <div className="categories">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  selectedCategory === category
                    ? "category-btn active"
                    : "category-btn"
                }
                onClick={() =>
                  setSelectedCategory(category)
                }
              >
                {category === "All" && "✨ "}
                {category}
              </button>
            ))}
          </div>

        </section>

        {/* PRODUCTS */}
        <section
          className="products-section"
          id="products"
        >
          <div className="section-heading products-heading">

            <div>
              <span className="section-label">
                OUR PRODUCTS
              </span>

              <h2>
                {selectedCategory === "All"
                  ? "Featured Products"
                  : selectedCategory}
              </h2>
            </div>

            <span className="product-count">
              {filteredProducts.length} products
            </span>

          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-products">
              <div>🔍</div>
              <h3>No products found</h3>
              <p>
                Try another search or category.
              </p>
            </div>
          ) : (
            <ProductList
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          )}
        </section>

        {/* CART */}
        <section className="cart-section">

          <div className="section-heading">
            <div>
              <span className="section-label">
                YOUR SHOPPING BAG
              </span>

              <h2>Your Cart</h2>
            </div>

            {cart.length > 0 && (
              <div className="cart-total-top">
                ₹{cartTotal.toFixed(2)}
              </div>
            )}
          </div>

          <Cart
            cart={cart}
            onRemove={handleRemove}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />

          {cart.length > 0 && !showCheckout && (
            <div className="checkout-area">

              <div>
                <span>Subtotal</span>
                <strong>
                  ₹{cartTotal.toFixed(2)}
                </strong>
              </div>

              <button
                className="checkout-button"
                onClick={() =>
                  setShowCheckout(true)
                }
              >
                Proceed to Checkout →
              </button>

            </div>
          )}

          {showCheckout && (
            <div className="checkout-wrapper">
              <Checkout
                cart={cart}
                onPlaceOrder={handlePlaceOrder}
              />
            </div>
          )}

        </section>

      </main>

      {/* FEATURES */}
      <section className="features">

        <div className="feature">
          <span>🚚</span>
          <div>
            <h3>Fast Delivery</h3>
            <p>Quick delivery to your doorstep</p>
          </div>
        </div>

        <div className="feature">
          <span>🔒</span>
          <div>
            <h3>Secure Payment</h3>
            <p>Your payment is always protected</p>
          </div>
        </div>

        <div className="feature">
          <span>↩️</span>
          <div>
            <h3>Easy Returns</h3>
            <p>Simple and hassle-free returns</p>
          </div>
        </div>

        <div className="feature">
          <span>💬</span>
          <div>
            <h3>24/7 Support</h3>
            <p>We're here whenever you need us</p>
          </div>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="footer">

        <div className="footer-content">

          <div>
            <div className="logo footer-logo">
              <span>🛍️</span>
              <span>ShopEase</span>
            </div>

            <p>
              Your destination for quality products
              at great prices.
            </p>
          </div>

          <div className="footer-links">
            <h4>Shop</h4>
            <span>All Products</span>
            <span>Categories</span>
            <span>New Arrivals</span>
          </div>

          <div className="footer-links">
            <h4>Help</h4>
            <span>Contact Us</span>
            <span>Shipping</span>
            <span>Returns</span>
          </div>

          <div className="footer-links">
            <h4>Follow Us</h4>
            <span>Instagram</span>
            <span>Facebook</span>
            <span>Twitter</span>
          </div>

        </div>

        <div className="copyright">
          © 2026 ShopEase. All rights reserved.
        </div>

      </footer>

    </div>
  );
}

export default App;
