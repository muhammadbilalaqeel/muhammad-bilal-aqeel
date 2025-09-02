"use client"
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios"; // or your api call function
import { useEndAuctionMutation } from "@/redux/api/auctionApiSlice";
export type Auction = {
  _id: string;
  owner: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  startsAt: string;
  endsAt: string;
  totalBids: number;
  currentBidAmount: number;
  make: string;
  model: string;
  year: string;
  vin: string;
  mileage: number;
  engine_size: string;
  paint: string;
  has_gcc_specs: string;
  noteworthy_features: string;
  accident_history: string;
  service_history: string;
  modified_status: string;
  max_bid: number;
  images: string[];
  trending: boolean;
  sold: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export default function BidCard({ car,refetch }: { car: Auction,refetch: ()=>void }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const end = moment(car.endsAt);
      const duration = moment.duration(end.diff(now));

      setTimeLeft({
        days: Math.max(duration.days(), 0),
        hours: Math.max(duration.hours(), 0),
        minutes: Math.max(duration.minutes(), 0),
        seconds: Math.max(duration.seconds(), 0),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [car.endsAt]);

  const renderBox = (value: number, label: string) => (
    <div className="w-6 h-6 rounded-[2px] border-[0.2px] border-[#2E3D83] flex flex-col items-center justify-center">
      <p className="text-[10px] font-bold text-[#2E3D83] leading-[100%]">{value}</p>
      <span className="text-[#939393] font-medium text-[8px] tracking-[4%] leading-[100%]">{label}</span>
    </div>
  );


  const currentBidBg = car.currentBidAmount >= car.max_bid ? "bg-[#E8FFEC]" : "bg-[#FEE0E0]";
  const currentBidText = car.currentBidAmount >= car.max_bid ? "text-[#01DB0A]" : "text-[#FF451D]";

  const [endAuction,{isLoading}] = useEndAuctionMutation()
  const handleEndBid = async () => {
    try {
       const res = await endAuction(car._id);
       console.log(res)
       refetch()
    } catch (error) {
      console.error(error);
      alert("Failed to end auction.");
    }
  };

  return (
    <div className="w-[286px] h-[429px] border border-[#EAECF3] rounded-sm">
      <div className="head w-full pb-5 relative border-b border-[#A9A9A9]">
        {car.trending && (
          <div className=" w-[76px] h-[19px] rounded-r-[2px] rounded-tl-[4px] flex items-center justify-center gap-2 bg-[#EF233C] text-white text-[10px] font-semibold leading-[100%]">
            Trending
          </div>
        )}
        <h4 className="font-bold text-base text-center text-[#2E3D83]">{car.make} {car.model}</h4>
      </div>

      <div className="w-full h-[150px] relative">
        <Image fill src={car.images.length > 0 ? car.images[0] : ""} alt="car_image" className="object-cover"/>
      </div>

      <div className="px-4 flex flex-col gap-4 py-6">
        <div className="flex justify-between gap-2">
          <div className="w-[113px] h-[57px] rounded-[5px] px-5 flex flex-col justify-center gap-1 bg-[#F1F2FF]">
            <h5 className="font-bold text-[#2E3D83] text-sm">${car.max_bid}</h5>
            <p className="text-[#939393] text-[12px]">Winning Bid</p>
          </div>

          <div className={`w-[113px] h-[57px] rounded-[5px] px-5 flex flex-col justify-center gap-1 ${car.sold ? "bg-[#F1F2FF]" : currentBidBg}`}>
            <h5 className={`font-bold text-sm text-right ${car.sold ? "text-[#939393]" : currentBidText}`}>${car.currentBidAmount}</h5>
            <p className={`text-[12px] text-right ${car.sold ? "text-[#939393]" : ""}`}>Current Bid</p>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-1.5 w-full">
           {
            !car.sold && <>
             <div className="flex items-center gap-1">
              {renderBox(timeLeft.days, "Days")}
              {renderBox(timeLeft.hours, "Hours")}
              {renderBox(timeLeft.minutes, "Mins")}
              {renderBox(timeLeft.seconds, "Secs")}
            </div>
            <p className="text-[10px] leading-[100%] text-[#939393]">Time Left</p>
            </>
           }
          </div>

          <div className="flex flex-col gap-1 w-full">
            <h5 className="font-bold text-sm text-[#2E3D83] text-right">{car.totalBids}</h5>
            <p className="text-[#939393] text-[12px] text-right">Total Bids</p>
          </div>
        </div>

        {!car.sold ? (
          <button onClick={handleEndBid} className="w-full h-10 bg-[#2E3D83] font-bold text-base text-white rounded-[5px] mt-auto">
            End Bid
          </button>
        ) : (
          <button disabled className="w-full h-10 bg-[#F1F2FF] font-bold text-base text-[#939393] rounded-[5px] mt-auto">
            Sold
          </button>
        )}
      </div>
    </div>
  );
}
