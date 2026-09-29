function Checkout({ cart, onPlaceOrder }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleSubmit(event) {
    event.preventDefault();

    const customer = {
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      address: event.target.address.value,
    };

    onPlaceOrder(customer);
  }

  return (
    <div>
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" required />
        </div>

        <br />

        <div>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>

        <br />

        <div>
          <label>Phone:</label>
          <input type="tel" name="phone" required />
        </div>

        <br />

        <div>
          <label>Address:</label>
          <textarea name="address" required></textarea>
        </div>

        <h3>Order Summary</h3>

        {cart.map((item) => (
          <p key={item.id}>
            {item.name} × {item.quantity} = ₹
            {item.price * item.quantity}
          </p>
        ))}

        <h3>Total: ₹{total}</h3>

        <button type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;