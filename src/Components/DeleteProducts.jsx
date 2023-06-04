import { useState } from "react";
import SelectCartModel from "./SearchProductModel";
import axios from "axios";
const DeleteProducts = ({ BackendURL, userId }) => {
  const [products, setProduct] = useState([]);
  const getProducts = async () => {
    const getProduct = await axios.get(
      `${BackendURL}/products/getByUserId?userId=${userId}`
    );
    setProduct(getProduct.data.data);
  };
  useState(() => {
    getProducts();
  });
  return (
    <div style={{ width: "90%" }}>
      {products && products.length>0
        ? products.map((i) => (
            <>
              <SelectCartModel
                style={{ margin: "2rem" }}
                ImageURL={i.ImageURL}
                Name={i.Name}
                Offer={i.Offer}
                Description={i.Description}
                ProductPrice={i.Price}
                icon={"delete"}
                BackendURL={BackendURL}
                ProductId={i._id}
                functionDelete={getProducts}
              />
            </>
          ))
        : <>
        <h1 style={{color:"black",textAlign:"center"}}>No product available to delete</h1>
        </>
        }
    </div>
  );
};

export default DeleteProducts;
