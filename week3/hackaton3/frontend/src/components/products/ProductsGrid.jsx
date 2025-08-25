import React, { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const ProductsGrid = ({ products = [],loading,error }) => {
  const navigate = useNavigate();
  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
  };

  const [sortBy, setSortBy] = useState("Default");

  const sortedProducts = useMemo(() => {
    let sorted = [...products];

    switch (sortBy) {
      case "High Price":
        sorted.sort(
          (a, b) => (b?.variants?.[0]?.price ?? 0) - (a?.variants?.[0]?.price ?? 0)
        );
        break;
      case "Low Price":
        sorted.sort(
          (a, b) => (a?.variants?.[0]?.price ?? 0) - (b?.variants?.[0]?.price ?? 0)
        );
        break;
      case "A - Z":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z - A":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return sorted;
  }, [products, sortBy]);

  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }
  if (error) {
    return (
      <p className="text-red-500 py-8 px-3 text-center">
        Something went wrong!
      </p>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-end font-montserrat">
        <label className="sr-only" htmlFor="sort-select">
          Sort By
        </label>
        <select
          id="sort-select"
          className="w-32 p-2 bg-white text-gray-700 focus:outline-none focus:ring-0 cursor-pointer"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option disabled>Sort By</option>
          <option>High Price</option>
          <option>Low Price</option>
          <option>A - Z</option>
          <option>Z - A</option>
          <option>Default</option>
        </select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 my-6">
        {sortedProducts.length > 0 ? sortedProducts.slice(0,10).map((product) => {
          const price = product?.variants?.[0]?.price ?? 0;
          const weight = product?.variants?.[0]?.weight ?? "";
          const image = product?.images?.[0]
            ? `${product.images[0]}`
            : "/placeholder.png";

          return (
            <ProductCard
              key={product._id}
              onClick={() => handleProductClick(product.slug)}
              image={image}
              title={product.name}
              price={price}
              weight={weight}
            />
          );
        })
      : <p className="text-center py-5">No Product Found</p>
      }
      </div>
    </div>
  );
};

export default React.memo(ProductsGrid);
