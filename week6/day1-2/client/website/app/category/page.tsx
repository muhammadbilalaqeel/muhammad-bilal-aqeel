"use client"

import Container from "@/app/components/Container/Container";
import ProductCard from "@/app/components/Home/ProductSection/ProductCard";
import { Accordion, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useGetFiltersQuery, useGetAllProductsQuery } from "@/redux/api/productApi";
import { AccordionItem } from "@radix-ui/react-accordion";
import { useState } from "react";
import { Range } from "react-range";
import tinycolor from "tinycolor2";
import { getTrackBackground } from "react-range";
import ProductCardSkeleton from "../components/Skeletons/ProductCardSkeleton";

export default function Category() {
  const [values, setValues] = useState([0, 200]);

  const { data: filtersData } = useGetFiltersQuery();
  const categories = filtersData?.categories;
  const colors = filtersData?.colors;
  const sizes = filtersData?.sizes;

  const [filters, setFilters] = useState<{
    category?: string;
    colors?: string[];
    sizes?: string[];
    minPrice?: number;
    maxPrice?: number;
  }>({});

  // RTK Query call
  const { data: products, isLoading: productsLoading } = useGetAllProductsQuery(
    Object.keys(filters).length ? filters : {}
  );

  // Toggle filters: if clicked again, remove from filter
  const handleCategoryFilter = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === categoryId ? undefined : categoryId,
    }));
  };

  const handleColorFilter = (color: string) => {
    setFilters(prev => ({
      ...prev,
      colors: prev.colors?.[0] === color ? [] : [color],
    }));
  };

  const handleSizeFilter = (size: string) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes?.[0] === size ? [] : [size],
    }));
  };

  const handlePriceFilter = (min: number, max: number) => {
    // toggle price: if the selected range is same as current, remove
    setFilters(prev => ({
      ...prev,
      minPrice: prev.minPrice === min && prev.maxPrice === max ? undefined : min,
      maxPrice: prev.minPrice === min && prev.maxPrice === max ? undefined : max,
    }));
  };

  const maxPrice = products?.reduce((max, p) => Math.max(max, p.price), 0) || 10000;

  return (
    <div className="py-8">
      <Container>
        {/* Breadcrumb */}
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-[#00000099]">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#00000099]" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-base text-black capitalize">
                  All Products
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex py-8 gap-4">
          {/* Sidebar */}
          <div className="sidebar py-5 px-6 flex flex-col gap-6 border border-[#0000001A] max-w-[295px] w-full rounded-[20px]">
            {/* Categories */}
              <h3 className="text-black font-bold text-xl">Filters</h3>
            <div className="categories flex flex-col gap-5 w-full">
              {categories?.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex justify-between cursor-pointer ${
                    filters.category === item.id ? "font-bold" : ""
                  }`}
                  onClick={() => handleCategoryFilter(item.id)}
                >
                  <p className="text-[#00000099]">{item.name}</p>
                </div>
              ))}
            </div>

            {/* Price */}
            <Accordion type="single" collapsible>
              <AccordionItem value="price">
                <AccordionTrigger>
                  <h3 className="text-black font-bold text-xl">Price</h3>
                </AccordionTrigger>
                <AccordionContent>
               <div className="flex flex-col items-center space-y-4 p-4">
  <Range
    step={10}
    min={0}
    max={maxPrice}
    values={values}
    onChange={(newValues) => {
      setValues(newValues);
      handlePriceFilter(newValues[0], newValues[1]);
    }}
    renderTrack={({ props, children }) => (
      <div
        {...props}
        className="relative h-2 w-full  bg-gray-200 rounded-full"
      >
        <div
          className="absolute h-2 bg-black rounded-full"
          style={{
            left: `${(values[0] / maxPrice) * 100}%`,
            width: `${((values[1] - values[0]) / maxPrice) * 100}%`,
          }}
        />
        {children}
      </div>
    )}
    renderThumb={({ props }) => (
      <div {...props} className="h-6 w-6 bg-black rounded-full cursor-pointer" />
    )}
  />

  <div className="flex justify-between w-full max-w-[250px]">
    <span>${values[0]}</span>
    <span>${values[1]}</span>
  </div>
</div>

                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Colors */}
            <Accordion type="single" collapsible>
              <AccordionItem value="colors">
                <AccordionTrigger>
                  <h3 className="text-black font-bold text-xl">Colors</h3>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-3.5 flex-wrap w-full">
                    {colors?.map((color, idx) => (
                      <div
                        key={idx}
                        style={{ backgroundColor: tinycolor(color).toHexString() }}
                        className={`h-[37px] w-[37px] rounded-full border-[2px] border-[#00000033] cursor-pointer ${
                          filters.colors?.[0] === color ? "ring-2 ring-black" : ""
                        }`}
                        onClick={() => handleColorFilter(color)}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Sizes */}
            <Accordion type="single" collapsible>
              <AccordionItem value="sizes">
                <AccordionTrigger>
                  <h3 className="text-black font-bold text-xl">Sizes</h3>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="w-full flex flex-wrap gap-2">
                    {sizes?.map((size, idx) => (
                      <div
                        key={idx}
                        className={`py-[10px] px-5 rounded-[62px] text-sm flex items-center justify-center cursor-pointer ${
                          filters.sizes?.[0] === size
                            ? "bg-black text-white"
                            : "bg-[#F0F0F0] text-[#00000099]"
                        }`}
                        onClick={() => handleSizeFilter(size)}
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Product Section */}
          <div className="product_section w-full">
            <div className="flex justify-between">
              <h2 className="text-[32px] font-bold text-black">All Products</h2>
              <div className="flex items-center gap-2">
                <p className="text-[#00000099]">
                  Showing 1-{products?.length ?? 0} of {products?.length ?? 0} Products
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4.5 py-6">
  {productsLoading
    ? Array.from({ length: 8 }).map((_, idx) => (
      <ProductCardSkeleton/>
      ))
    : products && products.length > 0
    ? products.map((product) => <ProductCard key={product._id} product={product} />)
    : <p>No Product Found</p>}
</div>
          </div>
        </div>
      </Container>
    </div>
  );
}
