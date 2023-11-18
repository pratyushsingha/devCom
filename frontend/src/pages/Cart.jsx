import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import CartItems from "../components/CartItems";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, checkout } = useContext(AppContext);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setCartTotal(
      cart.cartItem.reduce((acc, crr) => acc + crr.price * crr.quantity, 0)
    );
    // console.log(cartTotal);
  }, [cart.cartItem]);
  const totalPrice = cartTotal + 10;
  console.log(totalPrice);

  // useEffect(console.log(cart.cartItem), [cart]);
  // console.log(cart.cartItem.price)

  return (
    <>
      {cart.cartItem.length > 0 ? (
        <>
          <div className="container mx-auto mt-10">
            <div className="flex shadow-md my-10">
              <div className="w-3/4 bg-white px-10 py-10">
                <div className="flex justify-between border-b pb-8">
                  <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                  <h2 className="font-semibold text-2xl">
                    {cart.cartItem.length} Items
                  </h2>
                </div>
                <div className="flex mt-10 mb-5">
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                    Product Details
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                    Quantity
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                    Price
                  </h3>
                </div>
                {cart.cartItem.map((item, index) => (
                  <CartItems item={item} key={index} />
                ))}
                <Link
                  to={"/products"}
                  className="flex font-semibold text-indigo-600 text-sm mt-10"
                >
                  <svg
                    className="fill-current mr-2 text-indigo-600 w-4"
                    viewBox="0 0 448 512"
                  >
                    <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
              <div id="summary" className="w-1/4 px-8 py-10">
                <h1 className="font-semibold text-2xl border-b pb-8">
                  Order Summary
                </h1>
                <div className="flex justify-between mt-10 mb-5">
                  <span className="font-semibold text-sm uppercase">
                    Items {cart.cartItem.length}
                  </span>
                  <span className="font-semibold text-sm">₹ {cartTotal}</span>
                </div>
                <div>
                  <label className="font-medium inline-block mb-3 text-sm uppercase">
                    Shipping
                  </label>
                  <select className="block p-2 text-gray-600 w-full text-sm">
                    <option>Standard shipping - $10.00</option>
                  </select>
                </div>
                <div className="border-t mt-8">
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Total cost</span>
                    <span>₹ {totalPrice}</span>
                  </div>
                  <button
                    onClick={() => checkout(totalPrice)}
                    className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <h1 className="text-2xl flex justify-center items-center h-screen">
            Cart is empty
          </h1>
        </div>
      )}
    </>
  );
};

export default Cart;
