export default function ProductForm({
  productName,
  brand,
  image,
  price,
  handleOnSubmit,
  handleOnChange,
}) {
  return (
    <div className="productForm">
      <p>Product Form</p>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="productName"
          id="productName"
          value={productName}
          onChange={handleOnChange}
          placeholder="Name"
          required
        />
        <br />
        <input
          type="text"
          name="brand"
          id="brand"
          value={brand}
          onChange={handleOnChange}
          placeholder="Brand"
          required
        />
        <br />
        <input
          type="text"
          name="image"
          id="image"
          value={image}
          onChange={handleOnChange}
          placeholder="Image"
          required
        />
        <br />
        <input
          type="text"
          name="price"
          id="price"
          value={price}
          onChange={handleOnChange}
          placeholder="Price"
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
