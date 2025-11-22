import ProductCard from "./ProductCard";

// JACOB TUMMON
// Container for every single product

export default function ProductsContainer({
  products = [],
  productsQuantity = [],
  handleQuantityChange,
  handleAddToCart,
  handleFormEdit,
  handleDeleteProduct,
}) {
  return (
    <div className="ProductsContainer">
      {products.map((product) => {
        const qty =
          productsQuantity.find((p) => p.id === product._id)?.quantity ?? 0;

        return (
          <ProductCard
            key={product._id}
            _id={product._id}
            image={product.image}
            productName={product.productName}
            brand={product.brand}
            price={product.price}
            quantity={qty}
            handleQuantityChange={handleQuantityChange}
            handleAddToCart={handleAddToCart}
            handleFormEdit={handleFormEdit}
            handleDeleteProduct={handleDeleteProduct}
          />
        );
      })}
    </div>
  );
}
