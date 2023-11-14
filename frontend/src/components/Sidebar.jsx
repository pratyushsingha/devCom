import React, { useContext } from "react";
import { brand, category, rating } from "../utlis/filters";
import { AppContext } from "../context/AppContext";

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
      <h1 className="text-xl">category </h1>
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
      <h1 className="text-xl">Brand </h1>
      {brand.map((item, index) => (
        <label key={index}>
          <input
            type="radio"
            name="brand"
            value={item.name}
            onChange={handleBrand}
          />
          {item.name}
        </label>
      ))}
      <br />
      <h1 className="text-xl">Price </h1>
      <input
        type="range"
        value={selectedPrice}
        name="price"
        min={0}
        max={1000}
        step={1}
        onChange={handlePrice}
      />
      <p className="flex justify-end">₹ {selectedPrice}</p>
      <br />
      <h1 className="text-xl">Rating </h1>
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
