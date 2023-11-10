import { Link } from "react-router-dom";

const ProductItems = ({ id, image, title, price, category }) => {
  return (
    <Link to={`/product/${id}`}>
      <div className="lg:w-full md:w-1/2 p-4 w-full">
        <a className="block relative h-48 rounded overflow-hidden">
          <img
            alt="ecommerce"
            className="object-cover object-center w-3/3 h-2/3 block"
            src={image}
          />
        </a>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            {category.toUpperCase()}
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {title.slice(0, 15)}...
          </h2>
          <p className="mt-1">$ {price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItems;
