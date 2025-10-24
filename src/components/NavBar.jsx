import cartFull from "../assets/cart-full.png";
import cartEmpty from "../assets/cart-empty.png";

//JACOB TUMMON
//Basic NavBar, uses a ternary to switch between the two icons depending on if we have a cart or not

export default function NavBar({ cart }) {
  return (
    <div className="NavBar">
      <div className="NavUser">
        <p>Hello User</p>
      </div>
      <div className="NavTitle">
        <h1>Grocery App</h1>
      </div>

      <img
        src={cart.length > 0 ? cartFull : cartEmpty}
        alt=""
        className="NavCart"
      />
    </div>
  );
}
