"use client"

import { useGetBidsByUserQuery } from "@/redux/api/biddingApiSlice";
import Link from "next/link";
import AuctionCard from "../../AuctionCard/AuctionCard";

export default function MyBids(){
    const {data} = useGetBidsByUserQuery()
    console.log(data)
    const bids = data?.data
    return (
         <div className="max-w-[898px] w-full">
               
                 <div className="border-b border-[#B3B3B3]">
                   <ul className="w-full flex">
                    <li className="flex flex-col"><Link href={'#'} className="font-medium text-xl  w-[142px] h-[38px] inline-block text-[#2E3D83]">My Bids</Link>
                    <div className="w-[80px] h-[5px] rounded-[5px] bg-[#FFC300]"></div>
                    </li>
                   </ul>
                 </div>


                 <div className="py-8 grid grid-cols-3">
                    {
                      bids?.length >  0  ? bids?.map((item)=>{
                         return <AuctionCard item={item} key={item._id}/>
                      }):
                      <p>No Data</p>
                    }
                 </div>
        </div>
    )
}