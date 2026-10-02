
import { useEffect, useState } from "react";
import "./HeroSlider.css";

const slides = [
  {
    title: "Big Savings, Better Shopping!",
    subtitle: "Discover your favourite products at amazing prices.",
    button: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Upgrade Your Lifestyle",
    subtitle: "Explore electronics, fashion and everyday essentials.",
    button: "Explore Products",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Your Next Favourite Find",
    subtitle: "Great products for every moment.",
    button: "Discover More",
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1400&q=85",
  },
];

export default function HeroSlider({ onShopNow }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="shopzone-slider">
      {slides.map((slide, index) => (
        <div
          key={slide.title}
          className={`shopzone-slide ${
            active === index ? "active" : ""
          }`}
          style={{ backgroundImage: `url("${slide.image}")` }}
          aria-hidden={active !== index}
        >
          <div className="shopzone-slide-content">
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
            <button onClick={onShopNow}>{slide.button}</button>
          </div>
        </div>
      ))}

      <button
        className="shopzone-arrow previous"
        onClick={() =>
          setActive((active - 1 + slides.length) % slides.length)
        }
        aria-label="Previous slide"
      >
        &#10094;
      </button>

      <button
        className="shopzone-arrow next"
        onClick={() => setActive((active + 1) % slides.length)}
        aria-label="Next slide"
      >
        &#10095;
      </button>

      <div className="shopzone-dots">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            className={active === index ? "selected" : ""}
            onClick={() => setActive(index)}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}