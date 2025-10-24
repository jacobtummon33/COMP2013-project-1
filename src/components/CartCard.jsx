import QuantityCounter from "./QuantityCounter";

//JACOB TUMMON
//I tried to do both products and cart in as similar fashion as possible
//Individual boxes for cart

export default function CartCard({
  id,
  image,
  productName,
  price,
  quantity,
  handleCartQuantityChange,
  handleRemoveFromCart,
}) {
  return (
    <div className="CartCard">
      <div className="CartCardInfo">
        <p className="CartProductName"> {productName} </p>
        <img src={image} alt={productName} className="CartProductImage" />
        <p className="CartProductPrice">{price}</p>
      </div>

      <QuantityCounter
        productQuantity={{ id, quantity }}
        handleAddQuantity={(id) => handleCartQuantityChange(id, 1)}
        handleRemoveQuantity={(id) => handleCartQuantityChange(id, -1)}
      />

      <div className="RemoveAndTotal">
        <p className="Subtotal">
          Total: $
          {(Number(String(price).replace("$", "")) * quantity).toFixed(2)}{" "}
        </p>
        <button
          className="RemoveFromCart"
          onClick={() => handleRemoveFromCart(id)}
        >
          Remove From Cart
        </button>
      </div>
    </div>
  );
}
