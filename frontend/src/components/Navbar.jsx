import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { navLinks } from "../utlis/filters";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";

const Navbar = () => {
  const { cart, wishList, logout, loginWithRedirect, user, isAuthenticated } =
    useContext(AppContext);
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to={"/"}
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span className="ml-3 text-xl">DevCom</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {navLinks.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className="mr-5 hover:text-gray-900"
            >
              {item.name.toUpperCase()}
            </Link>
          ))}
        </nav>
        {isAuthenticated ? (
          <>
            <img
              className="w-10 h-10 rounded-full"
              src={user.picture}
              alt={user.name}
            />
            <button
              onClick={() => logout()}
              className="inline-flex items-center bg-purple-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-purple-700 rounded text-base mt-4 mx-4 md:mt-0"
            >
              LOGOUT
            </button>
          </>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            className="inline-flex items-center bg-purple-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-purple-700 rounded text-base mt-4 mx-4 md:mt-0"
          >
            LOGIN
          </button>
        )}
        <Link to={"/cart"}>
          <button className="self-center flex space-x-2 text-2xl">
            <AiOutlineShoppingCart />
            <p className="text-lg self-center">{cart.cartItem.length}</p>
          </button>
        </Link>
        <Link to={"/wishList"}>
          <button className="mx-3 self-center flex space-x-2 text-2xl">
            <AiOutlineHeart />
            <p className="text-lg">{wishList.length}</p>
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
