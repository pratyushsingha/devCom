import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductItems from "../components/ProductItems";
import { useAuth0 } from "@auth0/auth0-react";
export const AppContext = createContext();

const getLocalCart = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

function getLocalWish() {
  let wishes = localStorage.getItem("wish");
  if (wishes) {
    return JSON.parse(wishes);
  } else {
    return [];
  }
}

export default function AppContextProvider({ children }) {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSeletectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedPrice, setSeletectedPrice] = useState(1000);
  const [selectedRating, setSelectedRating] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({
    cartItem: getLocalCart(),
  });
  const [wishList, setWishList] = useState(getLocalWish());
  const [selectedWish, setSelectedWish] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (err) {
        console.log("error :: fetchProducts :: ", err);
        setError(true);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  function handleInputChange(e) {
    setQuery(e.target.value);
  }

  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  function handleCategory(e) {
    setSeletectedCategory(e.target.value);
  }

  function handleBrand(e) {
    setSelectedBrand(e.target.value);
  }

  function handlePrice(e) {
    setSeletectedPrice(e.target.value);
  }

  function filterData(
    products,
    selectedCategory,
    selectedPrice,
    selectedRating,
    query
  ) {
    let filteredProducts = products;
    if (query) {
      filteredProducts = filteredItems;
    }

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(({ category }) => {
        if (selectedCategory === "All") {
          return filteredProducts;
        } else {
          return category.toLowerCase() === selectedCategory.toLowerCase();
        }
      });
    }

    if (selectedBrand) {
      filteredProducts = filteredProducts.filter(({ brand }) => {
        if (selectedBrand === "All") {
          return filteredProducts;
        } else {
          return brand.toLowerCase() === selectedBrand.toLowerCase();
        }
      });
    }

    if (selectedPrice) {
      filteredProducts = filteredProducts.filter(({ price }) => {
        return price <= selectedPrice;
      });
    }

    if (selectedRating) {
      filteredProducts = filteredProducts.filter(({ rating }) => {
        return rating.rate <= selectedRating;
      });
    }

    return filteredProducts.map(({ id, title, price, image, category }) => (
      <ProductItems
        id={id}
        image={image}
        title={title}
        price={price}
        category={category}
      />
    ));
  }
  const result = filterData(
    products,
    selectedCategory,
    selectedPrice,
    selectedRating,
    query
  );
  // console.log(result);

  function addToCart(id) {
    const updatedCart = products.find((item) => item.id == id);

    if (cart.cartItem.some((item) => item.id == updatedCart.id)) {
      setCart((prev) => ({
        ...prev,
        cartItem: prev.cartItem.map((item) =>
          item.id === updatedCart.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      }));
    } else {
      setCart((prev) => ({
        ...prev,
        cartItem: [...prev.cartItem, { ...updatedCart, quantity: 1 }],
      }));
    }
  }

  function quantityRemove(id) {
    const updatedCart = products.find((item) => item.id == id);
    cart.cartItem.map((item) =>
      item.quantity <= 1
        ? removeFromCart(id)
        : setCart((prev) => ({
            ...prev,
            cartItem: prev.cartItem.map((item) =>
              item.id === updatedCart.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          }))
    );
  }

  function removeFromCart(id) {
    const removeItem = cart.cartItem.filter((item) => item.id !== id);
    console.log(removeItem);
    setCart((prev) => ({
      ...prev,
      cartItem: removeItem,
    }));
  }
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(cart.cartItem));
  }, [cart]);

  function addToWish(id) {
    const updatedWish = products.find((item) => item.id == id);
    setWishList([...wishList, updatedWish]);
    // console.log(wishList);
    toast.success("item added to wishlist", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  function removeFromWish(id) {
    const itemToRemove = wishList.findIndex((item) => item.id === id);
    if (itemToRemove !== -1) {
      const updatedWish = [...wishList];
      updatedWish.splice(itemToRemove, 1);
      setWishList(updatedWish);
      toast.error("item removed successfully", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  useEffect(() => {
    localStorage.setItem("wish", JSON.stringify(wishList));
  }, [wishList]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("you're offline!!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const options = {
      key: `${import.meta.env.VITE_RAZORPAY_KEY}`,
      currency: "INR",
      amount: amount * 100,
      name: user.name,
      description: "thanks for purchasing",
      image: "https://cdn-icons-png.flaticon.com/128/2415/2415292.png",
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        if (response.razorpay_payment_id) {
          setCart({ cartItem: [] });
          toast.success(`order placed for ₹${amount}!!`, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      },
      prifill: {
        name: user.name,
      },
    };

    const paymentObj = new window.Razorpay(options);
    paymentObj.open();
  };

  function checkout(amount) {
    if (isAuthenticated) {
      displayRazorpay(amount);
    } else {
      toast.error("login to continue", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const value = {
    products,
    addToCart,
    cart,
    removeFromCart,
    loading,
    handleInputChange,
    filteredItems,
    handleBrand,
    handleCategory,
    filterData,
    selectedCategory,
    result,
    handlePrice,
    selectedPrice,
    addToWish,
    removeFromWish,
    wishList,
    selectedWish,
    setSelectedWish,
    setSelectedRating,
    selectedBrand,
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    checkout,
    displayRazorpay,
    error,
    quantityRemove,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
