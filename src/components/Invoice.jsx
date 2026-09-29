function Invoice({ customer, cart }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Invoice</h2>

      <hr />

      <h3>Customer Details</h3>

      <p>Name: {customer.name}</p>
      <p>Email: {customer.email}</p>
      <p>Phone: {customer.phone}</p>
      <p>Address: {customer.address}</p>

      <hr />

      <h3>Order Details</h3>

      {cart.map((item) => (
        <div key={item.id}>
          <p>
            {item.name} × {item.quantity} = ₹
            {item.price * item.quantity}
          </p>
        </div>
      ))}

      <hr />

      <h3>Total Amount: ₹{total}</h3>

      <p>Thank you for your purchase!</p>
    </div>
  );
}

export default Invoice;