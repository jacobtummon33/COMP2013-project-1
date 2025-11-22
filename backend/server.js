//JACOB TUMMON
//BACKEND SERVER FILE

//Imports
require("dotenv").config();
const express = require("express");
const server = express();
const port = 3000;
const { DB_URI } = process.env;
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/products");

//Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

//Connecting to the database
mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Database connected, listening on: ${port}`);
    });
  })
  .catch((error) => console.log(error.message));

//Routes
//Root route
server.get("/", (request, response) => {
  response.send("Servers live.");
});

//Getting products
server.get("/products", async (request, response) => {
  try {
    const products = await Product.find();
    response.send(products);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

//Adding a new product
server.post("/products", async (request, response) => {
  const newProduct = new Product({
    id: request.body.id,
    productName: request.body.productName,
    brand: request.body.brand,
    image: request.body.image,
    price: request.body.price,
  });

  try {
    await newProduct.save();
    response.send({ message: `Product has been added!` });
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

//Updating a product
server.patch("/products/:id", async (request, response) => {
  const { id } = request.params;
  const { productName, brand, image, price } = request.body;
  try {
    await Product.findByIdAndUpdate(id, {
      productName,
      brand,
      image,
      price,
    });
    response.send({ message: "Product updated" });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

//Delete a product
server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;
  try {
    await Product.findByIdAndDelete(id);
    response.send({ message: `Product deleted` });
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});
