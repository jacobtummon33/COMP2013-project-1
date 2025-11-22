import { useState, useEffect } from "react";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";
import NavBar from "./NavBar";
import axios from "axios";
import ProductForm from "./ProductForm";

//JACOB TUMMON

//The meat of this project, where all of the logic sits
//This project is branched from project 1

//This project gave me a massize headache unfortunately, and is not as clean as I would've liked it to be
//I tried my best to keep things clean, however, I spent about 5 hours straight trying to fix my mongoDB connection
//I am running really low on time, and will not be able to fix this to be perfect
//I kept flip-flopping between thinking the issue was frontend or backend, which is why theres weird choices
//like frequently using _id instead of id, unfortunately I just simply don't have enough time to fix it, as I am writing this at 10:44 PM

export default function GroceriesAppContainer() {
  const [products, setProducts] = useState([]);
  const [productsQuantity, setProductsQuantity] = useState([]);
  const [postResponse, setPostResponse] = useState("");
  const [formData, setFormData] = useState({
    _id: "",
    productName: "",
    brand: "",
    image: "",
    price: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const [cart, setCart] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
      console.log(
        "Fetched products:",
        Array.isArray(response.data) ? response.data.length : response.data
      );
      setProductsQuantity(
        response.data.map((p) => ({ id: p._id, quantity: 0 }))
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  //Add selected amount into cart
  //If quantity is 0, do nothing and alert
  //Otherwise, push new item
  const handleAddToCart = (_id) => {
    const product = products.find((p) => p._id === _id);
    const selected = productsQuantity.find((q) => q.id === _id)?.quantity ?? 0;
    if (selected === 0) {
      alert("Please select an amount before adding to your cart");
      return;
    }

    const updatedCart = [...cart];

    //See if product already exists
    const existingProduct = updatedCart.find((item) => item._id === _id);

    if (existingProduct) {
      existingProduct.quantity += selected;
    } else {
      updatedCart.push({ ...product, quantity: selected });
    }

    setCart(updatedCart);
  };

  //Change selected quantity before adding to cart
  const handleQuantityChange = (_id, amount) => {
    const updated = productsQuantity.map((pq) => {
      if (pq.id !== _id) return pq;
      const next = pq.quantity + amount;
      return { ...pq, quantity: Math.max(0, next) };
    });
    setProductsQuantity(updated);
  };

  //Cart version
  //Unlike product version, cannot go below 1
  //If youd like to fully remove from cart, you have to press the remove button
  const handleCartQuantityChange = (_id, amount) => {
    const updatedCart = cart.map((item) => {
      if (item._id === _id) {
        const newQuantity = item.quantity + amount;
        if (newQuantity < 1) {
          return { ...item, quantity: 1 };
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCart(updatedCart);
  };

  //Remove an item from cart using it's id
  const handleRemoveFromCart = (_id) => {
    const updatedCart = cart.filter((item) => item._id !== _id);
    setCart(updatedCart);
  };

  //Empty the cart
  const handleEmptyCart = () => {
    setCart([]);
  };

  //Forms
  //Keep form state in sync
  const handleFormChange = (e) => {
    setFormData((previousData) => {
      return { ...previousData, [e.target.name]: e.target.value };
    });
  };

  //Start editing a product
  //Load product into form and toggle editing mode
  // (important to distinguish between submitting and editing)
  const handleFormEdit = (_id) => {
    const p = products.find((x) => x._id === _id);
    if (!p) return;
    setFormData({
      _id: p._id,
      productName: p.productName,
      brand: p.brand,
      image: p.image,
      price: p.price,
    });
    setIsEditing(true);
  };

  //Submit form that patches when editing, and posts when were adding a new product
  //Also refreshes lists as the product simply doesn't disappear otherwise

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        const response = await axios.patch(
          `http://localhost:3000/products/${formData._id}`,
          formData
        );
        setPostResponse(response.data.message);
        setIsEditing(false);
      } else {
        const response = await axios.post(
          "http://localhost:3000/products",
          formData
        );
        setPostResponse(response.data.message);
      }
      setFormData({
        productName: "",
        brand: "",
        image: "",
        price: "",
        _id: "",
      });

      await fetchProducts();
    } catch (error) {
      console.log(error.message);
    }
  };

  //Delete a product using it's _id,
  // we then remove it from products, quantities, and cart
  const handleDeleteProduct = async (_id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${_id}`);
      setProducts((prev) => prev.filter((p) => p._id !== _id));
      setProductsQuantity((prev) => prev.filter((q) => q.id !== _id));
      setCart((prev) => prev.filter((item) => item._id !== _id));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <NavBar cart={cart} />
      <div className="GroceriesApp-Container">
        <ProductForm
          productName={formData.productName}
          brand={formData.brand}
          image={formData.image}
          price={formData.price}
          handleOnSubmit={handleFormSubmit}
          handleOnChange={handleFormChange}
        />

        <ProductsContainer
          products={products}
          productsQuantity={productsQuantity}
          handleQuantityChange={handleQuantityChange}
          handleAddToCart={handleAddToCart}
          handleFormEdit={handleFormEdit}
          handleDeleteProduct={handleDeleteProduct}
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
