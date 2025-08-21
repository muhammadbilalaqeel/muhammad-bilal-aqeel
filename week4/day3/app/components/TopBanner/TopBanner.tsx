"use client"
import { useState } from "react";
import LeftImage from "./LeftImage/LeftImage";
import RightSection from './RightSection/RightSection';
import useGameStore from "@/app/store/usegameStore";

export default function TopBanner (){
    const [bannerImage,setBannerImage] = useState<string[]>([])
    const {loading} = useGameStore();
     if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-[#252525] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
   return (
    <div className="lg:h-[432px]  flex lg:flex-row flex-col w-full gap-3 justify-between">
        <LeftImage bannerImage={bannerImage}/>
        <RightSection setBannerImage={setBannerImage} bannerImg={bannerImage}/>
    </div>
   ) 
}