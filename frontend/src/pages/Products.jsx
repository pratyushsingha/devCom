import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Sidebar from "../components/Sidebar";
import Loader from "../components/loader/Loader";

const Products = () => {
  const { result, loading } = useContext(AppContext);

  return (
    <div className="mx-auto">
      <div className="flex px-24 py-24">
        <div className="flex flex-col">
          <Sidebar />
        </div>
        <div>
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">{result}</div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
