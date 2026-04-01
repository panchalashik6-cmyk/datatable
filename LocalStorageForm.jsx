import React, { useState, useEffect } from "react";

export default function ProductPage() {

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: ""
  });

  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const oldData = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(oldData);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let updated;

    if (editIndex !== null) {
      updated = [...products];
      updated[editIndex] = product;
      setEditIndex(null);
    } else {
      updated = [...products, product];
    }

    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));

    setProduct({
      name: "",
      price: "",
      image: "",
      category: ""
    });
  }

  function Delete(i) {
    let data = products.filter((_, index) => index !== i);
    setProducts(data);
    localStorage.setItem("products", JSON.stringify(data));
  }

  function Edit(i) {
    setProduct(products[i]);
    setEditIndex(i);
  }

  return (
    <div className="container mt-5">

      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Add Product</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="form-control mb-2"
            value={product.name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            className="form-control mb-2"
            value={product.price}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="form-control mb-2"
            value={product.image}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            className="form-control mb-2"
            value={product.category}
            onChange={handleChange}
          />

          <button className="btn btn-primary w-100">
            Save Product
          </button>

        </form>
      </div>

      <div className="mt-4 text-end">
        <input
          type="text"
          placeholder="Search product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort</option>
          <option value="low">Price Low</option>
          <option value="high">Price High</option>
        </select>
      </div>

      <div className="row mt-4">

        {products
          .filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) => {
            if (sort === "low") return a.price - b.price;
            if (sort === "high") return b.price - a.price;
            return 0;
          })
          .map((item, i) => (

            <div className="col-md-3 mb-4" key={i}>
              <div className="card p-3 shadow">

                <img
                  src={item.image}
                  alt=""
                  style={{ height: "150px", objectFit: "contain" }}
                />

                <h5 className="mt-2">{item.name}</h5>
                <p> {item.price}</p>
                <p>{item.category}</p>

                <button
                  className="btn btn-danger btn-sm ms-1"
                  onClick={() => Delete(i)}
                >
                  Delete
                </button>

                <button
                  className="btn btn-success btn-sm ms-1"
                  onClick={() => Edit(i)}
                >
                  Edit
                </button>

              </div>
            </div>

          ))}

      </div>

    </div>
  );
}