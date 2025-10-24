import ProductCard from "./ProductCard";

//JACOB TUMMON
//Container for every single product

export default function ProductsContainer({
  products = [],
  handleQuantityChange,
  handleAddToCart,
}) {
  return (
    <div className="ProductsContainer">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product} //id, image, productName, brand, price, quantity
          handleQuantityChange={handleQuantityChange}
          handleAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}
