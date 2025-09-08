import Image from "next/image";
import HeroSection from "./components/Home/HeroSection";
import Container from "./components/Container/Container";
import BrandBar from "./components/Home/BrandBar";
import ProductSection from "./components/Home/ProductSection/ProductSection";
import BrowseByDress from "./components/Home/BrowseByDress";
import ReviewsSlider from "./components/Home/ReviewsSlider/ReviewsSlider";
import NewsLetter from "./components/Home/NewsLetter";
import { useGetAllProductsQuery } from "@/redux/api/productApi";

export default function Home() {
  
  return (
    <div className="">
      
        <HeroSection/>
      
      <BrandBar/>
      <ProductSection title="NEW ARRIVALS"/>


      <ProductSection title="top selling"/>

      <BrowseByDress/>

      <ReviewsSlider/>

      {/* <NewsLetter/> */}
    </div>
  );
}
