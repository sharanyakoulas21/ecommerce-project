import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Invoice from "./components/Invoice";
import API_URL from "./api";

function App() {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCheckout, setShowCheckout] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Get products from backend
  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const categories = [
    "All",
    ...new Set(
      products.map((product) => product.category)
    ),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category === selectedCategory
        );

  function handleAddToCart(product) {
    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  }

  function handleRemove(id) {
    setCart(
      cart.filter((item) => item.id !== id)
    );
  }

  function handleIncrease(id) {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  function handleDecrease(id) {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handlePlaceOrder(customerDetails) {
    setCustomer(customerDetails);
    setOrderPlaced(true);
    setShowCheckout(false);
  }

  if (orderPlaced) {
    return (
      <div>
        <Invoice
          customer={customer}
          cart={cart}
        />
      </div>
    );
  }

  return (
    <div>
      <h1>Simple E-Commerce Cart</h1>

      <hr />

      <h2>Categories</h2>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() =>
            setSelectedCategory(category)
          }
        >
          {category}
        </button>
      ))}

      <hr />

      <ProductList
        products={filteredProducts}
        onAddToCart={handleAddToCart}
      />

      <hr />

      <Cart
        cart={cart}
        onRemove={handleRemove}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />

      <hr />

      {cart.length > 0 && !showCheckout && (
        <button
          onClick={() => setShowCheckout(true)}
        >
          Proceed to Checkout
        </button>
      )}

      {showCheckout && (
        <Checkout
          cart={cart}
          onPlaceOrder={handlePlaceOrder}
        />
      )}
    </div>
  );
}

export default App;