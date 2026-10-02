import React, { useState } from "react";

function Checkout({ cart, onBack, onPlaceOrder }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onPlaceOrder({
      ...formData,
      total,
    });
  };

  return (
    <section className="checkout-section">

      {/* Header */}
      <div className="checkout-header">
        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ← Back to Cart
        </button>

        <div>
          <h2>Checkout</h2>
          <p>Complete your details to place your order.</p>
        </div>
      </div>

      <div className="checkout-layout">

        {/* Customer Details */}
        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >
          <div className="checkout-card">

            <div className="checkout-card-title">
              <h3>Contact Information</h3>
              <p>Enter your contact details</p>
            </div>

            <div className="form-grid">

              <div className="form-group full-width">
                <label htmlFor="fullName">
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>
          </div>

          {/* Delivery Address */}
          <div className="checkout-card">

            <div className="checkout-card-title">
              <h3>Delivery Address</h3>
              <p>Where should we deliver your order?</p>
            </div>

            <div className="form-grid">

              <div className="form-group full-width">
                <label htmlFor="address">
                  Street Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  placeholder="House number, street, area"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">
                  State
                </label>

                <input
                  id="state"
                  name="state"
                  type="text"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="pincode">
                  PIN Code
                </label>

                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  placeholder="6-digit PIN"
                  value={formData.pincode}
                  onChange={handleChange}
                  maxLength="6"
                  required
                />
              </div>

            </div>
          </div>

          <button
            type="submit"
            className="place-order-button"
          >
            Place Order
          </button>

        </form>

        {/* Order Review */}
        <aside className="checkout-summary">

          <h3>Order Review</h3>

          <div className="checkout-items">

            {cart.map((item) => (
              <div
                className="checkout-item"
                key={item.id}
              >

                <div className="checkout-item-image">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  ) : (
                    <span>🛍️</span>
                  )}
                </div>

                <div className="checkout-item-info">
                  <h4>{item.name}</h4>

                  <p>
                    Qty: {item.quantity}
                  </p>
                </div>

                <strong>
                  ₹
                  {(
                    Number(item.price) * item.quantity
                  ).toLocaleString("en-IN")}
                </strong>

              </div>
            ))}

          </div>

          <div className="checkout-summary-divider"></div>

          <div className="checkout-summary-row">
            <span>Subtotal</span>
            <span>
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="checkout-summary-row">
            <span>Delivery</span>
            <span className="free-text">
              FREE
            </span>
          </div>

          <div className="checkout-summary-divider"></div>

          <div className="checkout-total">
            <span>Total</span>
            <strong>
              ₹{total.toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="checkout-security">
            🔒 Secure order processing
          </div>

        </aside>

      </div>

    </section>
  );
}

export default Checkout;