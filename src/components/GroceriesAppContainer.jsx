import { useState } from "react";
import produceData from "../data/products";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";
import NavBar from "./NavBar";

//JACOB TUMMON

//The meat of this project, where all of the logic sits

export default function GroceriesAppContainer() {
  const [products, setProducts] = useState(
    produceData.map((p) => ({ ...p, quantity: 0 }))
  );

  //Our cart starts empty, all items are copies of data from product
  const [cart, setCart] = useState([]);

  //Add selected amount into cart
  //If quantity is 0, do nothing and alert
  //Otherwise, push new item
  const handleAddToCart = (id, quantity) => {
    const product = products.find((p) => p.id === id);
    if (quantity === 0) {
      alert("Please select an amount before adding to your cart!");
      return;
    }

    const updatedCart = [...cart];

    //See if product already exists
    const existingProduct = updatedCart.find((item) => item.id === id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      updatedCart.push({ ...product, quantity });
    }

    setCart(updatedCart);
  };

  //Change selected amount on a product, cart has its own version
  //Cannot go below 0
  const handleQuantityChange = (id, amount) => {
    const updatedProducts = products.map((product) => {
      let updatedProduct = { ...product };

      if (updatedProduct.id === id) {
        let newQuantity = updatedProduct.quantity + amount;

        if (newQuantity < 0) {
          newQuantity = 0; //Will never go below 0
        }

        updatedProduct.quantity = newQuantity;
      }
      return updatedProduct;
    });

    setProducts(updatedProducts);
  };

  //Cart version
  //Unlike product version, cannot go below 1
  //If youd like to fully remove from cart, you have to press the remove button
  const handleCartQuantityChange = (id, amount) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + amount;
        if (newQuantity < 1) {
          return { ...item, quantity: 1 }; //Will not go below 1
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCart(updatedCart);
  };

  //Remove an item from cart using it's id
  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  //Empty the cart
  const handleEmptyCart = () => {
    setCart([]);
  };

  return (
    <div>
      <NavBar cart={cart} />
      <div className="GroceriesApp-Container">
        <ProductsContainer
          products={products}
          handleQuantityChange={handleQuantityChange}
          handleAddToCart={handleAddToCart}
        />

        <CartContainer
          cart={cart}
          handleCartQuantityChange={handleCartQuantityChange}
          handleRemoveFromCart={handleRemoveFromCart}
          handleEmptyCart={handleEmptyCart}
        />
      </div>
    </div>
  );
}
