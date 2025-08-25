"use client";

import { IoIosArrowForward } from "react-icons/io";
import GameCard from "../GameCard/GameCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useState } from "react";
import { Game } from "@/app/types/game";

type GameCardContainerProps = {
  title: string;
  game : Game[]
};

export default function GameCardContainer({ title,game }: GameCardContainerProps) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  return (
    <div className="py-8">
      {/* Header + Buttons */}
      <div className="flex justify-between">
        <h2 className="text-lg text-[#F5F5F5] flex items-center gap-2">
          {title}
          <IoIosArrowForward className="w-2 h-2" />
        </h2>
        <div className="flex items-center gap-2">
          <button
            ref={prevRef}
            className={`flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#202020] cursor-pointer`}
          >
            <IoIosArrowForward   className={`rotate-180 ${
                isBeginning ? "text-[#F5F5F5]/50" : "text-[#F5F5F5]"
              }`} />
          </button>
          <button
            ref={nextRef}
            className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#202020]  cursor-pointer"
          >
            <IoIosArrowForward   className={` ${
                isEnd ? "text-[#F5F5F5]/50" : "text-[#F5F5F5]"
              }`} />
          </button>
        </div>
      </div>

   <Swiper
  modules={[Navigation]}
  spaceBetween={20}
  slidesPerView={2} 
  breakpoints={{
    0: { slidesPerView: 1 },  
    490: { slidesPerView: 2 },   
    768: { slidesPerView: 3 },   
    1024: { slidesPerView: 4 },  
    1140: { slidesPerView: 5 },   
  }}
  onBeforeInit={(swiper) => {
    // @ts-expect-error: temporary workaround for type mismatch
    swiper.params.navigation.prevEl = prevRef.current
   // @ts-expect-error: temporary workaround for type mismatch
    swiper.params.navigation.nextEl = nextRef.current
  }}
onSwiper={(swiper) => {
  setTimeout(() => {
    if (swiper.navigation) {
      swiper.navigation.destroy();
      swiper.navigation.init();
      swiper.navigation.update();
    }
  });
}}
   onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
  className="mt-10"
>
  {game?.map((item, i) => (
    <SwiperSlide key={i}>
      <GameCard  game={item} />
    </SwiperSlide>
  ))}
</Swiper>
    </div>
  );
}
