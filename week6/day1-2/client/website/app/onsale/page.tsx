"use client";

import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import ProductCard from "../components/Home/ProductSection/ProductCard";
import ProductCardSkeleton from "../components/Skeletons/ProductCardSkeleton";
import { useGetOnSaleProductsQuery } from "@/redux/api/productApi";

export default function OnSale() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetOnSaleProductsQuery({ page: currentPage, limit });

  const totalPages = data?.totalPages || 1;

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#00000099]">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#00000099]" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-base text-black capitalize">
                  On Sale
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="product_section">
          <div className="flex justify-between">
            <h2 className="text-[32px] font-bold text-black">On Sale Products</h2>
          </div>

          {/* Products Grid */}
          <div className="flex flex-wrap gap-4.5 py-6">
            {isLoading ? (
              Array.from({ length: limit }).map((_, i) => <ProductCardSkeleton key={i} />)
            ) : data?.products?.length ? (
              data.products.map((product) => <ProductCard key={product._id} product={product} />)
            ) : (
              <p className="text-center w-full text-gray-500 text-lg py-10">
                No products found.
              </p>
            )}
          </div>

          <div className="w-full border border-[#0000001A]"></div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center space-x-2 justify-between py-6">
              {/* Previous Button */}
              <Button
                variant="ghost"
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                className="h-10 w-20 text-sm border border-[#0000001A] rounded-lg"
              >
                Previous
              </Button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant="ghost"
                    onClick={() => setCurrentPage(page)}
                    className={`h-10 w-10 text-[14px] rounded-lg ${
                      currentPage === page ? "bg-[#0000000F] text-black" : "text-[#00000080]"
                    }`}
                  >
                    {page}
                  </Button>
                ))}
              </div>

              {/* Next Button */}
              <Button
                variant="ghost"
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                className="h-10 w-20 text-sm border border-[#0000001A] rounded-lg"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
