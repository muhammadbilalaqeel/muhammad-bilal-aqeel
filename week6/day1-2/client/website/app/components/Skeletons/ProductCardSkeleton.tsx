"use client";

export default function ProductCardSkeleton() {
  return (
    <div className="min-w-[295px] inline-flex flex-col gap-3 animate-pulse">
      {/* Image skeleton */}
      <div className="bg-gray-200 w-full rounded-[20px] h-[298px]" />

      {/* Product name skeleton */}
      <div className="h-6 w-3/4 bg-gray-200 rounded-md" />

      {/* Rating skeleton */}
      <div className="flex gap-2.5">
        <div className="flex gap-1 items-center">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-300 rounded-sm" />
          ))}
        </div>
        <div className="h-4 w-6 bg-gray-200 rounded-sm"></div>
      </div>

      {/* Price skeleton */}
      <div className="flex gap-2 items-center">
        <div className="h-6 w-12 bg-gray-300 rounded-md" />
        <div className="h-4 w-8 bg-gray-200 rounded-md" />
        <div className="h-4 w-10 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
}
