"use client";
import Container from "../../Container/Container";
import ReviewBox from "./ReviewBox";
import Slider from "react-slick";
import { useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight } from "react-icons/fa6";
export default function ReviewsSlider() {
  const sliderRef = useRef<Slider | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false, // hide default arrows
    afterChange: (current: number) => {
      setIsBeginning(current === 0);
      setIsEnd(current >= 2); // adjust for total slides if needed
    },
    responsive: [
      {breakpoint: 1240, settings: { slidesToShow: 3 }},
      { breakpoint: 1140, settings: { slidesToShow: 2 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 490, settings: { slidesToShow: 1 } },
      { breakpoint: 0, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="py-14 overflow-x-hidden">
      <Container>
        <div>
          <div className="flex justify-between items-baseline-last overflow-x-hidden">
            <h2 className="text-5xl font-bold text-black">OUR HAPPY CUSTOMERS</h2>

            {/* Custom buttons in your design */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => sliderRef.current?.slickPrev()}
                className={`flex items-center justify-center  cursor-pointer`}
              >
                <FaArrowRight
                  className={`rotate-180 ${isBeginning ? "text-gray-600" : "text-black"} text-2xl`}
                />
              </button>
              <button
                onClick={() => sliderRef.current?.slickNext()}
                className={`flex items-center justify-center  cursor-pointer`}
              >
                <FaArrowRight className={`${isEnd ? "text-gray-600" : "text-black"} text-2xl`} />
              </button>
            </div>
          </div>

          {/* Slider */}
          <div className="py-10">
            <Slider ref={sliderRef} {...settings}>
              {[1, 2, 3,4,5,6].map((_, index) => (
                <div key={index} className="px-2 flex gap-3">
                  <ReviewBox />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </Container>
    </div>
  );
}
