import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { products, addToWish, addToCart } = useContext(AppContext);
  const [ProductDetail, setProductDetail] = useState([]);

  useEffect(() => {
    const product = products.find((item) => item.id == id);
    setProductDetail([product]);
  }, [products]);

  return (
    <>
      {ProductDetail.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt="" />
          <p>{item.title}</p>
          <p>{item.description}</p>
          <button onClick={() => addToCart(item.id)}>add to cart</button>
          <button onClick={() => addToWish(id)}>add to wishlist</button>
        </div>
      ))}
    </>
  );
};

export default ProductDetails;
