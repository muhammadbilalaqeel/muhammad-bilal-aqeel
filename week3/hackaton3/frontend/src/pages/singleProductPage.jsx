import React, { useEffect, useState } from "react";
import Container from "../components/shared/common/Container";
import Breadcrumb from "../components/shared/common/Breadcrumb";
import ProductOverview from "../components/singleProduct/ProductOverview";
import ProductImage from "../components/singleProduct/ProductImage";
import ProductDetails from "../components/singleProduct/ProductDetails";
import img from "../assets/collections/img1.jpg";
import ProductInfoSection from "../components/singleProduct/ProductInfoSection";
import SteepingInstructions from "../components/singleProduct/SteepingInstructions";
import ProductDescription from "../components/singleProduct/ProductDescription";
import RelatedProducts from "../components/shared/common/RelatedProducts";
import { getProductBySlug } from "../services/productService";
import { useParams } from "react-router-dom";
import { useGetProductBySlugQuery } from "../redux/apiSlice";
const SingleProductPage = () => {
  const { slug } = useParams();
 const { data, error, isLoading,isError } = useGetProductBySlugQuery(slug);

  const product = data?.data
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);
    if (isLoading ) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }
  if (isError) {
    return (
      <p className="text-red-500 py-8 px-3 text-center">
        Something went wrong!
      </p>
    );
  }
  return (
    <div className="">
      <Breadcrumb />
      <div className="flex justify-center pb-12">
        <Container>
          <ProductOverview>
            <ProductImage
              img={`${
                product?.images?.[0]
              }`}
            />
            <ProductDetails product={product} />
          </ProductOverview>
        </Container>
      </div>

      <div className="bg-[#F4F4F4] w-full flex justify-center mb-12">
        <Container>
          <ProductInfoSection>
            <SteepingInstructions
              steepingInstructions={product?.steepingInstructions}
            />
            <ProductDescription product={product} />
          </ProductInfoSection>
        </Container>
      </div>

      <div className="flex justify-center">
        <Container>
          <RelatedProducts title={"You may also like"} />
        </Container>
      </div>
    </div>
  );
};

export default SingleProductPage;
