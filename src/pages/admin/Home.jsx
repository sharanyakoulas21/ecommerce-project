import {
  Search,
  Heart,
  ShoppingCart,
  UserRound,
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  ChevronRight,
} from "lucide-react";

function Home() {
  const categories = [
    {
      name: "Electronics",
      count: "120+ Products",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Fashion",
      count: "180+ Products",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Beauty",
      count: "90+ Products",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Home & Living",
      count: "150+ Products",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Accessories",
      count: "100+ Products",
      image:
        "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const products = [
    {
      name: "Wireless Noise Cancelling Headphones",
      category: "Electronics",
      price: "₹2,499",
      oldPrice: "₹3,999",
      discount: "38% OFF",
      rating: "4.8",
      reviews: "328",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Smart Watch Series 8",
      category: "Electronics",
      price: "₹3,999",
      oldPrice: "₹5,999",
      discount: "33% OFF",
      rating: "4.7",
      reviews: "215",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Premium Running Sneakers",
      category: "Fashion",
      price: "₹2,999",
      oldPrice: "₹4,499",
      discount: "33% OFF",
      rating: "4.6",
      reviews: "184",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Classic Leather Backpack",
      category: "Accessories",
      price: "₹1,899",
      oldPrice: "₹2,999",
      discount: "37% OFF",
      rating: "4.9",
      reviews: "142",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="home-page">

      {/* TOP ANNOUNCEMENT */}
      <div className="announcement">
        <span>FREE SHIPPING ON ORDERS ABOVE ₹999</span>
        <span>•</span>
        <span>UP TO 50% OFF ON SELECTED PRODUCTS</span>
      </div>

      {/* NAVBAR */}
      <header className="main-navbar">
        <div className="brand">
          <div className="brand-icon">
            <ShoppingCart size={21} />
          </div>
          <div>
            <h2>SHOPZONE</h2>
            <span>SHOP SMART. LIVE BETTER.</span>
          </div>
        </div>

        <nav className="desktop-nav">
          <a href="#home" className="active">
            Home
          </a>
          <a href="#shop">Shop</a>
          <a href="#categories">Categories</a>
          <a href="#offers">Offers</a>
          <a href="#orders">Orders</a>
          <a href="#feedback">Feedback</a>
        </nav>

        <div className="nav-actions">
          <button className="nav-icon">
            <Heart size={20} />
          </button>

          <button className="nav-icon">
            <UserRound size={20} />
          </button>

          <button className="cart-icon">
            <ShoppingCart size={21} />
            <span>2</span>
          </button>
        </div>
      </header>

      {/* SEARCH */}
      <div className="search-wrapper">
        <div className="search-box-large">
          <Search size={22} />
          <input
            type="text"
            placeholder="Search for products, brands and categories..."
          />
          <button>Search</button>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">NEW SEASON • 2026 COLLECTION</span>

          <h1>
            Everything You Need,
            <br />
            <span>All in One Place.</span>
          </h1>

          <p>
            Discover quality products, trending styles and everyday essentials
            at prices you'll love.
          </p>

          <div className="hero-actions">
            <button className="primary-btn">
              Shop Now
              <ArrowRight size={18} />
            </button>

            <button className="outline-btn">
              Explore Categories
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <strong>250+</strong>
              <span>Products</span>
            </div>

            <div>
              <strong>10K+</strong>
              <span>Customers</span>
            </div>

            <div>
              <strong>4.8★</strong>
              <span>Average Rating</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-card">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85"
              alt="Online shopping"
            />
          </div>

          <div className="floating-offer">
            <span>LIMITED OFFER</span>
            <strong>50% OFF</strong>
            <small>Selected products</small>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="content-section" id="categories">
        <div className="section-header">
          <div>
            <span className="section-label">EXPLORE COLLECTIONS</span>
            <h2>Shop by Category</h2>
            <p>Find exactly what you're looking for.</p>
          </div>

          <button className="view-all-btn">
            View All <ArrowRight size={17} />
          </button>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <article className="category-card" key={category.name}>
              <img src={category.image} alt={category.name} />

              <div className="category-gradient" />

              <div className="category-content">
                <span>{category.count}</span>
                <h3>{category.name}</h3>

                <button>
                  Shop Now <ChevronRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* OFFER BANNER */}
      <section className="offer-banner" id="offers">
        <div className="offer-text">
          <span>WEEKEND SPECIAL</span>

          <h2>
            Upgrade Your
            <br />
            Everyday.
          </h2>

          <p>
            Save more on selected products across electronics, fashion and
            lifestyle.
          </p>

          <button className="light-btn">
            Shop Offers <ArrowRight size={17} />
          </button>
        </div>

        <div className="offer-image">
          <img
            src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1000&q=85"
            alt="Fashion collection"
          />
        </div>
      </section>

      {/* FLASH SALE */}
      <section className="content-section" id="shop">
        <div className="section-header">
          <div>
            <span className="section-label red-label">LIMITED TIME DEALS</span>
            <h2>Flash Sale</h2>
            <p>Popular products at special prices.</p>
          </div>

          <button className="view-all-btn">
            View All <ArrowRight size={17} />
          </button>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.name}>
              <div className="product-image-wrapper">
                <span className="discount-badge">
                  {product.discount}
                </span>

                <button className="product-heart">
                  <Heart size={18} />
                </button>

                <img src={product.image} alt={product.name} />
              </div>

              <div className="product-details">
                <span className="product-category">
                  {product.category}
                </span>

                <h3>{product.name}</h3>

                <div className="rating-row">
                  <span>
                    <Star size={15} fill="currentColor" />
                    {product.rating}
                  </span>

                  <small>({product.reviews} reviews)</small>
                </div>

                <div className="price-row">
                  <strong>{product.price}</strong>
                  <del>{product.oldPrice}</del>
                </div>

                <button className="add-cart-btn">
                  <ShoppingCart size={17} />
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* WHY SHOP */}
      <section className="benefits">
        <div className="benefits-heading">
          <span className="section-label">SHOP WITH CONFIDENCE</span>
          <h2>Why Choose ShopZone?</h2>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">
              <Truck />
            </div>
            <h3>Fast Delivery</h3>
            <p>
              Get your favourite products delivered safely and quickly.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <ShieldCheck />
            </div>
            <h3>Secure Payments</h3>
            <p>
              Your payment information is protected with secure checkout.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <RotateCcw />
            </div>
            <h3>Easy Returns</h3>
            <p>
              Hassle-free returns with a simple and transparent process.
            </p>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviews-section" id="feedback">
        <div className="section-header">
          <div>
            <span className="section-label">CUSTOMER LOVE</span>
            <h2>What Our Customers Say</h2>
            <p>Real experiences from our shopping community.</p>
          </div>
        </div>

        <div className="reviews-grid">
          <div className="review-card">
            <div className="stars">★★★★★</div>
            <p>
              "The website is easy to use and my order arrived earlier than
              expected. The product quality was excellent."
            </p>
            <div className="review-user">
              <div>AK</div>
              <span>
                <strong>Ananya K.</strong>
                Verified Customer
              </span>
            </div>
          </div>

          <div className="review-card">
            <div className="stars">★★★★★</div>
            <p>
              "I found exactly what I needed at a good price. The checkout
              process was simple and smooth."
            </p>
            <div className="review-user">
              <div>RS</div>
              <span>
                <strong>Rahul S.</strong>
                Verified Customer
              </span>
            </div>
          </div>

          <div className="review-card">
            <div className="stars">★★★★★</div>
            <p>
              "Great variety of products and the images helped me choose the
              right product before ordering."
            </p>
            <div className="review-user">
              <div>PM</div>
              <span>
                <strong>Priya M.</strong>
                Verified Customer
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-section">
        <div>
          <span>STAY IN THE LOOP</span>
          <h2>Get exclusive deals in your inbox.</h2>
          <p>
            New arrivals, special offers and shopping inspiration.
          </p>
        </div>

        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email address" />
          <button>
            Subscribe <ArrowRight size={17} />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <h2>SHOPZONE</h2>
            <p>
              Your everyday destination for quality products, great prices and
              a better shopping experience.
            </p>
          </div>

          <div>
            <h3>Shop</h3>
            <a href="#shop">All Products</a>
            <a href="#categories">Categories</a>
            <a href="#offers">Offers</a>
            <a href="#shop">New Arrivals</a>
          </div>

          <div>
            <h3>Customer Care</h3>
            <a href="#orders">My Orders</a>
            <a href="#feedback">Feedback</a>
            <a href="#home">Shipping</a>
            <a href="#home">Returns</a>
          </div>

          <div>
            <h3>Company</h3>
            <a href="#home">About Us</a>
            <a href="#home">Contact</a>
            <a href="#home">Privacy Policy</a>
            <a href="#home">Terms & Conditions</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 ShopZone. All rights reserved.</span>
          <span>Made for a better shopping experience.</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;