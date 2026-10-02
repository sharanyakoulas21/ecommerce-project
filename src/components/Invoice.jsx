import React from "react";

function Invoice({ order, onContinueShopping }) {
  if (!order) {
    return null;
  }

  const total = Number(order.total || 0);

  return (
    <section className="invoice-section">

      {/* Success Message */}
      <div className="order-success">
        <div className="success-icon">✓</div>

        <h2>Order Placed Successfully</h2>

        <p>
          Thank you for your purchase, {order.fullName}.
        </p>

        <span>
          Your order has been received and is being processed.
        </span>
      </div>

      {/* Invoice */}
      <div className="invoice-card">

        <div className="invoice-top">

          <div>
            <div className="invoice-logo">
              SHOP<span>ZONE</span>
            </div>

            <p className="invoice-label">
              Order Confirmation
            </p>
          </div>

          <div className="invoice-order-info">
            <p>
              <strong>Order Date</strong>
            </p>

            <p>
              {new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

        </div>

        <div className="invoice-divider"></div>

        {/* Customer Details */}
        <div className="invoice-details">

          <div>
            <h4>Customer</h4>

            <p>{order.fullName}</p>
            <p>{order.email}</p>
            <p>{order.phone}</p>
          </div>

          <div>
            <h4>Delivery Address</h4>

            <p>{order.address}</p>
            <p>
              {order.city}, {order.state}
            </p>
            <p>PIN: {order.pincode}</p>
          </div>

        </div>

        <div className="invoice-divider"></div>

        {/* Order Status */}
        <div className="order-status">

          <div>
            <span className="status-dot"></span>

            <div>
              <strong>Order Confirmed</strong>

              <p>
                Your order has been successfully placed.
              </p>
            </div>
          </div>

          <span className="status-badge">
            Confirmed
          </span>

        </div>

        <div className="invoice-divider"></div>

        {/* Total */}
        <div className="invoice-total">

          <span>Total Amount</span>

          <strong>
            ₹{total.toLocaleString("en-IN")}
          </strong>

        </div>

      </div>

      {/* Actions */}
      <div className="invoice-actions">

        <button
          className="continue-shopping-button"
          onClick={onContinueShopping}
        >
          Continue Shopping
        </button>

        <button
          className="print-button"
          onClick={() => window.print()}
        >
          Print Order
        </button>

      </div>

    </section>
  );
}

export default Invoice;