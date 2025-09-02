"use client"
import { useAppSelector } from "@/redux/hooks";
import HeroSection from "./Components/HeroSection/HeroSection";
import HomeLiveAction from "./Components/HomeLiveAction/HomeLiveAction";

export default function Home(){


  return(
    <>
      <HeroSection/>
      <HomeLiveAction/>
    </>
  )
}