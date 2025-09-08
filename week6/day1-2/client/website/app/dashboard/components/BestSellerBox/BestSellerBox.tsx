"use client"

import { useGetBestSellersQuery } from "@/redux/api/orderApi"
import Image from "next/image";

export default function BestSellerBox({className}:{className?:string}){
    const {data} = useGetBestSellersQuery(5);
    console.log(data)
    return (
        <div className={`${className}  lg:w-[360px] w-full shrink-0 rounded-2xl pt-7 pb-6 px-4 flex flex-col gap-4 bg-[#FAFAFA]`}>
            <div className="flex flex-col gap-4 w-full">
                <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-xl text-black">Best Sellers</h4>
                    
                </div>
                <div className="w-full border-[0.5px] border-[#232321]"></div>
            </div>

            {
                data && data.length > 0 ? 
                   <div className="flex flex-col gap-4">
                     {data.slice(0,3).map((item,index)=>{
                        return  <div key={index}>
                         <div className="flex justify-between items-center">
             <div className="flex items-center gap-[10px]">
                <div className="bg-[#00000033] relative rounded-xl p-[10px] flex items-center justify-center h-16 w-16">
                  <Image
  src={item.product.variants?.[0]?.images?.[0] || ""}
  alt={item.product.name || "Product Image"}
  fill
  className="object-cover object-center"
/>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="font-semibold text-black">{item.product.name}</p>
                    <span className="font-semibold text-sm text-[#4b4b4b]">${item.product.price}</span>
                </div>
             </div>
             <div className="flex gap-1 items-center flex-col">
                <p className="font-semibold text-right">${item.totalRevenue}</p>
                <span className="text-sm text-right text-[#4b4b4b] font-semibold">{item.totalSold}</span>
             </div>
           </div>
                </div>
                     })}
            </div> : <p>No product found</p>
            }
         
        </div>
    )
}