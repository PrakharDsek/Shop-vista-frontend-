import { useState } from "react";
import ProductShowCaser from "./ProductShowCaser";
import axios from "axios";
const AllProducts = ({ BackendURL, userId }) => {
  const [products, setProduct] = useState([]);
  const getProducts = async () => {
    const getProduct = await axios.get(
      `${BackendURL}/products/getByUserId?userId=${userId}`
    );
    setProduct(getProduct.data.data);
  };
  useState(() => {
    getProducts()
  })
  return (
    <div style={{ margin: "8rem", display: "flex",flexWrap:"wrap" }}>
      {products
        ? products.map((i) => (
            <>
              <ProductShowCaser
              style={{margin:"2rem"}}
                ImgUrl={i.ImageURL}
                Name={i.Name}
                Price={i.Price}
                Type={"You products"}
                ProductId={i._id}
              />
            </>
          ))
        : ""}
    </div>
  );
};

export default AllProducts;
