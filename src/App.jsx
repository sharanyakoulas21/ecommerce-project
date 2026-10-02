
import { useEffect, useMemo, useState } from "react";
import Login from "./Login.jsx";
import "./App.css";

const initialProducts = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 1499, oldPrice: 2499, rating: 4.5, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600" },
  { id: 2, name: "Smart Watch", category: "Electronics", price: 1999, oldPrice: 2999, rating: 4.4, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600" },
  { id: 3, name: "Running Shoes", category: "Fashion", price: 1299, oldPrice: 1999, rating: 4.3, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" },
  { id: 4, name: "Casual Backpack", category: "Fashion", price: 899, oldPrice: 1499, rating: 4.2, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600" },
  { id: 5, name: "Digital Camera", category: "Electronics", price: 4999, oldPrice: 6999, rating: 4.6, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600" },
  { id: 6, name: "Travel Backpack", category: "Fashion", price: 1199, oldPrice: 1799, rating: 4.1, image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=600" },
  { id: 7, name: "Sunglasses", category: "Fashion", price: 599, oldPrice: 999, rating: 4.0, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600" },
  { id: 8, name: "Perfume", category: "Beauty", price: 799, oldPrice: 1299, rating: 4.3, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600" },
  { id: 9, name: "Skin Care Set", category: "Beauty", price: 699, oldPrice: 1099, rating: 4.2, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600" },
  { id: 10, name: "Coffee Maker", category: "Home", price: 2499, oldPrice: 3499, rating: 4.5, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600" },
  { id: 11, name: "Table Lamp", category: "Home", price: 899, oldPrice: 1399, rating: 4.1, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600" },
  { id: 12, name: "Bluetooth Speaker", category: "Electronics", price: 1099, oldPrice: 1699, rating: 4.4, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600" },
  { id: 13, name: "Classic Watch", category: "Fashion", price: 1599, oldPrice: 2399, rating: 4.3, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600" },
  { id: 14, name: "Desk Accessories", category: "Home", price: 499, oldPrice: 799, rating: 4.0, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600" },
  { id: 15, name: "Fitness Shoes", category: "Fashion", price: 1799, oldPrice: 2599, rating: 4.4, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600" },
  { id: 16, name: "Wireless Earbuds", category: "Electronics", price: 1299, oldPrice: 1999, rating: 4.5, image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600" },
];

const slides = [
  {
    title: "Big Savings, Better Shopping!",
    subtitle: "Discover your favourite products at amazing prices.",
    button: "Shop Now",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Upgrade Your Lifestyle",
    subtitle: "Explore electronics, fashion and everyday essentials.",
    button: "Explore Products",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Your Next Favourite Find",
    subtitle: "Find something special for every moment.",
    button: "Discover More",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1400&q=85",
  },
];

const categories = [
  { name: "All", emoji: "🛍️" },
  { name: "Electronics", emoji: "🎧" },
  { name: "Fashion", emoji: "👟" },
  { name: "Beauty", emoji: "✨" },
  { name: "Home", emoji: "🏠" },
];

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

/* =========================================
   PRODUCT CARD
   ========================================= */

function ProductCard({ product, onAdd, onWishlist, wished, onView }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />

        <button
          type="button"
          className={`wishlist-button ${wished ? "wished" : ""}`}
          onClick={() => onWishlist(product.id)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wished ? "♥" : "♡"}
        </button>
      </div>

      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-rating">⭐ {product.rating} / 5</p>

        <div className="product-prices">
          <strong>{money(product.price)}</strong>
          <del>{money(product.oldPrice)}</del>
        </div>

        <div className="product-actions">
          <button
            type="button"
            onClick={() => onView(product)}
            className="secondary-button"
          >
            View
          </button>

          <button
            type="button"
            onClick={() => onAdd(product)}
            className="primary-button"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

/* =========================================
   PRODUCT GRID
   ========================================= */

function ProductGrid({ products, onAdd, onWishlist, wishlist, onView }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <h3>No products found</h3>
        <p>Try another search or select a different category.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAdd={onAdd}
          onWishlist={onWishlist}
          wished={wishlist.includes(product.id)}
          onView={onView}
        />
      ))}
    </div>
  );
}

/* =========================================
   SHOPZONE APPLICATION
   ========================================= */

export default function App() {
  const [page, setPage] = useState("Home");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [customer, setCustomer] = useState(null);
  const [notice, setNotice] = useState("");

  const [feedback, setFeedback] = useState({
    name: "",
    rating: "5",
    message: "",
  });

  const [feedbackList, setFeedbackList] = useState([]);

  const [checkoutDetails, setCheckoutDetails] = useState({
    name: "",
    phone: "",
    address: "",
  });

  /* Automatically advance the carousel every four seconds. */
  useEffect(() => {
    if (page !== "Home" || isCarouselPaused) {
      return undefined;
    }

    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [page, isCarouselPaused]);

  /* Automatically dismiss notifications. */
  useEffect(() => {
    if (!notice) return undefined;

    const timer = setTimeout(() => setNotice(""), 3000);
    return () => clearTimeout(timer);
  }, [notice]);

  /* Navigate to a page and return to the top. */
  const openPage = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* Open the selected product's details. */
  const viewProduct = (product) => {
    setSelectedProduct(product);
    openPage("ProductDetails");
  };

  /* Search and category filtering. */
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  /* Add a product or increase its quantity. */
  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    setNotice(`${product.name} added to your cart successfully!`);
  };

  /* Change quantity and remove items when quantity reaches zero. */
  const updateQuantity = (id, change) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  /* Add or remove a product from the wishlist. */
  const toggleWishlist = (id) => {
    const alreadyWished = wishlist.includes(id);

    setWishlist((current) =>
      alreadyWished
        ? current.filter((itemId) => itemId !== id)
        : [...current, id]
    );

    setNotice(
      alreadyWished ? "Removed from wishlist." : "Added to wishlist."
    );
  };

  /* Calculate cart quantity and total price. */
  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  /* Place a demo order. */
  const placeOrder = (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      setNotice("Your cart is empty.");
      return;
    }

    const order = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cart,
      total: cartTotal,
      customer: { ...checkoutDetails },
      status: "Order Placed",
    };

    setOrders((current) => [order, ...current]);
    setCart([]);
    setCheckoutDetails({ name: "", phone: "", address: "" });

    setNotice("Your order has been placed successfully.");
    openPage("Orders");
  };

  /* Submit customer feedback. */
  const submitFeedback = (event) => {
    event.preventDefault();

    if (!feedback.name.trim() || !feedback.message.trim()) {
      setNotice("Please complete all feedback fields.");
      return;
    }

    const newFeedback = {
      ...feedback,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
    };

    setFeedbackList((current) => [newFeedback, ...current]);
    setFeedback({ name: "", rating: "5", message: "" });
    setNotice("Thank you! Your feedback has been submitted.");
  };

  /* Shop Now button action. */
  const handleShopNow = () => {
    setCategory("All");
    setSearch("");
    openPage("Products");
  };

  /* Props shared by product cards. */
  const productCardProps = {
    onAdd: addToCart,
    onWishlist: toggleWishlist,
    wishlist,
    onView: viewProduct,
  };

  /* Carousel navigation. */
  const showPreviousSlide = () => {
    setActiveSlide(
      (current) => (current - 1 + slides.length) % slides.length
    );
  };

  const showNextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  return (
    <div className="shopzone-app">
      {/* =====================================
          HEADER AND NAVIGATION
          ===================================== */}

      <header className="shopzone-header">
        <button
          type="button"
          className="shopzone-logo"
          onClick={() => openPage("Home")}
        >
          SHOP<span>ZONE</span>
        </button>

        <form
          className="shopzone-search"
          onSubmit={(event) => {
            event.preventDefault();
            openPage("Products");
          }}
        >
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products and categories..."
            aria-label="Search products"
          />

          <button type="submit">Search</button>
        </form>

        <nav className="shopzone-nav">
          {["Home", "Products", "Orders", "Feedback"].map((item) => (
            <button
              type="button"
              key={item}
              className={page === item ? "nav-active" : ""}
              onClick={() => openPage(item)}
            >
              {item}
            </button>
          ))}

          <button
            type="button"
            className={page === "Wishlist" ? "nav-active" : ""}
            onClick={() => openPage("Wishlist")}
          >
            ♥ Wishlist ({wishlist.length})
          </button>

          <button
            type="button"
            className={page === "Cart" ? "nav-active" : ""}
            onClick={() => openPage("Cart")}
          >
            🛒 Cart ({cartCount})
          </button>

          <button
            type="button"
            className={page === "Login" ? "nav-active" : ""}
            onClick={() => openPage("Login")}
          >
            {customer?.name || "Login"}
          </button>
        </nav>
      </header>

      {/* =====================================
          NOTIFICATION
          ===================================== */}

      {notice && (
        <div className="shopzone-notice" role="status">
          <span>{notice}</span>

          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}

      <main className="shopzone-main">
        {/* =====================================
            HOME PAGE
            CAROUSEL FIRST, THEN PRODUCTS
            ===================================== */}

        {page === "Home" && (
          <>
            <section
              className="shopzone-slider"
              aria-label="Featured shopping offers"
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
              onFocusCapture={() => setIsCarouselPaused(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setIsCarouselPaused(false);
                }
              }}
            >
              <div
                className="shopzone-slides-track"
                style={{
                  transform: `translateX(-${activeSlide * 100}%)`,
                }}
              >
                {slides.map((slide, index) => (
                  <div
                    key={slide.title}
                    className="shopzone-slide"
                    style={{
                      backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.75), rgba(0,0,0,.1)), url("${slide.image}")`,
                    }}
                    aria-hidden={activeSlide !== index}
                  >
                    <div className="shopzone-slide-content">
                      <h1>{slide.title}</h1>
                      <p>{slide.subtitle}</p>

                      <button
                        type="button"
                        tabIndex={activeSlide === index ? 0 : -1}
                        onClick={handleShopNow}
                      >
                        {slide.button}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="shopzone-arrow previous"
                aria-label="Previous slide"
                onClick={showPreviousSlide}
              >
                ❮
              </button>

              <button
                type="button"
                className="shopzone-arrow next"
                aria-label="Next slide"
                onClick={showNextSlide}
              >
                ❯
              </button>

              <div className="shopzone-dots">
                {slides.map((slide, index) => (
                  <button
                    type="button"
                    key={slide.title}
                    className={activeSlide === index ? "selected" : ""}
                    aria-label={`Show slide ${index + 1}`}
                    aria-current={activeSlide === index ? "true" : undefined}
                    onClick={() => setActiveSlide(index)}
                  />
                ))}
              </div>
            </section>

            <section className="section-block">
              <h2>Popular Products</h2>

              <ProductGrid
                products={initialProducts.slice(0, 8)}
                {...productCardProps}
              />
            </section>

            <section className="section-block">
              <h2>More to Explore</h2>

              <ProductGrid
                products={initialProducts.slice(8)}
                {...productCardProps}
              />
            </section>
          </>
        )}

        {/* =====================================
            PRODUCTS PAGE
            ===================================== */}

        {page === "Products" && (
          <section className="section-block">
            <h1>Explore Products</h1>

            <div className="category-list">
              {categories.map((item) => (
                <button
                  type="button"
                  key={item.name}
                  className={`category-card ${
                    category === item.name ? "category-active" : ""
                  }`}
                  onClick={() => setCategory(item.name)}
                >
                  <span>{item.emoji}</span>
                  <strong>{item.name}</strong>
                </button>
              ))}
            </div>

            <p className="result-count">
              {filteredProducts.length} products found
            </p>

            <ProductGrid
              products={filteredProducts}
              {...productCardProps}
            />
          </section>
        )}

        {/* =====================================
            PRODUCT DETAILS PAGE
            ===================================== */}

        {page === "ProductDetails" && (
          <section className="section-block product-details">
            <button
              type="button"
              className="secondary-button"
              onClick={() => openPage("Products")}
            >
              ← Back to Products
            </button>

            {selectedProduct ? (
              <div className="product-detail-layout">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                />

                <div>
                  <p className="product-category">
                    {selectedProduct.category}
                  </p>

                  <h1>{selectedProduct.name}</h1>
                  <p>⭐ {selectedProduct.rating} / 5</p>
                  <h2>{money(selectedProduct.price)}</h2>

                  <p>
                    <del>{money(selectedProduct.oldPrice)}</del>
                  </p>

                  <p>
                    Discover this product at SHOPZONE. Add it to your cart
                    to continue shopping.
                  </p>

                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => addToCart(selectedProduct)}
                  >
                    🛒 Add to Cart
                  </button>

                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => toggleWishlist(selectedProduct.id)}
                  >
                    {wishlist.includes(selectedProduct.id)
                      ? "♥ Remove from Wishlist"
                      : "♡ Add to Wishlist"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <h2>No product selected</h2>
                <p>Please select a product to view its details.</p>

                <button
                  type="button"
                  className="primary-button"
                  onClick={() => openPage("Products")}
                >
                  Explore Products
                </button>
              </div>
            )}
          </section>
        )}

        {/* =====================================
            WISHLIST PAGE
            ===================================== */}

        {page === "Wishlist" && (
          <section className="section-block">
            <h1>My Wishlist</h1>

            <ProductGrid
              products={initialProducts.filter((product) =>
                wishlist.includes(product.id)
              )}
              {...productCardProps}
            />
          </section>
        )}

        {/* =====================================
            CART PAGE
            ===================================== */}

        {page === "Cart" && (
          <section className="section-block">
            <h1>Shopping Cart ({cartCount} items)</h1>

            {cart.length === 0 ? (
              <div className="empty-state">
                <h2>Your cart is empty 🛒</h2>
                <p>Explore our products and add your favourites.</p>

                <button
                  type="button"
                  className="primary-button"
                  onClick={handleShopNow}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-list">
                  {cart.map((item) => (
                    <article key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} />

                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p>{money(item.price)} each</p>

                        <div className="quantity-controls">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <strong>
                        {money(item.price * item.quantity)}
                      </strong>

                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => {
                          setCart((current) =>
                            current.filter(
                              (product) => product.id !== item.id
                            )
                          );

                          setNotice(`${item.name} removed from your cart.`);
                        }}
                      >
                        Remove
                      </button>
                    </article>
                  ))}
                </div>

                <div className="cart-summary">
                  <h2>Order Summary</h2>
                  <p>Total quantity: {cartCount}</p>
                  <h3>Total: {money(cartTotal)}</h3>

                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => openPage("Checkout")}
                  >
                    Proceed to Checkout →
                  </button>

                  <button
                    type="button"
                    className="secondary-button"
                    onClick={handleShopNow}
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </section>
        )}

        {/* =====================================
            CHECKOUT PAGE
            ===================================== */}

        {page === "Checkout" && (
          <section className="section-block">
            <h1>Checkout</h1>

            {cart.length === 0 ? (
              <div className="empty-state">
                <p>Your cart is empty. Add products before checkout.</p>

                <button
                  type="button"
                  className="primary-button"
                  onClick={handleShopNow}
                >
                  Shop Now
                </button>
              </div>
            ) : (
              <div className="checkout-layout">
                <form className="checkout-form" onSubmit={placeOrder}>
                  <h2>Delivery Details</h2>

                  <label htmlFor="checkout-name">Full Name</label>
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    value={checkoutDetails.name}
                    onChange={(event) =>
                      setCheckoutDetails({
                        ...checkoutDetails,
                        name: event.target.value,
                      })
                    }
                  />

                  <label htmlFor="checkout-phone">Phone Number</label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    title="Enter a 10-digit phone number"
                    value={checkoutDetails.phone}
                    onChange={(event) =>
                      setCheckoutDetails({
                        ...checkoutDetails,
                        phone: event.target.value,
                      })
                    }
                  />

                  <label htmlFor="checkout-address">
                    Delivery Address
                  </label>

                  <textarea
                    id="checkout-address"
                    required
                    rows={4}
                    value={checkoutDetails.address}
                    onChange={(event) =>
                      setCheckoutDetails({
                        ...checkoutDetails,
                        address: event.target.value,
                      })
                    }
                  />

                  <h3>Total: {money(cartTotal)}</h3>

                  <button type="submit" className="primary-button">
                    Place Demo Order
                  </button>
                </form>

                <div className="checkout-summary">
                  <h2>Your Items</h2>

                  {cart.map((item) => (
                    <p key={item.id}>
                      {item.name} × {item.quantity} —{" "}
                      {money(item.price * item.quantity)}
                    </p>
                  ))}

                  <h3>Total: {money(cartTotal)}</h3>

                  <small>
                    This is a demo checkout. No real payment is taken.
                  </small>
                </div>
              </div>
            )}
          </section>
        )}

        {/* =====================================
            ORDERS PAGE
            ===================================== */}

        {page === "Orders" && (
          <section className="section-block">
            <h1>My Orders</h1>

            {orders.length === 0 ? (
              <div className="empty-state">
                <h2>No orders yet</h2>
                <p>Your placed orders will appear here.</p>

                <button
                  type="button"
                  className="primary-button"
                  onClick={handleShopNow}
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <article key={order.id} className="order-card">
                    <h2>Order #{order.id}</h2>
                    <p>{order.date}</p>
                    <p>Customer: {order.customer.name}</p>
                    <p>Status: {order.status}</p>

                    {order.items.map((item) => (
                      <p key={item.id}>
                        {item.name} × {item.quantity}
                      </p>
                    ))}

                    <h3>Total: {money(order.total)}</h3>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {/* =====================================
            FEEDBACK PAGE
            ===================================== */}

        {page === "Feedback" && (
          <section className="section-block feedback-section">
            <div className="feedback-heading">
              <span>💬</span>
              <h1>We Value Your Feedback</h1>

              <p>
                Tell us about your shopping experience. Your suggestions
                help us improve SHOPZONE.
              </p>
            </div>

            <form className="feedback-form" onSubmit={submitFeedback}>
              <label htmlFor="feedback-name">Your Name</label>

              <input
                id="feedback-name"
                type="text"
                placeholder="Enter your name"
                value={feedback.name}
                onChange={(event) =>
                  setFeedback({
                    ...feedback,
                    name: event.target.value,
                  })
                }
                required
              />

              <label htmlFor="feedback-rating">Your Rating</label>

              <select
                id="feedback-rating"
                value={feedback.rating}
                onChange={(event) =>
                  setFeedback({
                    ...feedback,
                    rating: event.target.value,
                  })
                }
              >
                <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                <option value="4">⭐⭐⭐⭐ Good</option>
                <option value="3">⭐⭐⭐ Average</option>
                <option value="2">⭐⭐ Needs Improvement</option>
                <option value="1">⭐ Poor</option>
              </select>

              <label htmlFor="feedback-message">Your Feedback</label>

              <textarea
                id="feedback-message"
                placeholder="Share your suggestions or experience..."
                value={feedback.message}
                onChange={(event) =>
                  setFeedback({
                    ...feedback,
                    message: event.target.value,
                  })
                }
                rows={5}
                required
              />

              <button type="submit" className="primary-button">
                Submit Feedback
              </button>
            </form>

            <div className="feedback-list">
              <h2>Customer Feedback</h2>

              {feedbackList.length === 0 ? (
                <div className="empty-state">
                  <p>
                    No feedback submitted yet. Be the first to share
                    your experience!
                  </p>
                </div>
              ) : (
                feedbackList.map((item) => (
                  <article key={item.id} className="feedback-card">
                    <div className="feedback-card-top">
                      <h3>{item.name}</h3>
                      <span>
                        {"⭐".repeat(Number(item.rating))}
                      </span>
                    </div>

                    <p>{item.message}</p>
                    <small>{item.date}</small>
                  </article>
                ))
              )}
            </div>
          </section>
        )}

        {/* =====================================
            LOGIN PAGE
            ===================================== */}

        {page === "Login" && (
          <Login
            onBack={() => openPage("Home")}
            onLogin={(user) => {
              setCustomer(user);
              openPage("Home");
              setNotice("Login successful for this demo session.");
            }}
          />
        )}
      </main>

      {/* =====================================
          FOOTER
          ===================================== */}

      <footer className="shopzone-footer">
        <h2>SHOPZONE</h2>
        <p>Your everyday shopping destination.</p>

        <div className="footer-links">
          <button type="button" onClick={() => openPage("Home")}>
            Home
          </button>

          <button type="button" onClick={() => openPage("Products")}>
            Products
          </button>

          <button type="button" onClick={() => openPage("Orders")}>
            Orders
          </button>

          <button type="button" onClick={() => openPage("Feedback")}>
            Feedback
          </button>
        </div>

        <small>
          © {new Date().getFullYear()} SHOPZONE. Demo project.
        </small>
      </footer>
    </div>
  );
}