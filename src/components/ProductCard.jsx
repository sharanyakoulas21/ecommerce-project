import "./ProductCard.css";

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  onView,
  isWishlisted = false,
}) {
  if (!product) return null;

  const discount =
    product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : 0;

  const handleAddToCart = () => {
    if (typeof onAddToCart === "function") {
      onAddToCart(product);
    } else {
      console.error("Add to Cart function was not provided.");
    }
  };

  const handleView = () => {
    if (typeof onView === "function") {
      onView(product);
    } else {
      console.error("View function was not provided.");
    }
  };

  return (
    <article className="catalogue-card">
      <div className="catalogue-image">
        {discount > 0 && (
          <span className="discount-badge">{discount}% OFF</span>
        )}

        <button
          type="button"
          className={`wishlist ${isWishlisted ? "wishlist-active" : ""}`}
          onClick={() => onToggleWishlist?.(product)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>

        <img src={product.image} alt={product.name} loading="lazy" />
      </div>

      <div className="catalogue-info">
        <span className="catalogue-category">{product.category}</span>
        <h3>{product.name}</h3>

        <div className="product-rating">
          <span>★</span>
          <span>{product.rating ?? 4.5}</span>
          <small>({product.reviews ?? 0} reviews)</small>
        </div>

        <div className="catalogue-price">
          <strong>
            ₹{Number(product.price).toLocaleString("en-IN")}
          </strong>

          {discount > 0 && (
            <del>
              ₹{Number(product.oldPrice).toLocaleString("en-IN")}
            </del>
          )}
        </div>

        <button
          type="button"
          className="catalogue-cart"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

        <button
          type="button"
          className="catalogue-view"
          onClick={handleView}
        >
          View
        </button>
      </div>
    </article>
  );
}