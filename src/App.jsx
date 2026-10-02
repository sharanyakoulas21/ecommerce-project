
import { useMemo, useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 1499, oldPrice: 2499, rating: 4.5, image: "photo-1505740420928-5e560c06d30e" },
  { id: 2, name: "Smart Watch", category: "Electronics", price: 1999, oldPrice: 3499, rating: 4.3, image: "photo-1523275335684-37898b6baf30" },
  { id: 3, name: "Running Shoes", category: "Fashion", price: 1799, oldPrice: 2999, rating: 4.4, image: "photo-1542291026-7eec264c27ff" },
  { id: 4, name: "Classic Backpack", category: "Fashion", price: 899, oldPrice: 1499, rating: 4.2, image: "photo-1553062407-98eeb64c6a62" },
  { id: 5, name: "Digital Camera", category: "Electronics", price: 4299, oldPrice: 5999, rating: 4.6, image: "photo-1516035069371-29a1b244cc32" },
  { id: 6, name: "Sunglasses", category: "Fashion", price: 599, oldPrice: 999, rating: 4.1, image: "photo-1511499767150-a48a237f0083" },
  { id: 7, name: "Desk Lamp", category: "Home", price: 699, oldPrice: 1099, rating: 4.3, image: "photo-1507473885765-e6ed057f782c" },
  { id: 8, name: "Coffee Maker", category: "Home", price: 2299, oldPrice: 3299, rating: 4.4, image: "photo-1495474472287-4d71bcdd2085" },
  { id: 9, name: "Skin Care Set", category: "Beauty", price: 799, oldPrice: 1199, rating: 4.2, image: "photo-1608248543803-ba4f8c70ae0b" },
  { id: 10, name: "Perfume", category: "Beauty", price: 999, oldPrice: 1599, rating: 4.5, image: "photo-1541643600914-78b084683601" },
  { id: 11, name: "Travel Bottle", category: "Home", price: 399, oldPrice: 699, rating: 4.0, image: "photo-1602143407151-7111542de6e8" },
  { id: 12, name: "Sports Shoes", category: "Fashion", price: 1599, oldPrice: 2499, rating: 4.3, image: "photo-1460353581641-37baddab0fa2" },
  { id: 13, name: "Bluetooth Speaker", category: "Electronics", price: 1199, oldPrice: 1999, rating: 4.4, image: "photo-1608043152269-423dbba4e7e1" },
  { id: 14, name: "Plant Pot", category: "Home", price: 349, oldPrice: 599, rating: 4.1, image: "photo-1485955900006-10f4d324d411" },
  { id: 15, name: "Makeup Kit", category: "Beauty", price: 899, oldPrice: 1399, rating: 4.3, image: "photo-1596462502278-27bfdc403348" },
  { id: 16, name: "Laptop Bag", category: "Fashion", price: 1099, oldPrice: 1799, rating: 4.2, image: "photo-1553062407-98eeb64c6a62" }
];

const categories = ["All", "Electronics", "Fashion", "Home", "Beauty"];

function ProductCard({ product, addToCart, wishlist, toggleWishlist }) {
  const liked = wishlist.some((item) => item.id === product.id);

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          className="product-image"
          src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=600&q=80`}
          alt={product.name}
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
        <span className="sale-label">
          {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
        </span>
        <button
          className={`heart-button ${liked ? "liked" : ""}`}
          onClick={() => toggleWishlist(product)}
          aria-label="Toggle wishlist"
        >
          {liked ? "♥" : "♡"}
        </button>
      </div>

      <div className="product-details">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <div className="rating">★ {product.rating} <span> | Free delivery</span></div>
        <div className="price-line">
          <strong>₹{product.price.toLocaleString("en-IN")}</strong>
          <del>₹{product.oldPrice.toLocaleString("en-IN")}</del>
        </div>
        <button className="add-button" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default function App() {
  const [page, setPage] = useState("Home");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());
      const matchesPage = page !== "Wishlist" || wishlist.some((item) => item.id === product.id);
      return matchesCategory && matchesSearch && matchesPage;
    });
  }, [category, search, page, wishlist]);

  function showMessage(text) {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2500);
  }

  function addToCart(product) {
    setCart((previous) => {
      const existing = previous.find((item) => item.id === product.id);
      if (existing) {
        return previous.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...previous, { ...product, quantity: 1 }];
    });
    showMessage(`${product.name} added to cart!`);
  }

  function toggleWishlist(product) {
    const alreadyLiked = wishlist.some((item) => item.id === product.id);
    setWishlist((previous) =>
      alreadyLiked
        ? previous.filter((item) => item.id !== product.id)
        : [...previous, product]
    );
    showMessage(alreadyLiked ? "Removed from wishlist" : "Added to wishlist!");
  }

  function changeQuantity(id, amount) {
    setCart((previous) =>
      previous
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function placeOrder() {
    if (cart.length === 0) {
      showMessage("Your cart is empty!");
      return;
    }

    const newOrder = {
      id: `SZ${Date.now().toString().slice(-7)}`,
      date: new Date().toLocaleDateString("en-IN"),
      items: cart,
      total: cartTotal
    };

    setOrders((previous) => [newOrder, ...previous]);
    setCart([]);
    setPage("Orders");
    showMessage("Order placed successfully!");
  }

  function openPage(nextPage) {
    setPage(nextPage);
    if (nextPage !== "Products" && nextPage !== "Wishlist") {
      setCategory("All");
      setSearch("");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const navItems = [
    ["Home", "⌂"],
    ["Products", "▦"],
    ["Wishlist", "♡"],
    ["Orders", "▤"],
    ["Feedback", "✉"]
  ];

  return (
    <div className="shop-app">
      <div className="announcement">
        ✨ MEGA SHOPPING SALE — Special deals on your favourite products!
      </div>

      <header className="main-header">
        <button className="brand" onClick={() => openPage("Home")}>
          <span className="brand-icon">S</span>
          SHOP<span>ZONE</span>
        </button>

        <form
          className="search-bar"
          onSubmit={(event) => {
            event.preventDefault();
            setPage("Products");
            if (!search.trim()) showMessage("Enter a product name to search.");
          }}
        >
          <span>⌕</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search for products, brands and more..."
            aria-label="Search products"
          />
          <button type="submit">Search</button>
        </form>

        <div className="header-actions">
          <button onClick={() => openPage("Wishlist")}>♡ <span>Wishlist</span></button>
          <button onClick={() => openPage("Cart")}>🛒 <span>Cart ({cartCount})</span></button>
        </div>
      </header>

      <nav className="navigation">
        {navItems.map(([label, symbol]) => (
          <button
            key={label}
            className={page === label ? "nav-link active" : "nav-link"}
            onClick={() => openPage(label)}
          >
            <span>{symbol}</span> {label}
          </button>
        ))}
      </nav>

      {message && <div className="toast">{message}</div>}

      {page === "Home" && (
        <>
          <section className="hero">
            <div className="hero-copy">
              <span className="hero-tag">YOUR EVERYDAY SHOPPING DESTINATION</span>
              <h1>Discover More.<br /><span>Spend Less.</span></h1>
              <p>Find the things you love at prices that make you smile.</p>
              <button className="hero-button" onClick={() => openPage("Products")}>
                Explore Products <span>→</span>
              </button>
              <div className="hero-perks">
                <span>✓ Great deals</span>
                <span>✓ Easy shopping</span>
                <span>✓ Wide selection</span>
              </div>
            </div>
            <div className="hero-art">
              <div className="hero-circle"></div>
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=900&q=85"
                alt="Shopping bags and shopping products"
              />
              <div className="floating-offer"><small>UP TO</small><strong>50%</strong><small>OFF</small></div>
            </div>
          </section>

          <section className="benefits">
            <div><span>🚚</span><div><strong>Easy Shopping</strong><small>Browse from home</small></div></div>
            <div><span>🏷️</span><div><strong>Special Offers</strong><small>Deals on selected items</small></div></div>
            <div><span>🔒</span><div><strong>Simple Checkout</strong><small>Easy order placement demo</small></div></div>
            <div><span>💬</span><div><strong>Customer Feedback</strong><small>Share your thoughts</small></div></div>
          </section>

          <section className="content-section">
            <div className="section-heading">
              <div><span className="eyebrow">FIND YOUR FAVOURITES</span><h2>Shop by Category</h2></div>
              <button className="text-link" onClick={() => openPage("Products")}>View all products →</button>
            </div>
            <div className="category-grid">
              {[
                { name: "Electronics", emoji: "🎧", colour: "lavender" },
                { name: "Fashion", emoji: "👟", colour: "peach" },
                { name: "Home", emoji: "🪴", colour: "mint" },
                { name: "Beauty", emoji: "🧴", colour: "pink" }
              ].map((item) => (
                <button
                  key={item.name}
                  className={`category-card ${item.colour}`}
                  onClick={() => { setCategory(item.name); setPage("Products"); }}
                >
                  <span className="category-emoji">{item.emoji}</span>
                  <strong>{item.name}</strong>
                  <span>Explore collection →</span>
                </button>
              ))}
            </div>
          </section>

          <section className="content-section">
            <div className="section-heading">
              <div><span className="eyebrow">HANDPICKED FOR YOU</span><h2>Popular Products</h2></div>
              <button className="text-link" onClick={() => openPage("Products")}>See all →</button>
            </div>
            <div className="product-grid">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />
              ))}
            </div>
          </section>
        </>
      )}

      {(page === "Products" || page === "Wishlist") && (
        <main className="content-section page-content">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{page === "Wishlist" ? "SAVED FOR LATER" : "FIND SOMETHING YOU LOVE"}</span>
              <h2>{page === "Wishlist" ? "My Wishlist" : "Explore Products"}</h2>
              <p className="muted">{visibleProducts.length} product(s) available</p>
            </div>
          </div>

          {page === "Products" && (
            <div className="category-filters">
              {categories.map((item) => (
                <button key={item} className={category === item ? "filter-chip selected" : "filter-chip"} onClick={() => setCategory(item)}>
                  {item}
                </button>
              ))}
            </div>
          )}

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>🔎</span>
              <h3>{page === "Wishlist" ? "Your wishlist is empty" : "No products found"}</h3>
              <p>Try another search or category.</p>
              <button className="primary-button" onClick={() => { setSearch(""); setCategory("All"); openPage("Products"); }}>Browse Products</button>
            </div>
          )}
        </main>
      )}

      {page === "Cart" && (
        <main className="content-section page-content">
          <div className="section-heading"><div><span className="eyebrow">ALMOST YOURS</span><h2>Shopping Cart</h2></div></div>
          {cart.length === 0 ? (
            <div className="empty-state"><span>🛍️</span><h3>Your cart is empty</h3><p>Add something you love to get started.</p><button className="primary-button" onClick={() => openPage("Products")}>Start Shopping</button></div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=200&q=75`} alt={item.name} />
                    <div className="cart-item-info"><h3>{item.name}</h3><p>{item.category}</p><strong>₹{item.price.toLocaleString("en-IN")}</strong></div>
                    <div className="quantity-control">
                      <button onClick={() => changeQuantity(item.id, -1)} aria-label="Decrease quantity">−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => changeQuantity(item.id, 1)} aria-label="Increase quantity">+</button>
                    </div>
                    <strong>₹{(item.price * item.quantity).toLocaleString("en-IN")}</strong>
                  </div>
                ))}
              </div>
              <aside className="order-summary">
                <h3>Order Summary</h3>
                <div><span>Items</span><span>{cartCount}</span></div>
                <div><span>Subtotal</span><span>₹{cartTotal.toLocaleString("en-IN")}</span></div>
                <div><span>Delivery</span><span className="free-text">FREE</span></div>
                <hr />
                <div className="summary-total"><strong>Total</strong><strong>₹{cartTotal.toLocaleString("en-IN")}</strong></div>
                <button className="primary-button full-button" onClick={placeOrder}>Place Demo Order</button>
                <p className="summary-note">Demo only — no payment will be collected.</p>
              </aside>
            </div>
          )}
        </main>
      )}

      {page === "Orders" && (
        <main className="content-section page-content">
          <div className="section-heading"><div><span className="eyebrow">YOUR SHOPPING HISTORY</span><h2>My Orders</h2></div></div>
          {orders.length === 0 ? (
            <div className="empty-state"><span>📦</span><h3>No orders yet</h3><p>Your demo orders will appear here after checkout.</p><button className="primary-button" onClick={() => openPage("Products")}>Explore Products</button></div>
          ) : orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-header"><div><span className="eyebrow">ORDER ID</span><h3>{order.id}</h3></div><span className="order-status">Demo order placed</span></div>
              <p>Order date: {order.date}</p>
              {order.items.map((item) => <p key={item.id}>{item.name} × {item.quantity}</p>)}
              <div className="order-total">Total: ₹{order.total.toLocaleString("en-IN")}</div>
            </div>
          ))}
        </main>
      )}

      {page === "Feedback" && (
        <main className="content-section page-content">
          <div className="feedback-panel">
            <span className="eyebrow">WE WOULD LOVE TO HEAR FROM YOU</span>
            <h2>Share Your Feedback</h2>
            <p className="muted">Tell us about your SHOPZONE experience.</p>
            <form onSubmit={(event) => { event.preventDefault(); showMessage("Thank you for your feedback!"); setFeedback(""); setCustomerName(""); setCustomerEmail(""); }}>
              <label>Your name</label>
              <input value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Enter your name" required />
              <label>Email address</label>
              <input type="email" value={customerEmail} onChange={(event) => setCustomerEmail(event.target.value)} placeholder="you@example.com" required />
              <label>Your feedback</label>
              <textarea value={feedback} onChange={(event) => setFeedback(event.target.value)} placeholder="Tell us what you think..." rows="5" required />
              <button className="primary-button" type="submit">Submit Feedback</button>
            </form>
            <p className="summary-note">Demo form only. Feedback is not sent to a server.</p>
          </div>
        </main>
      )}

      <footer className="site-footer">
        <div className="footer-brand"><button className="brand" onClick={() => openPage("Home")}><span className="brand-icon">S</span> SHOP<span>ZONE</span></button><p>Everyday finds. A little more joy.</p></div>
        <div><strong>Shop</strong><button onClick={() => openPage("Products")}>All Products</button><button onClick={() => openPage("Wishlist")}>Wishlist</button><button onClick={() => openPage("Cart")}>Shopping Cart</button></div>
        <div><strong>Customer Care</strong><button onClick={() => openPage("Orders")}>My Orders</button><button onClick={() => openPage("Feedback")}>Contact & Feedback</button></div>
        <div className="footer-note">A student e-commerce frontend project built with React.<br />Demo checkout only; no real payment processing.</div>
        <div className="copyright">© 2026 SHOPZONE. Made for a learning project.</div>
      </footer>
    </div>
  );
}