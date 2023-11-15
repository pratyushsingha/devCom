import React, { useContext, useState } from "react";
import { brand, category, rating } from "../utlis/filters";
import { AppContext } from "../context/AppContext";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

const Sidebar = () => {
  const {
    handleCategory,
    handleBrand,
    query,
    handleInputChange,
    handlePrice,
    selectedPrice,
    setSelectedRating,
  } = useContext(AppContext);
  const [showBrand, setShowBrand] = useState(false);
  return (
    <>
      <input
        className="py-2 px-4 rounded-lg border-2 border-gray-300"
        type="text"
        onChange={handleInputChange}
        value={query}
        placeholder="search..."
      />
      <br />
      <h1 className="text-lg font-extrabold">CATEGORY </h1>
      {category.map((item, index) => (
        <label key={index}>
          <input
            type="radio"
            name="category"
            value={item.name}
            onChange={handleCategory}
          />
          {item.name}
        </label>
      ))}
      <br />
      <div className="text-lg flex justify-between">
        <h1 className="text-lg font-extrabold">BRAND </h1>
        <button onClick={() => setShowBrand(!showBrand)}>
          {showBrand ? <IoIosArrowForward /> : <IoIosArrowDown />}
        </button>
      </div>
      {brand.map((item, index) => (
        <div className={showBrand ? "block" : "hidden"}>
          <label key={index}>
            <input
              type="radio"
              name="brand"
              value={item.name}
              onChange={handleBrand}
            />
            {item.name}
          </label>
        </div>
      ))}
      <br />
      <h1 className="text-lg font-extrabold">PRICE </h1>
      <input
        type="range"
        value={selectedPrice}
        name="price"
        min={0}
        max={1000}
        step={1}
        onChange={handlePrice}
      />
      ₹ {selectedPrice}
      <br />
      <br />
      <h1 className="text-lg font-extrabold">RATING </h1>
      {rating.map((rate, index) => (
        <button
          key={index}
          className="flex justify-start"
          onClick={() => setSelectedRating(rate.star)}
        >
          {rate.icon} {rate.star}
        </button>
      ))}
      <br />
    </>
  );
};

export default Sidebar;
