function Cart({ cart, onRemove, onIncrease, onDecrease }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>

              <p>Price: ₹{item.price}</p>

              <button onClick={() => onDecrease(item.id)}>
                -
              </button>

              <span> {item.quantity} </span>

              <button onClick={() => onIncrease(item.id)}>
                +
              </button>

              <button onClick={() => onRemove(item.id)}>
                Remove
              </button>

              <p>
                Subtotal: ₹{item.price * item.quantity}
              </p>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>
        </>
      )}
    </div>
  );
}

export default Cart;