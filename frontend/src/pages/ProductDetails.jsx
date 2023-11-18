import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, wishList, addToWish, addToCart, removeFromWish, cart } =
    useContext(AppContext);
  const [ProductDetail, setProductDetail] = useState([]);
  const [showDesc, setShowDesc] = useState(false);

  useEffect(() => {
    const product = products.find((item) => item.id == id);
    setProductDetail([product]);
  }, [products,id]);

  return (
    <>
      {ProductDetail.map((item) => (
        <section
          key={item.id}
          className="text-gray-600 flex justify-center item-center mx-auto body-font overflow-hidden"
        >
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-full mx-auto flex flex-wrap justify-center items-center">
              <img
                alt={item.title}
                className="lg:w-1/6 w-full lg:h-auto h-10 object-cover object-center rounded"
                src={item.image}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {item.brand.toUpperCase()}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {item.title}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center ">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <p>{item.rating.rate}</p>
                    <span className="text-gray-600 ml-3">
                      {item.rating.count} Reviews
                    </span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                      </svg>
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed">
                  {!showDesc
                    ? item.description.slice(0, 100)
                    : item.description}
                  ...
                  <button
                    onClick={() => setShowDesc(!showDesc)}
                    className="font-bold"
                  >
                    {showDesc ? "show less" : "show more"}
                  </button>
                </p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ₹ {item.price}
                  </span>
                  {cart.cartItem.some((itemm) => itemm.id == item.id) ? (
                    <button
                      className="flex ml-auto text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded"
                      onClick={() => navigate("/cart")}
                    >
                      Go to Cart
                    </button>
                  ) : (
                    <button
                      className="flex ml-auto text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded"
                      onClick={() => addToCart(id)}
                    >
                      Add to Cart
                    </button>
                  )}
                  {/* TODO: refactor the removeFromWish....why only id is not working */}
                  {wishList.some((wish) => wish.id == id) ? (
                    <button
                      className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                      onClick={() => removeFromWish(item.id)}
                    >
                      <AiFillHeart className="text-lg" />
                    </button>
                  ) : (
                    <button
                      className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                      onClick={() => addToWish(id)}
                    >
                      <AiOutlineHeart className="text-lg" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default ProductDetails;
