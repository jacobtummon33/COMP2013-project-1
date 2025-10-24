import QuantityCounter from "./QuantityCounter";

//JACOB TUMMON
//Individual product boxes

export default function ProductCard({
  id,
  image,
  productName,
  brand,
  price,
  quantity, //Current amount selected for the product
  handleQuantityChange,
  handleAddToCart,
}) {
  return (
    <div className="ProductCard">
      <p className="ProductName">{productName}</p>
      <img src={image} alt={productName} className="ProductImage"></img>
      <p className="ProductBrand">{brand} </p>
      <p className="ProductPrice"> {price} </p>

      <QuantityCounter
        productQuantity={{ id, quantity }}
        handleAddQuantity={(id) => handleQuantityChange(id, 1)}
        handleRemoveQuantity={(id) => handleQuantityChange(id, -1)}
      />

      <p className="SelectedAmount">Selected: {quantity}</p>

      <button
        className="AddToCart"
        onClick={() => handleAddToCart(id, quantity)}
      >
        Add to cart
      </button>
    </div>
  );
}
