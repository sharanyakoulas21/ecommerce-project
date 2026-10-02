import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HeroSlider.css";

const slides = [
  {
    title: "Great deals.",
    highlight: "Better choices.",
    description:
      "Discover everyday essentials, trending styles and technology for less.",
    offer: "UP TO 40% OFF",
    button: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85",
  },

  {
    title: "Upgrade your",
    highlight: "everyday.",
    description:
      "Explore headphones, smart watches and gadgets made for your lifestyle.",
    offer: "EXPLORE GADGETS",
    button: "Explore Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85",
  },

  {
    title: "Find your",
    highlight: "next favourite.",
    description:
      "Refresh your wardrobe with styles and accessories for every day.",
    offer: "NEW ARRIVALS",
    button: "Explore Fashion",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85",
  },
];

function HeroSlider() {
  const [active, setActive] = useState(0);

  /* AUTOMATIC SLIDING */
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => {
        return (current + 1) % slides.length;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  /* PREVIOUS */
  const previousSlide = () => {
    setActive((current) => {
      return current === 0 ? slides.length - 1 : current - 1;
    });
  };

  /* NEXT */
  const nextSlide = () => {
    setActive((current) => {
      return (current + 1) % slides.length;
    });
  };

  const slide = slides[active];

  return (
    <section className="hero-slider">

      {/* TEXT */}
      <div className="hero-content">

        <span className="hero-label">
          SHOPZONE SPECIAL
        </span>

        <h1>
          {slide.title}
          <br />
          <span>{slide.highlight}</span>
        </h1>

        <p>
          {slide.description}
        </p>

        <strong className="hero-offer">
          {slide.offer}
        </strong>

        <Link
          to="/products"
          className="hero-button"
        >
          {slide.button}
          <span>→</span>
        </Link>

      </div>

      {/* IMAGE */}
      <div className="hero-image-area">

        <img
          key={slide.image}
          src={slide.image}
          alt={slide.title}
          className="hero-image"
        />

        {/* PREVIOUS BUTTON */}
        <button
          className="hero-arrow hero-prev"
          onClick={previousSlide}
          aria-label="Previous slide"
        >
          ←
        </button>

        {/* NEXT BUTTON */}
        <button
          className="hero-arrow hero-next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          →
        </button>

      </div>

      {/* DOTS */}
      <div className="hero-dots">

        {slides.map((item, index) => (
          <button
            key={item.title}
            className={
              index === active
                ? "hero-dot active"
                : "hero-dot"
            }
            onClick={() => setActive(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}

      </div>

    </section>
  );
}

export default HeroSlider;