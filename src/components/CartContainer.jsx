import CartCard from "./CartCard";

//JACOB TUMMON
//Again, Similar story to CartCard, tried to make this similar to ProductContainer, but with the required buttons tacked on
//Checkout/BuyButton does nothing, decided to not add any functionality to it, I have been working on this for hours upon hours
export default function CartContainer({
  cart = [],
  handleCartQuantityChange,
  handleRemoveFromCart,
  handleEmptyCart,
}) {
  let itemsCount = 0;
  let sum = 0;

  cart.forEach((item) => {
    itemsCount += item.quantity;
    sum += item.quantity * parseFloat(String(item.price).replace("$", ""));
  });

  if (cart.length === 0) {
    return (
      <div className="CartContainer">
        <p>Your Cart </p>
        <p>No items found</p>
      </div>
    );
  }

  if (cart.length > 0) {
    return (
      <div className="CartContainer">
        <p>Your Cart</p>
        <p>Total Items In Cart: {cart.length}</p>

        {cart.map((item) => (
          <CartCard
            key={item.id}
            {...item}
            handleCartQuantityChange={handleCartQuantityChange}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        ))}

        <div className="CartListBtns">
          <button className="RemoveButton" onClick={handleEmptyCart}>
            Empty Cart
          </button>

          <button id="BuyButton">Checkout {sum.toFixed(2)}</button>
        </div>
      </div>
    );
  }
}
