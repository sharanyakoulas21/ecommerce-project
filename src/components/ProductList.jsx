
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import "./ProductList.css";

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Sports",
  "Accessories",
  "Beauty",
  "Home",
  "Appliances",
  "Grocery",
  "Offers",
];

export default function ProductList({
  products = [],
  onAddToCart,
  wishlist = [],
  onToggleWishlist,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";
  const sort = searchParams.get("sort") || "default";

  function updateFilter(key, value) {
    const nextParams = new URLSearchParams(searchParams);

    if (
      !value ||
      value === "All" ||
      value === "default"
    ) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }

    setSearchParams(nextParams);
  }

  function clearFilters() {
    setSearchParams({});
  }

  const filteredProducts = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    let result = products.filter((product) => {
      const matchesSearch =
        !searchText ||
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" ||
        (category === "Offers"
          ? Number(product.oldPrice) > Number(product.price)
          : product.category.toLowerCase() ===
            category.toLowerCase());

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort(
        (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
      );
    }

    return result;
  }, [products, search, category, sort]);

  return (
    <main className="products-page">
      <header className="products-heading">
        <div>
          <h1>
            {category === "All"
              ? "Explore All Products"
              : category === "Offers"
                ? "Special Offers"
                : `${category} Products`}
          </h1>

          {search && (
            <p>
              Search results for: <strong>{search}</strong>
            </p>
          )}

          <p>
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {(search || category !== "All" || sort !== "default") && (
          <button
            type="button"
            className="clear-filters-button"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        )}
      </header>

      <section className="product-toolbar">
        <div className="category-filters">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={
                category === item
                  ? "filter-active"
                  : ""
              }
              onClick={() => updateFilter("category", item)}
            >
              {item}
            </button>
          ))}
        </div>

        <label className="sort-control">
          <span>Sort by:</span>

          <select
            value={sort}
            onChange={(event) =>
              updateFilter("sort", event.target.value)
            }
          >
            <option value="default">Recommended</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </label>
      </section>

      {filteredProducts.length > 0 ? (
        <section className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.some(
                (item) => item.id === product.id
              )}
            />
          ))}
        </section>
      ) : (
        <section className="empty-products">
          <h2>No products found</h2>
          <p>
            We couldn't find any products matching your
            search or selected category.
          </p>

          <button
            type="button"
            onClick={clearFilters}
          >
            View All Products
          </button>
        </section>
      )}
    </main>
  );
}