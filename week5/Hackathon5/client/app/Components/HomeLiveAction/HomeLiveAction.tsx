import Link from "next/link";
import Container from "../Common/Container";
import HomeLiveActionCard from "./HomeLiveActionCard";
import { useGetAuctionsQuery } from "@/redux/api/auctionApiSlice";

export default function HomeLiveAction(){
    const { data: auctionsData, isLoading } = useGetAuctionsQuery({ status: 'live' });
    console.log(auctionsData)
    return(
        <div className="w-full bg-[#2E3D83] my-10 pt-16">
           <div className="w-full flex justify-center">
             <div className="w-[270px] h-[97px] flex flex-col justify-between items-center">
                <h2 className="text-center font-bold text-[40px] leading-[100%] text-white">Live Auction</h2>
                <div className="w-full h-[29px] relative flex items-center justify-center">
                   <div className="w-full border border-white"></div>
                   <div className="absolute h-[20px] w-[20px] transform rotate-45  bg-[#F9B610]"></div>
                </div>
            </div>
           </div>
           <div className="border-b border-white">
           <Container> <ul className="w-full flex">
                <li className="flex flex-col items-center"><Link href={'#'} className="font-medium text-xl text-center w-[142px] h-[38px] inline-block text-white">Live Auction</Link>
                <div className="w-[159px] h-[5px] rounded-[5px] bg-[#FFC300]"></div>
                </li>
            </ul></Container>
           </div>

           <div className="py-14">
             <Container className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-5.5">
                {
                    auctionsData && auctionsData?.data?.length > 0 ? auctionsData?.data.map((item,index)=>{
                        return <HomeLiveActionCard key={index} item={item}/>
                    }) : <p className="text-white">No Live Found</p>
                }
               
             </Container>
           </div>
        </div>
    )
}