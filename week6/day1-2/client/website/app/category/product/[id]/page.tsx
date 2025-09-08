"use client";

import Container from "@/app/components/Container/Container";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useGetProductByIdQuery } from "@/redux/api/productApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import tinycolor from "tinycolor2";
import { toast } from "sonner"; 
import { useAddToCartMutation } from "@/redux/api/cartApi";

export default function ProductById() {
 const params = useParams();
  const productId = typeof params.id === "string" ? params.id : undefined;

  // Fix hydration mismatch: only run client-side code after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Run query only after component mounts
  const [addToCart,{isLoading : addToCartLoading}] = useAddToCartMutation()
  const { data, isLoading } = useGetProductByIdQuery(productId!, { skip: !mounted || !productId });
  // States for variants, size, and quantity
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Set default selected variant & size once data loads
  useEffect(() => {
    if (data?.variants?.length > 0) {
      setSelectedIndex(0);
      setSelectedSize(data.variants[0]?.sizes?.[0] || null);
    }
  }, [data]);

  // --- Early UI handling but AFTER hooks run ---
  if (!mounted) return null;
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Something went wrong</p>;

  // Price logic
  const discountedPrice = data.onSale
    ? Math.round(data.price - (data.price * data.discountPercentage) / 100)
    : Math.round(data.price);

  // Quantity handlers
  const handleIncrement = () => {
    const stock = data.stock || 0;
    if (quantity < stock) setQuantity(quantity + 1);
    else toast.error(`Only ${stock} items in stock`);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };


  // Add to cart handler
  const handleAddToCart =async () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    if (selectedIndex === null) {
      toast.error("Please select a color");
      return;
    }

  try {
      const item = data.variants[selectedIndex];
    const cartData = {
      product: data._id,
      size: selectedSize,
      image: item?.images?.[0] || "",
      quantity,
      color: item?.color || ""
    };

    const res = await addToCart(cartData).unwrap();

    console.log(res)
    

    console.log("Cart Data:", cartData);
    toast.success("Product added to cart!");
  } catch (error) {
    console.log(error)
  }
  };
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
                {data.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid grid-cols-2 w-full gap-8 py-8">
          {/* Left Image */}
          <div className="relative w-full h-auto">
            {selectedIndex !== null && data?.variants[selectedIndex]?.images?.length > 0 ? (
              <Image
                src={data.variants[selectedIndex].images[0]}
                alt="Product"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">No Image</div>
            )}
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-6">
            <h2 className="font-bold text-[40px] text-black">{data?.name}</h2>

            {/* Price Section */}
            <div className="flex gap-4 items-center">
              {data.onSale ? (
                <>
                  <p className="text-[32px] font-bold text-black">${discountedPrice}</p>
                  <p className="old text-[#0000004D] text-[32px] font-bold line-through">${data.price}</p>
                  <div className="bg-[#FF33331A] rounded-[62px] py-1.5 px-3.5 text-[#FF3333] font-medium">
                    -{data.discountPercentage}%
                  </div>
                </>
              ) : (
                <p className="text-[32px] font-bold text-black">${data.price}</p>
              )}
            </div>

            <p className="text-[#00000099]">{data.description}</p>
            <div className="w-full border border-[#0000001A]"></div>

            {/* Colors */}
            <div className="flex flex-col gap-4">
              <p className="text-[#00000099]">Select Colors</p>
              <div className="flex gap-4 w-full">
                {data.variants.map((variant, index) => {
                  const isSelected = selectedIndex === index;
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedIndex(index);
                        setSelectedSize(variant.sizes[0] || null); // Reset size
                        setQuantity(1); // Reset quantity
                      }}
                      className={`h-[37px] w-[37px] rounded-full border cursor-pointer transition-all duration-200
                        ${isSelected ? "border-black scale-110" : "border-[#0000001A]"}`}
                      style={{ backgroundColor: tinycolor(variant.color).toHexString() }}
                    ></div>
                  );
                })}
              </div>
            </div>

            <div className="w-full border border-[#0000001A]"></div>

            {/* Sizes */}
            <div className="flex flex-col gap-4">
              <p className="text-[#00000099]">Choose Size</p>
              <div className="w-full flex flex-wrap gap-2">
                {selectedIndex !== null &&
                  data.variants[selectedIndex].sizes.map((size, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedSize(size)}
                      className={`py-[10px] px-5 flex items-center justify-center rounded-[62px] text-sm cursor-pointer
                        ${selectedSize === size ? "bg-black text-white" : "bg-[#F0F0F0] text-[#00000099]"}`}
                    >
                      {size}
                    </div>
                  ))}
              </div>
            </div>

            <div className="w-full border border-[#0000001A]"></div>

            {/* Quantity + Cart */}
            <div className="flex justify-between gap-4 ">
              <div
                className="w-[170px] h-[52px] flex items-center justify-between gap-8 rounded-[62px] py-4 px-5 bg-[#F0F0F0]"
              >
                <div onClick={handleDecrement} className="cursor-pointer">
                  <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.375 2C19.375 2.29837 19.2565 2.58452 19.0455 2.79549C18.8345 3.00647 18.5484 3.125 18.25 3.125H1.75C1.45163 3.125 1.16548 3.00647 0.954505 2.79549C0.743526 2.58452 0.625 2.29837 0.625 2C0.625 1.70163 0.743526 1.41548 0.954505 1.2045C1.16548 0.993526 1.45163 0.875 1.75 0.875H18.25C18.5484 0.875 18.8345 0.993526 19.0455 1.2045C19.2565 1.41548 19.375 1.70163 19.375 2Z" fill="black"/>
                  </svg>
                </div>
                <span className="text-black font-medium">{quantity}</span>
                <div onClick={handleIncrement} className="cursor-pointer">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.375 10C19.375 10.2984 19.2565 10.5845 19.0455 10.7955C18.8345 11.0065 18.5484 11.125 18.25 11.125H11.125V18.25C11.125 18.5484 11.0065 18.8345 10.7955 19.0455C10.5845 19.2565 10.2984 19.375 10 19.375C9.70163 19.375 9.41548 19.2565 9.2045 19.0455C8.99353 18.8345 8.875 18.5484 8.875 18.25V11.125H1.75C1.45163 11.125 1.16548 11.0065 0.954505 10.7955C0.743526 10.5845 0.625 10.2984 0.625 10C0.625 9.70163 0.743526 9.41548 0.954505 9.2045C1.16548 8.99353 1.45163 8.875 1.75 8.875H8.875V1.75C8.875 1.45163 8.99353 1.16548 9.2045 0.954505C9.41548 0.743526 9.70163 0.625 10 0.625C10.2984 0.625 10.5845 0.743526 10.7955 0.954505C11.0065 1.16548 11.125 1.45163 11.125 1.75V8.875H18.25C18.5484 8.875 18.8345 8.99353 19.0455 9.2045C19.2565 9.41548 19.375 9.70163 19.375 10Z" fill="black"/>
                  </svg>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-[400px] h-[52px] rounded-[62px] py-4 px-[54px] font-medium text-white"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
