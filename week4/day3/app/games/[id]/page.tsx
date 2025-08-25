"use client";

import Image from "next/image";
import { IoStar } from "react-icons/io5";
import useGameStore from "@/app/store/usegameStore";
import { use, useEffect } from "react";


export default function GameByID({ params }: { params: Promise<{ id: string }> }) {
    const {id} = use(params);
      const { singleGame, fetchGameById, loading, error } = useGameStore();
        useEffect(() => {
    fetchGameById(Number(id));
  }, [id, fetchGameById]);
const discountedPrice = singleGame?.price
  ? singleGame.discount && singleGame.onSale
    ? (singleGame.price - (singleGame.price * singleGame.discount) / 100).toFixed(2)
    : singleGame.price.toFixed(2)
  : "N/A";
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-[#252525] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (error) return <p>Error: {error}</p>;
  if (!singleGame) return <p>Game not found</p>;
  return (
    <div className="max-w-5xl mx-auto py-10 text-white mt-10 sm:px-8 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6">
       <div className="relative md:max-w-[400px] w-full h-[300px] overflow-hidden rounded">
        <Image
  src={`/images/${singleGame.coverImage}`}
  alt={singleGame?.title || "Game cover"}
  fill
  className="object-cover"
/>
       </div>
        <div>
          <h1 className="text-3xl font-bold">{singleGame?.title}</h1>
          <p className="text-gray-400 mt-2">{singleGame?.description}</p>

          {/* Price */}
          <div className="mt-4 flex items-center gap-3">
            {singleGame?.onSale && singleGame?.discount ? (
              <>
                <span className="text-xl font-bold text-green-400">
                  ${discountedPrice}
                </span>
                <span className="line-through text-gray-500">
                  ${singleGame?.price.toFixed(2)}
                </span>
                <span className="bg-red-600 px-2 py-1 rounded text-sm">
                  -{singleGame?.discount}%
                </span>
              </>
            ) : (
             <span className="text-xl font-bold">
  {singleGame?.price !== undefined ? `$${singleGame.price.toFixed(2)}` : "N/A"}
</span>

            )}
          </div>

          {/* Meta */}
          <div className="mt-4 text-sm text-gray-400 space-y-1">
            <p>Release Date: {singleGame?.releaseDate}</p>
            <p>Developer: {singleGame?.developer}</p>
            <p>Publisher: {singleGame?.publisher}</p>
      <p>Platforms: {(singleGame?.platforms ?? []).join(", ") || "N/A"}</p>
<p>Tags: {(singleGame?.tags ?? []).join(", ") || "N/A"}</p>

          </div>
        </div>
      </div>

      {/* Screenshots */}
      {/* <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {singleGame?.screenshots.map((s, i) => (
            <Image
              key={i}
              src={`/images/${s}`}
              alt={`screenshot-${i}`}
              width={400}
              height={200}
              className="rounded-lg object-cover"
            />
          ))}
        </div>
      </div> */}

      {/* Requirements */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Minimum Requirements</h2>
       {singleGame?.requirements?.minimum ? (
  <ul className="space-y-1 text-gray-300">
    <li>OS: {singleGame.requirements.minimum.os}</li>
    <li>Processor: {singleGame.requirements.minimum.processor}</li>
    <li>Memory: {singleGame.requirements.minimum.memory}</li>
    <li>Graphics: {singleGame.requirements.minimum.graphics}</li>
  </ul>
) : (
  <p className="text-gray-400">Minimum requirements not available</p>
)}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3">Recommended Requirements</h2>
          {singleGame?.requirements?.recommended ? (
  <ul className="space-y-1 text-gray-300">
    <li>OS: {singleGame.requirements.recommended.os}</li>
    <li>Processor: {singleGame.requirements.recommended.processor}</li>
    <li>Memory: {singleGame.requirements.recommended.memory}</li>
    <li>Graphics: {singleGame.requirements.recommended.graphics}</li>
  </ul>
) : (
  <p className="text-gray-400">Recommended requirements not available</p>
)}

        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">User Reviews</h2>
        <div className="space-y-4">
         {Array.isArray(singleGame?.reviews) && singleGame.reviews.length > 0 ? (
  singleGame.reviews.map((review, i) => (
    <div key={i} className="bg-[#202020] p-4 rounded-lg flex flex-col gap-2">
      <p className="text-gray-200">{review.comment}</p>
      <span className="text-sm text-gray-400">- {review.user}</span>
    </div>
  ))
) : (
  <p className="text-gray-400">No reviews available.</p>
)}
        </div>
      </div>
    </div>
  );
}
