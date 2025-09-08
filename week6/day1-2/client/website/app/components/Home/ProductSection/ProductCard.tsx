"use client";
import { Product } from "@/redux/api/productApi";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  product?: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
if (!product) return null; 
const discountedPrice = product.onSale
  ? Math.round(product.price - (product.price * product.discountPercentage) / 100)
  : Math.round(product.price);

  return (
    <Link href={`/category/product/${product._id}`} className="min-w-[295px] inline-flex flex-col gap-3">
      {/* Product Image */}
      <div className="bg-[#F0EEED] relative w-full rounded-[20px] overflow-hidden h-[298px]">
        <Image
          src={product.variants[0].images[0]}
          className="object-cover"
          alt={product.name}
          fill
        />
      </div>

      {/* Product Name */}
      <h4 className="font-bold text-xl text-black">{product.name}</h4>

      {/* Rating Section */}
      <div className="flex gap-2.5">
        <div className="flex gap-1 items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              width="19"
              height="17"
              viewBox="0 0 19 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.24494 0.255005L11.8641 5.89491L18.0374 6.6431L13.4829 10.8769L14.679 16.9793L9.24494 13.956L3.8109 16.9793L5.00697 10.8769L0.452479 6.6431L6.62573 5.89491L9.24494 0.255005Z"
                fill="#FFC633"
              />
            </svg>
          ))}
        </div>
        <p className="text-sm text-black">
          4.5/<span className="text-[5]">5</span>
        </p>
      </div>

      {/* Price Section */}
      <div className="flex gap-2 items-center">
        {product.onSale ? (
          <>
            <p className="text-black text-2xl font-bold">${discountedPrice}</p>
            <p className="text-gray-500 line-through text-lg">${product.price}</p>
            <span className="text-green-600 text-sm font-semibold">
              {product.discountPercentage}% OFF
            </span>
          </>
        ) : (
          <p className="text-black text-2xl font-bold">${product.price}</p>
        )}
      </div>
    </Link>
  );
}
