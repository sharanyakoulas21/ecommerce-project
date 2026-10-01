import "./ProductList.css";

function ProductList({ products, onAddToCart }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div className="product-card" key={product.id}>

          <div className="product-image-wrapper">
            <img
              src={
                product.image ||
                product.imageUrl ||
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
              }
              alt={product.name}
              className="product-image"
              onError={(event) => {
                event.currentTarget.src =
                  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600";
              }}
            />

            <span className="product-badge">
              New
            </span>
          </div>

          <div className="product-info">

            <span className="product-category">
              {product.category || "Product"}
            </span>

            <h3 className="product-name">
              {product.name}
            </h3>

            <div className="product-rating">
              <span>★★★★★</span>
              <small>4.8</small>
            </div>

            <div className="product-bottom">

              <strong className="product-price">
                ₹{Number(product.price || 0).toFixed(2)}
              </strong>

              <button
                className="add-button"
                onClick={() => onAddToCart(product)}
              >
                +
              </button>

            </div>

          </div>

        </div>
      ))}
    </div>
  );
}

export default ProductList;
