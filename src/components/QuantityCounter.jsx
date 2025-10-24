//JACOB TUMMON
//Reusable component we use extensively in this project

export default function QuantityCounter({
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
}) {
  return (
    <div className="ProductQuantityDiv">
      <button
        className="QuantityBtn"
        onClick={() => handleRemoveQuantity(productQuantity.id)}
      >
        -
      </button>

      <button
        className="QuantityBtn"
        onClick={() => handleAddQuantity(productQuantity.id)}
      >
        +
      </button>
    </div>
  );
}
