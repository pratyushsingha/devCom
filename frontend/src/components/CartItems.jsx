import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const CartItems = ({ item }) => {
  // console.log(item);
  const { selectedColor, removeFromCart } = useContext(AppContext);

  return (
    <>
      <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
        <div className="flex w-2/5">
          {" "}
          <Link to={`/product/${item.id}`}>
            <div className="w-20">
              <img className="h-24" src={item.image} alt={item.name} />
            </div>
          </Link>
          <div className="flex flex-col justify-between ml-4 flex-grow">
            <span className="font-bold text-sm">{item.name}</span>
            <span className="text-red-500 text-xs">{item.company}</span>
          </div>
        </div>
        <div className="flex justify-center w-1/5">
          <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
          <input
            className="mx-2 border text-center w-8"
            type="text"
            defaultValue={1}
          />
          <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </div>
        <span className="text-center w-1/5 font-semibold text-sm">
        ₹ {item.price}
        </span>
        <button
          onClick={() => removeFromCart(item.id)}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase"
        >
          Remove
        </button>
      </div>
    </>
  );
};

export default CartItems;
