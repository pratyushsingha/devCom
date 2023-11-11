import { createContext, useEffect, useState } from "react";
import axios from "axios";

import { API_URL } from "../utlis/filters";
import ProductItems from "../components/ProductItems";

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
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSeletectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedPrice, setSeletectedPrice] = useState(1000);
  const [selectedColor, setSelectedColor] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(getLocalCart());
  const [wishList, setWishList] = useState(getLocalWish());
  const [selectedWish, setSelectedWish] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data);
      } catch (err) {
        console.log("error :: fetchProducts :: ", err);
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

  function handleColor(e) {
    setSelectedColor(e.target.value);
  }

  function filterData(products, selectedCategory, selectedPrice, query) {
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
  const result = filterData(products, selectedCategory, selectedPrice, query);
  // console.log(result);

  function addToCart(id) {
    const updatedCart = products.find((item) => item.id == id);
    setCart([...cart, updatedCart]);
  }

  function removeFromCart(id) {
    const itemToRemove = cart.findIndex((item) => item.id === id);
    if (itemToRemove !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(itemToRemove, 1);
      setCart(updatedCart);
    }
  }

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(cart));
  }, [cart]);

  function addToWish(id) {
    const updatedWish = products.find((item) => item.id == id);
    setWishList([...wishList, updatedWish]);
    console.log(wishList);
  }

  function removeFromWish(id) {
    const itemToRemove = wishList.findIndex((item) => item.id === id);
    if (itemToRemove !== -1) {
      const updatedWish = [...wishList];
      updatedWish.splice(itemToRemove, 1);
      setWishList(updatedWish);
    }
  }

  useEffect(() => {
    localStorage.setItem("wish", JSON.stringify(wishList));
  }, [wishList]);

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
    handleColor,
    selectedColor,
    setSelectedColor,
    selectedBrand,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
