import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import WishItems from "../components/WishItems";

const WishList = () => {
  const { wishList } = useContext(AppContext);
  return (
    <>
      {wishList.length > 0 ? (
        <div className="w-3/4 bg-white px-10 py-10 mx-auto">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Wish list</h1>
            <h2 className="font-semibold text-2xl">{wishList.length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
              Price
            </h3>
          </div>
          {wishList.map((item, index) => (
            <WishItems item={item} key={index} />
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
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl ">Wishlist is empty</h1>
        </div>
      )}
    </>
  );
};

export default WishList;
