import React from "react";

function Cart({
  cart,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
}) {
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <section className="cart-section">
        <div className="cart-header">
          <div>
            <h2>Shopping Cart</h2>
            <p>Your selected products will appear here.</p>
          </div>
        </div>

        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>

          <h3>Your cart is empty</h3>

          <p>
            Looks like you haven't added anything to your cart yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-section">

      {/* Cart Header */}
      <div className="cart-header">
        <div>
          <h2>Shopping Cart</h2>
          <p>
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>
      </div>

      <div className="cart-layout">

        {/* Cart Items */}
        <div className="cart-items">

          {cart.map((item) => (
            <div className="cart-item" key={item.id}>

              {/* Product Image */}
              <div className="cart-product-image">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                ) : (
                  <span>🛍️</span>
                )}
              </div>

              {/* Product Information */}
              <div className="cart-product-info">

                <span className="cart-product-category">
                  {item.category || "Product"}
                </span>

                <h3>{item.name}</h3>

                <p className="cart-product-price">
                  ₹{Number(item.price).toLocaleString("en-IN")}
                </p>

                <button
                  className="remove-button"
                  onClick={() => onRemove(item.id)}
                >
                  Remove
                </button>

              </div>

              {/* Quantity */}
              <div className="quantity-control">

                <button
                  onClick={() => onDecrease(item.id)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => onIncrease(item.id)}
                  aria-label="Increase quantity"
                >
                  +
                </button>

              </div>

              {/* Item Total */}
              <div className="cart-item-total">
                ₹
                {(
                  Number(item.price) * item.quantity
                ).toLocaleString("en-IN")}
              </div>

            </div>
          ))}

        </div>

        {/* Order Summary */}
        <aside className="order-summary">

          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span className="free-text">
              FREE
            </span>
          </div>

          <div className="summary-row">
            <span>Taxes</span>
            <span>Included</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total</span>
            <strong>
              ₹{total.toLocaleString("en-IN")}
            </strong>
          </div>

          <button
            className="checkout-button"
            onClick={onCheckout}
          >
            Proceed to Checkout
          </button>

          <p className="secure-text">
            Secure checkout • Your information is protected
          </p>

        </aside>

      </div>

    </section>
  );
}

export default Cart;