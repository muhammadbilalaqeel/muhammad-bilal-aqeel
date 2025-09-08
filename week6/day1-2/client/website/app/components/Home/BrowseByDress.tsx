"use client"

import Image from "next/image";
import Container from "../Container/Container";

export default function BrowseByDress(){
    return (
    <Container className="py-10">
  <div className="bg-[#F0F0F0] rounded-[40px] py-20 px-16">
    <h2 className="text-black font-bold text-5xl uppercase text-center">
      BROWSE BY DRESS STYLE
    </h2>

    <div className="mt-14 grid lg:grid-cols-3 sm:grid-cols-2 grid-rows-2 gap-5">
      {/* Casual */}
      <div className="bg-white rounded-[20px] h-[289px] relative overflow-hidden">
        <img
          src="/images/casual.png"
          alt="Casual"
          className="w-full h-full object-cover rounded-[20px]"
        />
        <h3 className="absolute top-4 left-4 text-black font-bold text-2xl">Casual</h3>
      </div>

      {/* Formal */}
      <div className="bg-white rounded-[20px] h-[289px] relative overflow-hidden lg:col-span-2">
        <img
          src="/images/formal.png"
          alt="Formal"
          className="w-full h-full object-cover ml-auto inline-block rounded-[20px]"
        />
        <h3 className="absolute top-4 left-4 text-black font-bold text-2xl">Formal</h3>
      </div>

      {/* Party */}
      <div className="bg-white rounded-[20px] h-[289px] relative overflow-hidden lg:col-span-2">
        <img
          src="/images/party.png"
          alt="Party"
          className="w-full h-full object-cover rounded-[20px]"
        />
        <h3 className="absolute top-4 left-4 text-black font-bold text-2xl">Party</h3>
      </div>

      {/* Gym */}
      <div className="bg-white rounded-[20px] h-[289px] relative overflow-hidden">
        <img
          src="/images/gym.png"
          alt="Gym"
          className="w-full h-full object-cover rounded-[20px]"
        />
        <h3 className="absolute top-4 left-4 text-black font-bold text-2xl">Gym</h3>
      </div>
    </div>
  </div>
</Container>

    )
}