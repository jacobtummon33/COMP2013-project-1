import QuantityCounter from "./QuantityCounter";

//JACOB TUMMON
//Individual product boxes

export default function ProductCard({
  _id,
  image,
  productName,
  brand,
  price,
  quantity,
  handleQuantityChange,
  handleAddToCart,
  handleFormEdit,
  handleDeleteProduct,
}) {
  return (
    <div className="ProductCard">
      <p className="ProductName">{productName}</p>
      <img src={image} alt={productName} className="ProductImage" />
      <p className="ProductBrand">{brand}</p>
      <p className="ProductPrice">{price}</p>

      <QuantityCounter
        productQuantity={{ id: _id, quantity }}
        handleAddQuantity={(id) => handleQuantityChange(id, 1)}
        handleRemoveQuantity={(id) => handleQuantityChange(id, -1)}
      />

      <p className="SelectedAmount">Selected: {quantity}</p>

      <button className="AddToCart" onClick={() => handleAddToCart(_id)}>
        Add to cart
      </button>
      <button onClick={() => handleFormEdit(_id)}>Edit?</button>
      <button onClick={() => handleDeleteProduct(_id)}>Delete?</button>
    </div>
  );
}
