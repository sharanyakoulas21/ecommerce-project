import ProductCard from "./ProductCard";

function ProductList({ products, onAddToCart }) {
  return (
    <div>
      <h2>Products</h2>

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;