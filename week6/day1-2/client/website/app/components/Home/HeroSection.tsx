import { Button } from "@/components/ui/button";
import Image from "next/image";
import Container from "../Container/Container";

export default function HeroSection() {
  return (
    <div className="bg-[#F2F0F1]">
      <Container>
        <div className="flex lg:flex-row flex-col lg:h-[663px] h-auto gap-6 pt-0 lg:py-0 py-10">
          {/* Left Section */}
          <div className="left flex-1 flex flex-col gap-6 h-full justify-center text-center lg:text-left lg:py-0 py-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-tight lg:leading-[64px] font-bold text-black">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>
            <p className="leading-[22px] text-[#00000099] max-w-[545px] mx-auto lg:mx-0 px-4 lg:px-0">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense of style.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Button className="py-3 sm:py-4 max-w-[210px] w-full rounded-[62px] h-[48px] sm:h-[52px] flex items-center justify-center bg-black text-white font-medium text-sm sm:text-base">
                Shop Now
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-4">
              <div className="flex flex-col items-center lg:items-start">
                <h4 className="text-black font-semibold text-2xl sm:text-3xl md:text-[40px]">
                  200+
                </h4>
                <p className="leading-[22px] text-[#00000099] text-sm sm:text-base">
                  International Brands
                </p>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <h4 className="text-black font-semibold text-2xl sm:text-3xl md:text-[40px]">
                  2000+
                </h4>
                <p className="leading-[22px] text-[#00000099] text-sm sm:text-base">
                  High-Quality Products
                </p>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <h4 className="text-black font-semibold text-2xl sm:text-3xl md:text-[40px]">
                  30,000+
                </h4>
                <p className="leading-[22px] text-[#00000099] text-sm sm:text-base">
                  Happy Customers
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className=" right relative lg:flex hidden items-center flex-1 h-[300px] sm:h-[400px] md:h-[500px] lg:h-full mt-6 lg:mt-0">
            <Image
              src={"/images/small_star.png"}
              alt="star"
              width={40}
              height={40}
              className="absolute left-0 top-1/2 z-10 w-8 sm:w-10 lg:w-14"
            />
            <div className="w-full h-full relative z-0">
              <Image
                src={"/images/hero_bg.jpg"}
                alt="hero_img"
                fill
                className="object-cover absolute object-top rounded-md lg:rounded-none"
              />
            </div>
            <Image
              src={"/images/large_star.png"}
              alt="star"
              width={80}
              height={80}
              className="absolute right-0 top-10 sm:top-16 lg:top-24 z-10 w-16 sm:w-20 lg:w-26"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
