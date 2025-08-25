import React from "react";

import { useNavigate } from "react-router-dom";
// import { products } from "../../../constants/gernal";
import ProductCard from "../../products/ProductCard";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../../services/productService";
import { useGetProductsQuery } from "../../../redux/apiSlice";

const RelatedProducts = ({ title }) => {
  const navigate = useNavigate();
  const { data: products, isLoading } = useGetProductsQuery();
  // console.log(products)
  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
  };
  return (
    <div className="flex flex-col items-center justify-center my-12">
      <h1 className="text-2xl md:text-[32px] font-prosto mb-6">{title}</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 my-6 max-w-[840px] gap-6 px-6 sm:px-10 lg:px-12 ">
          {products?.data?.length > 0 &&
            products?.data
              .slice(0, 3)
              .map((product) => (
                <ProductCard
                  onClick={() => handleProductClick(product.slug)}
                  key={product._id}
                  image={`${product.images[0]}`}
                  title={product.name}
                  price={product.variants[0].price}
                  weight={product.variants[0].weight}
                />
              ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(RelatedProducts);
